import client, { Collections } from '@/lib/db';
import type { ProfessorCourseRatingOverall } from '@/types';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const professors = await client
    .db(process.env.MONGODB_DB)
    .collection<ProfessorCourseRatingOverall>(
      Collections.ProfessorCourseOveralls,
    )
    .find({ course: params.id.toLowerCase() })
    .project({ _id: 0, tags: 0 })
    .limit(4)
    .toArray();

  if (!professors.length) {
    return Response.json({ error: 'No professors found' }, { status: 404 });
  }

  return Response.json(professors);
}
