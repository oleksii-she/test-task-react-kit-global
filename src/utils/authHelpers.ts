import { getServerSession } from 'next-auth';
import { authOptions } from '@/authConfig';
import { db } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import type { User } from 'next-auth';

const verifyUserExists = async (currentUserId: string): Promise<boolean> => {
  try {
    const docRef = doc(db, 'users', currentUserId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      if (!data.emailVerified) {
        throw new Error('Email not verified.');
      }
    }

    if (!docSnapshot.exists()) {
      throw new Error('The user was not found.');
    }

    if (docSnapshot.id !== currentUserId) {
      throw new Error('Insufficient rights to perform this action.');
    }

    return true;
  } catch (error: unknown) {
    console.error(`Error verifying user ${currentUserId}:`, error);
    throw error;
  }
};

export const userIdentification = async (): Promise<string> => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      throw new Error('Non-authenticated request. Please log in.');
    }

    const currentUser = session.user as User;
    const currentUserId = currentUser.id;

    if (!currentUserId) {
      throw new Error('No User ID found in the session.');
    }

    await verifyUserExists(currentUserId);

    return currentUserId;
  } catch (error) {
    throw error instanceof Error
      ? new Error(`userIdentification error: ${error.message}`)
      : new Error('Unknown error in userIdentification');
  }
};

export const authorizeSession = async (): Promise<string> => {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      throw new Error('Non-authenticated request. Please log in.');
    }

    const currentUser = session.user as User;
    const currentUserId = currentUser.id;

    if (!currentUserId) {
      throw new Error('No User ID found in the session.');
    }

    return currentUserId;
  } catch (error) {
    throw error instanceof Error
      ? new Error(`authorizeSession error: ${error.message}`)
      : new Error('Unknown error in authorizeSession');
  }
};
