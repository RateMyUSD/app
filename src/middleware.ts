import { auth } from '@/auth';

export default auth((req) => {
  if (!req.auth) {
    if (!req.nextUrl.pathname.startsWith('/api/v1') && req.method !== 'GET') {
      const newUrl = new URL('/login', req.nextUrl.origin);
      return Response.redirect(newUrl);
    }

    const newUrl = new URL('/login', req.nextUrl.origin);
    newUrl.searchParams.set('next', req.nextUrl.pathname);

    return Response.redirect(newUrl);
  }
  if (req.nextUrl.pathname.startsWith('/api/v1') && req.method !== 'GET') {
    if (req.auth?.user?.email !== process.env.DEV_EMAIL) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }
});

export const config = {
  matcher: ['/profile/:path*', '/start-review', '/api/v1/:path*'],
};
