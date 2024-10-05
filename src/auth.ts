import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const { auth, handlers, signIn, signOut } = NextAuth({
  trustHost: true,
  callbacks: {
    async signIn({ profile }) {
      return (profile?.email_verified &&
        profile.email?.endsWith(`@${process.env.EMAIL_DOMAIN}`))!!;
    },
  },
  pages: {
    signIn: '/login',
  },
  providers: [Google],
});
