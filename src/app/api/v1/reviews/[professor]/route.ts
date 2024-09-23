import client, { Collections } from '@/lib/db';
import type { ProfessorCourseReview } from '@/types';
import { ObjectId } from 'mongodb';

export async function GET(
  _: Request,
  { params }: { params: { professor: string } },
) {
  const review = await client
    .db(process.env.MONGODB_DB)
    .collection<ProfessorCourseReview>(Collections.CourseReviews)
    .findOne(
      { _id: new ObjectId(params.professor) },
      { projection: { _id: 0, author: 0 } },
    );

  if (!review) {
    return Response.json({ error: 'Review not found' }, { status: 404 });
  }

  return Response.json(review);
}
