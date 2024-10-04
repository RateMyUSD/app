import {
  BookText,
  GraduationCap,
  MessageSquareHeart,
  SquarePen,
} from 'lucide-react';
import Link from 'next/link';

import { Dots } from '@/components/dots';
import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <>
      <div className="relative pt-20 pb-16 md:pt-40 md:pb-20">
        <Dots
          className={'absolute hidden md:block text-primary'}
          style={{ left: 0, top: 100 }}
        />
        <Dots
          className={'absolute hidden md:block text-primary'}
          style={{ left: 60, top: 100 }}
        />
        <Dots
          className={'absolute hidden md:block text-primary'}
          style={{ left: 0, top: 240 }}
        />
        <Dots
          className={'absolute hidden md:block text-primary'}
          style={{ right: 0, top: 160 }}
        />

        <div className="relative z-[1] select-none">
          <div className="flex justify-center gap-1 text-primary mb-2">
            <h1 className="text-left md:text-center text-3xl md:text-5xl font-extrabold  tracking-[-1px] ">
              RateMyUSD
            </h1>
            <MessageSquareHeart size={40} />
          </div>
          <div className="flex justify-center items-center">
            <h2 className="text-left md:text-center md:max-w-[35vw] text-md">
              Your voice matters! Rate University of San Diego professors and
              courses to provide valuable feedback, guide future students, and
              improve the overall learning experience. Share your insights and
              help shape academic success at USD!
            </h2>
          </div>
          <div className="flex justify-center items-center flex-col md:flex-row gap-2 mt-4">
            <Link href="/courses">
              <Button variant="secondary" className="gap-1">
                View Courses
                <BookText size={20} />
              </Button>
            </Link>
            <Link href="/professors">
              <Button variant="secondary" className="gap-1">
                View Professors
                <GraduationCap size={20} />
              </Button>
            </Link>
            <Link href="/start-review">
              <Button className="gap-1">
                Start a Review
                <SquarePen size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
