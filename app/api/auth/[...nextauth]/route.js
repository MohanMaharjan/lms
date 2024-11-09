import CredentialsProvider from 'next-auth/providers/credentials';
import myAxios from '@/lib/axios.config';
import NextAuth from 'next-auth/next';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          return null;
        }

        try {
          const response = await myAxios.post('/auth/login', {
            email: credentials.email,
            password: credentials.password,
          });

          if (response.status === 200 && response.data.token) {
            const user = {
              ...response.data.user,
              accessToken: response.data.token,
            };
            //console.log(user);
            return user;
          } else {
            throw new Error('Invalid response from server');
          }
        } catch (error) {
          throw new Error('Login failed');
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
    signUp: '/register',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update') {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 1 * 1 * 60 * 60,
    updateAge: 1 * 1 * 60 * 60, // 10 minutes
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
