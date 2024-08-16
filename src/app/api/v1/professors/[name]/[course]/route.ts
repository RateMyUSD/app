import client, { Collections } from '@/lib/db';
import type { ProfessorCourseRatingOverall } from '@/types';

export async function GET(
  _: Request,
  { params }: { params: { name: string, course: string } },
) {
  const course = params.course.toUpperCase()

  const professor = await client
    .db(process.env.MONGODB_DB)
    .collection<ProfessorCourseRatingOverall>(Collections.ProfessorCourseOveralls)
    .findOne({ professor: params.name.toLowerCase(), course }, { projection: { _id: 0 } });

  if (!professor) {
    return Response.json({ error: 'Professor not found' }, { status: 404 });
  }
  
  return Response.json(professor);
}
