'use client';

import { useParams } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const params = useParams();
  const hasProfessor = params.professor!!;
  const hasCourse = params.course!!;

  return (
    <>
      {hasProfessor && (
        <Breadcrumb className="py-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/professors">Professors</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="capitalize">
              {hasCourse ? (
                <BreadcrumbLink href={`/professors/${params.professor}`}>
                  {(params.professor as string).split('_').join(' ')}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>
                  {(params.professor as string).split('_').join(' ')}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {hasCourse && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="uppercase">
                    {(params.course as string).split('-').join(' ')}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      )}
      {children}
    </>
  );
}
