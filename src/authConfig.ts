import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase/config';

import type { User } from 'next-auth';

type FirebaseAuthError = {
  code: string;
  message: string;
};

function isFirebaseAuthError(error: unknown): error is FirebaseAuthError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error &&
    typeof (error as Record<string, unknown>).code === 'string' &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'jsmith@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Будь ласка, введіть електронну пошту та пароль.');
        }

        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );

          const firebaseUser = userCredential.user;

          if (firebaseUser) {
            const userDocRef = doc(db, 'users', firebaseUser.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
              const firestoreData = userDocSnap.data();
              return {
                id: firebaseUser.uid,
                email: firebaseUser.email,
                name: firestoreData.name,
              } as User;
            } else {
              throw new Error('Дані профілю користувача не знайдено.');
            }
          }
          return null;
        } catch (error: unknown) {
          if (isFirebaseAuthError(error)) {
            console.error('Firebase Auth Error during authorize:', error.code, error.message);
            if (
              error.code === 'auth/user-not-found' ||
              error.code === 'auth/wrong-password' ||
              error.code === 'auth/invalid-credential'
            ) {
              throw new Error('Incorrect email or password.');
            }
          } else {
            console.error('Unknown error during authorize:', error);
          }
          throw new Error('Error logging in. Please try again.');
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        if (session.user) {
          const extendedUser = session.user as User;
          extendedUser.id = token.id as string;
          extendedUser.name = token.name;
          extendedUser.email = token.email;
        }
      }
      return session;
    },
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },

  pages: {
    signIn: '/auth/signin',
  },

  secret: process.env.NEXTAUTH_SECRET,
};
