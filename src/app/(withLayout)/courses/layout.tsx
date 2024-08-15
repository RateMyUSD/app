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
  const hasId = params.id!!;

  return (
    <>
      {hasId && (
        <Breadcrumb className="py-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/courses">Courses</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="uppercase">
                {(params.id as string).split('-').join(' ')}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )}
      {children}
    </>
  );
}
