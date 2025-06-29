'use server';

import { db } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { IProfile } from '@/types/types';
import { formatFireStoreTimestamp } from '@/utils/utills';

export const getUserId = async (userId: string): Promise<IProfile | null> => {
  try {
    if (!userId) {
      return null;
    }
    const docRef = doc(db, 'users', userId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      const createdAtString = formatFireStoreTimestamp(data.createdAt);

      const profile: IProfile = {
        id: docSnapshot.id,
        name: data.name,
        avatar: data.avatar,
        description: data.description,
        contacts: {
          phone: data.phone,
          email: data.email,
          linkedIn: data.linkedIn,
          twitter: data.twitter,
          telegram: data.telegram,
        },
        showContacts: data.showContacts,
        createdAt: createdAtString,
      };

      return profile;
    } else {
      return null;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error when receiving a user with an ID ${userId}:`, error.message);
    } else {
      console.error(`Unknown error when receiving a user with ID ${userId}:`, error);
    }
    throw error;
  }
};
