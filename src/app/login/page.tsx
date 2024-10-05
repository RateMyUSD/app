import Image from 'next/image';

import { signIn } from '@/auth';
import { Button } from '@/components/ui/button';

export default function Page({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  return (
    <form
      className="container flex items-center justify-center h-screen"
      action={async () => {
        'use server';
        await signIn('google', { redirectTo: searchParams.next ?? '/' });
      }}
    >
      <div className="rounded-lg border p-6 min-w-[348px] mt-[-100px]">
        <h1 className="text-xl font-bold text-center">
          Log in to your account
        </h1>
        <Button
          className="w-full mt-4 font-semibold"
          variant="outline"
          type="submit"
        >
          <Image
            src="/google_logo.svg"
            width={24}
            height={24}
            alt="Google Logo"
            className="mr-2"
          />
          Continue with Google
        </Button>
      </div>
    </form>
  );
}
