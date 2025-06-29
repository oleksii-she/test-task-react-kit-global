import { getServerSession } from 'next-auth';
import { authOptions } from '@/authConfig'; // Ваш конфіг NextAuth.js
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/config'; // Ваші імпорти Firebase

import type { User } from 'next-auth';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new Response(JSON.stringify({ status: 'unauthenticated' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const currentUser = session.user as User;

  if (!currentUser.id) {
    return new Response(JSON.stringify({ status: 'unauthenticated', reason: 'no_user_id' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const userId = currentUser.id;

  try {
    const userDocRef = doc(db, 'users', userId);
    const userDocSnap = await getDoc(userDocRef);
    const userData = userDocSnap.data();

    if (!userDocSnap.exists()) {
      return new Response(JSON.stringify({ status: 'deactivated', reason: 'account_deleted' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (userData && userData.isActive === false) {
      return new Response(
        JSON.stringify({
          status: 'deactivated',
          reason: 'account_deactivated',
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({
        status: 'active',
        user: { id: userId, name: userData?.name, email: userData?.email },
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Firebase status check error:', error);
    return new Response(JSON.stringify({ status: 'error', message: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
