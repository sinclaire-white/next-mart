// src/app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUsers } from '../../../../lib/db'; 
import bcrypt from 'bcrypt';

// Ensure NEXTAUTH_URL is set dynamically if not present
process.env.NEXTAUTH_URL = process.env.NEXTAUTH_URL || 
  (process.env.NODE_ENV === 'production'
    ? 'https://product-hub-gray.vercel.app/' 
    : 'http://localhost:3000');

export const authOptions = {
  //  Providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'you@example.com' },
        password: { label: 'Password', type: 'password', placeholder: '••••••' },
      },
      // This function runs when user tries to log in
      async authorize(credentials) {
        // Get all users from  DB
        const users = await getUsers();

        // Find user by email
        const user = users.find(u => u.email === credentials.email);
        if (!user) throw new Error('No user found with this email');

        // Compare hashed password
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error('Invalid password');

        // Return user object (this becomes available in session)
        return { id: user.id, email: user.email };
      },
    }),
  ],

  // Custom pages
  pages: {
    signIn: '/login', // redirect here for login
  },

  // Session strategy
  session: {
    strategy: 'jwt', // use JWTs instead of database sessions
  },

  // Callbacks
  callbacks: {
    // Attach user info to JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    // Attach token info to session
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      return session;
    },
  },

  // Secret for signing JWT
  secret: process.env.NEXTAUTH_SECRET,
};

// Export NextAuth handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
