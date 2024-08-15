import client, { Collections } from '@/lib/db';
import type { Professor } from '@/types';

export async function GET(
  _: Request,
  { params }: { params: { name: string } },
) {
  const [first, last] = params.name
    .split('-')
    .map((name) => name.toLowerCase());
  const professor = await client
    .db(process.env.MONGODB_DB)
    .collection<Professor>(Collections.Professors)
    .findOne({ first_name: first, last_name: last });
  return Response.json(professor);
}
