import client, { Collections } from '@/lib/db';
import { moderateText } from '@/lib/openai';
import { hashAuthor } from '@/lib/utils';
import type {
  ProfessorCourseRatingOverall,
  ProfessorCourseReview,
} from '@/types';

export async function POST(request: Request) {
  const reviewBody = (await request.json()) as ProfessorCourseReview;

  if (
    !reviewBody ||
    !reviewBody.professor ||
    !reviewBody.course ||
    !reviewBody.body ||
    !reviewBody.author ||
    !reviewBody.term ||
    !reviewBody.metrics
  ) {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }

  if (reviewBody.body.length > 2000) {
    return Response.json(
      { error: 'Review body cannot exceed 2000 characters' },
      { status: 400 },
    );
  }

  const validTerms = ['fall', 'spring', 'summer'];
  const [term, year] = reviewBody.term.split('-');
  if (!validTerms.includes(term) || !year || isNaN(Number(year))) {
    return Response.json(
      {
        error:
          'Invalid term format. Please provide a term in the format of `fall 2021`, `spring 2022`, or `summer 2022`',
      },
      { status: 400 },
    );
  }
  if (Number(year) > new Date().getFullYear()) {
    return Response.json(
      {
        error:
          'Invalid term. Please provide a term that is in the past or present',
      },
      { status: 400 },
    );
  }
  // Validate that reviews for the fall term can only be made after August
  const currentMonth = new Date().getMonth() + 1;
  if (
    term === 'fall' &&
    currentMonth < 9 &&
    Number(year) === new Date().getFullYear()
  ) {
    return Response.json(
      {
        error: `Invalid term. Review for fall term in \`${year}\` can only be made after August.`,
      },
      { status: 400 },
    );
  }

  const review = {
    ...reviewBody,
    professor: reviewBody.professor.toLowerCase(),
    course: reviewBody.course.toUpperCase(),
    author: await hashAuthor(reviewBody.author),
  };

  const professorOveralls = await client
    .db(process.env.MONGODB_DB)
    .collection<ProfessorCourseRatingOverall>(
      Collections.ProfessorCourseOveralls,
    )
    .find({ professor: review.professor })
    .toArray();

  if (!professorOveralls.length) {
    return Response.json({ error: 'Professor not found' }, { status: 404 });
  }

  if (
    !professorOveralls.some((professor) => professor.course === review.course)
  ) {
    return Response.json(
      {
        error:
          'Our records indicate that professor does not teach this course. If you believe this to be wrong, please contact support.',
      },
      { status: 404 },
    );
  }

  const existingReview = await client
    .db(process.env.MONGODB_DB)
    .collection<ProfessorCourseReview>(Collections.CourseReviews)
    .findOne({
      professor: review.professor,
      course: review.course,
      author: review.author,
      term: review.term,
    });

  if (existingReview) {
    return Response.json(
      {
        error: `Review for the \`${existingReview.term}\` term already exists. Please delete your already existing review if you would like to make a new one or update it with more relevant information`,
      },
      { status: 409 },
    );
  }

  // Check if the review contains inappropriate content
  const reviewSafe = await moderateText(review.body);
  if (!reviewSafe) {
    return Response.json(
      { error: 'Review contains inappropriate content' },
      { status: 400 },
    );
  }

  const status = await client
    .db(process.env.MONGODB_DB)
    .collection<ProfessorCourseReview>(Collections.CourseReviews)
    .insertOne(review);

  if (!status) {
    return Response.json({ error: 'Failed to create review' }, { status: 500 });
  }

  let professorOverallsForCourse = professorOveralls.find(({ course }) => course == review.course);
  Object.keys(professorOverallsForCourse!.metrics).forEach((metric) => {
    const oldValue = professorOverallsForCourse!.metrics[metric as keyof typeof review.metrics];

    professorOverallsForCourse!.metrics[metric as keyof typeof review.metrics] = oldValue
      ? (oldValue + review.metrics[metric as keyof typeof review.metrics] ?? 0) / 2
      : review.metrics[metric  as keyof typeof review.metrics] ?? 0;
  })
  await client
    .db(process.env.MONGODB_DB)
    .collection<ProfessorCourseRatingOverall>(Collections.ProfessorCourseOveralls)
    .updateOne(
      { professor: review.professor, course: review.course },
      {
        $set: {
          metrics: professorOverallsForCourse!.metrics,
          overall: Object.values(professorOverallsForCourse!.metrics).reduce((a, b) => a + b, 0) / Object.values(professorOverallsForCourse!.metrics).length
        }
      }
    );

  return Response.json({ message: 'Review created!', id: status.insertedId }, { status: 201 });
}
