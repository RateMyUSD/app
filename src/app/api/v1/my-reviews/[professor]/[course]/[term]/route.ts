import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import client, { Collections } from '@/lib/db';
import { hashAuthor } from '@/lib/utils';
import type { ProfessorCourseReview } from '@/types';

export const GET = auth(async (req, { params }) => {
  if (!req.auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { email } = req.auth.user!;
  const { professor, course, term } = params as {
    professor: string;
    course: string;
    term: string;
  };

  const review = await client
    .db(process.env.MONGODB_DB)
    .collection<ProfessorCourseReview>(Collections.CourseReviews)
    .findOne(
      {
        professor: professor.toLowerCase(),
        course: course.toUpperCase(),
        term,
        author: await hashAuthor(email!),
      },
      { projection: { _id: 0, author: 0 } },
    );

  if (!review) {
    return NextResponse.json({ error: 'Review not found' }, { status: 404 });
  }

  return NextResponse.json(review);
});

export const PATCH = auth(async (req, { params }) => {
  if (!req.auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { email } = req.auth.user!;
  const { professor, course, term } = params as {
    professor: string;
    course: string;
    term: string;
  };
});

export const DELETE = auth(async (req, { params }) => {
  if (!req.auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { email } = req.auth.user!;
  const { professor, course, term } = params as {
    professor: string;
    course: string;
    term: string;
  };
});
