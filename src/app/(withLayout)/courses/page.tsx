'use client';

import Link from 'next/link';
import useSWRInfinite from 'swr/infinite';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { fetcher } from '@/lib/swr';
import type { RatingMetric } from '@/types';

const getKey = (pageIndex: number, previousPageData: any) => {
  if (previousPageData && !previousPageData.length) return null; // reached the end
  return `/api/v1/courses?page=${pageIndex}`; // SWR key
};

type Course = {
  credit_hours: number;
  number: string;
  subject: string;
  title: string;
  id: string;
  professors_overalls: {
    professor: string;
    metrics: Record<RatingMetric, number>;
    overall: number;
    profile_icon?: string;
  }[];
};

export default function Page() {
  const { data, size, setSize } = useSWRInfinite<Course[]>(getKey, fetcher, {
    refreshInterval: 0,
  });
  if (!data) return <div>Loading...</div>;

  console.log(data);
  return (
    <>
      <h1 className="py-2">Courses</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-full gap-4">
        {data?.map((page) => {
          return page.map((course) => (
            <div
              key={course.id}
              className="col-span-1 border border-primary rounded-md p-3 flex flex-col bg-secondary hover:bg-secondary/80 space-y-2 select-none"
            >
              <div className="flex flex-row justify-between">
                <Link href={`/courses/${course.id}`}>
                  <Badge className="max-w-content text-sm rounded-md">
                    {course.id.replace(/-/g, ' ')}
                  </Badge>
                </Link>
                <div>
                  Overall Rating:{' '}
                  {course.professors_overalls
                    .map((professor) => professor.overall)
                    .reduce((a, b) => a + b, 0) /
                    course.professors_overalls.length}
                </div>
              </div>
              <Link
                href={`/courses/${course.id}`}
                className="text-lg font-semibold"
              >
                {course.title}
              </Link>
              <div className="flex flex-col px-2">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  {course.professors_overalls.map(
                    ({ professor, profile_icon, overall }) => (
                      <Link
                        href={`/professors/${professor}/${course.id}`}
                        passHref
                        key={professor}
                      >
                        <div className="bg-background hover:bg-background/80 col-span-1 flex flex-row border border-primary rounded-md p-2 items-center gap-2">
                          <Avatar>
                            <AvatarImage src={profile_icon} />
                            <AvatarFallback>
                              {professor
                                .split('_')
                                .map((name) => name.toUpperCase().charAt(0))
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                          <p className="capitalize text-sm font-semibold">
                            {professor.split('_').join(' ')}
                          </p>
                          <div className="grow text-sm justify-end flex flex-row gap-1 items-center">
                            <div className="rounded py-1 px-2 bg-green-500 text-secondary">
                              {overall ?? 'N/A'}
                            </div>
                            Overall
                          </div>
                        </div>
                      </Link>
                    ),
                  )}
                </div>
              </div>
            </div>
          ));
        })}
      </div>
      <div className="flex justify-center mt-2">
        <Button onClick={() => setSize(size + 1)}>Load more Courses...</Button>
      </div>
    </>
  );
}
