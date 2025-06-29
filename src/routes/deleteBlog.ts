'use server';
import { revalidatePath } from 'next/cache';
import { db } from '@/firebase/config';
import { doc, deleteDoc, getDoc } from 'firebase/firestore';

import { IBlog } from '@/types/types';
import { userIdentification } from '@/utils/authHelpers';

export const deleteBlogRoute = async (id: string): Promise<string> => {
  try {
    const currentUserId = await userIdentification();

    const blogRef = doc(db, 'blogs', id);
    const blogSnap = await getDoc(blogRef);

    if (!blogSnap.exists()) {
      throw new Error('The blog was not found.');
    }

    const blogData = blogSnap.data() as IBlog;

    if (blogData.userId !== currentUserId) {
      throw new Error('Insufficient rights to delete this blog');
    }
    await deleteDoc(blogRef);
    revalidatePath('/');

    return 'success';
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message.includes('document does not exist')) {
        console.error(`Id:  ${id} not found.`, error.message);
      } else {
        console.error(`error delete ${id}:`, error.message);
      }
    } else {
      console.error(`error ${id}:`, error);
    }
    throw error;
  }
};
