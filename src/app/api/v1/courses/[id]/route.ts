import client, { Collections } from '@/lib/db';
import type { Course } from '@/types';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const courses = await client
    .db(process.env.MONGODB_DB)
    .collection<Course>(Collections.Courses)
    .findOne({ $text: { $search: params.id, $caseSensitive: false } });
  return Response.json(courses);
}
