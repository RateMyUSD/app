import { Separator } from '@/components/ui/separator';
import ReviewForm from './form';

export default function Page() {
  return (
    <div className="mx-[5vw] md:mx-[10vw] rounded-sm border p-3">
      <h1 className="font-bold text-2xl">Start a Review</h1>
      <Separator />
      <ReviewForm
        professors={['saturnino_garcia', 'kevin_grogan', 'sophia_krause-levy']}
        courses={['COMP-110', 'COMP-120', 'COMP-230', 'COMP-280', 'COMP-300']}
      />
    </div>
  );
}
