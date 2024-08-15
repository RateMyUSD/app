import { auth } from '@/auth';

export default async function Page() {
  const session = await auth();
  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
}
