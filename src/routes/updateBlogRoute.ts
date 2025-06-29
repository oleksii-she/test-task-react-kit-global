'use server';
import { revalidatePath } from 'next/cache';
import { db } from '@/firebase/config';
import { IBlog } from '@/types/types';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { formatFireStoreTimestamp } from '@/utils/utills';
interface IUpdateBlogData {
  title?: string;
  description?: string;
}

export const updateBlogRoute = async (
  id: string,
  dataToUpdate: IUpdateBlogData
): Promise<IBlog> => {
  try {
    const blogRef = doc(db, 'blogs', id);

    const updatePayload = {
      ...dataToUpdate,
    };

    await updateDoc(blogRef, updatePayload);
    const newBlogSnapshot = await getDoc(blogRef);

    if (newBlogSnapshot.exists()) {
      const newBlogData = newBlogSnapshot.data();

      const createdAtString = formatFireStoreTimestamp(newBlogData.createdAt);

      revalidatePath(`/${blogRef.id}`);
      return {
        id: blogRef.id,
        title: newBlogData.title as string,
        description: newBlogData.description as string,
        createdAt: createdAtString,
      };
    } else {
      throw new Error('Just added/Updated Blog was not found in Firestore.');
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message.includes('document does not exist')) {
        console.error(`Id:  ${id} not found.`, error.message);
      } else {
        console.error(`error update ${id}:`, error.message);
      }
    } else {
      console.error(`error ${id}:`, error);
    }
    throw error;
  }
};
