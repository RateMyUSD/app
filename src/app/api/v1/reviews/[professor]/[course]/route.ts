import client, { Collections } from '@/lib/db';
import type { ProfessorCourseReview } from '@/types';

export async function GET(
  _: Request,
  { params }: { params: { professor: string, course: string } },
) {
  const course = params.course.toUpperCase()

  const review = await client
    .db(process.env.MONGODB_DB)
    .collection<ProfessorCourseReview>(Collections.CourseReviews)
    .findOne({ professor: params.professor.toLowerCase(), course }, { projection: { _id: 0, author: 0 } });

  if (!review) {
    return Response.json({ error: 'Review not found' }, { status: 404 });
  }

  return Response.json(review);
}
