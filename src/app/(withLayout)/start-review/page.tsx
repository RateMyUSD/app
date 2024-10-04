import { Separator } from '@/components/ui/separator';

import ReviewForm from './form';
import { getCourseIdsFromDB, getProfessorNamesFromDB } from '@/lib/db';

async function getProfessorNames(): Promise<string[]> {
  try {
    const names = await getProfessorNamesFromDB();
    return names;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getCourseIds(): Promise<string[]> {
  try {
    const ids = await getCourseIdsFromDB();
    return ids;
  }
  catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Page() {
  const courseIds = await getCourseIds();
  const professorNames = await getProfessorNames();

  return (
    <div className="mx-[5vw] md:mx-[10vw] rounded-sm border p-3">
      <h1 className="font-bold text-2xl">Start a Review</h1>
      <Separator />
      <ReviewForm
        professors={professorNames}
        courses={courseIds}
      />
    </div>
  );
}
