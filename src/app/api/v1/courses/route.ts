import type { NextRequest } from 'next/server';

import client, { Collections } from '@/lib/db';
import type { Course } from '@/types';

export async function GET(req: NextRequest) {
  const page = parseInt(req.nextUrl.searchParams.get('page') || '0', 10);

  const aggregation = await client
    .db(process.env.MONGODB_DB)
    .collection<Course>(Collections.Courses)
    .aggregate([
      { $match: {} },
      { $project: { _id: 0, description: 0 } },
      { $sort: { id: 1 } },
      { $skip: page * 10 },
      { $limit: 10 },
      {
        $lookup: {
          from: Collections.ProfessorCourseOveralls,
          localField: 'id',
          foreignField: 'course',
          as: 'professors_overalls',
          pipeline: [
            { $project: { _id: 0, tags: 0, course: 0 } },
            { $limit: 4 },
            {
              $lookup: {
                from: Collections.Professors,
                let: { professor: '$professor' },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          {
                            $eq: [
                              {
                                $arrayElemAt: [
                                  { $split: ['$$professor', '_'] },
                                  0,
                                ],
                              },
                              '$first_name',
                            ],
                          },
                          {
                            $eq: [
                              {
                                $arrayElemAt: [
                                  { $split: ['$$professor', '_'] },
                                  1,
                                ],
                              },
                              '$last_name',
                            ],
                          },
                        ],
                      },
                    },
                  },
                ],
                as: 'professor_details',
              },
            },
            {
              $addFields: {
                professor_details: {
                  professor_details: {
                    $arrayElemAt: ['$professor_details', 0],
                  },
                },
              },
            },
            {
              $addFields: {
                profile_icon: {
                  $arrayElemAt: ['$professor_details.profile_icon', 0],
                },
              },
            },
            { $project: { professor_details: 0 } },
          ],
        },
      },
    ])
    .toArray();

  if (!aggregation.length) {
    return Response.json({ error: 'No courses found' }, { status: 404 });
  }

  return Response.json(aggregation);
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body) {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
}
