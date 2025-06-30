'use server';

import { db } from '@/firebase/config';
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  getDocs,
  orderBy,
  getDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { formatFireStoreTimestamp } from '@/utils/utills';
import { IComment, IProfile } from '@/types/types';
import { userIdentification } from '@/utils/authHelpers';
import { getUserId } from './getUserId';

export const addCommentRoute = async ({
  id,
  text,
}: {
  id: string;

  text: string;
}): Promise<IComment> => {
  try {
    const currentUser = await userIdentification();
    const commentsCollectionRef = collection(db, 'blogs', id, 'comments');

    const docRef = await addDoc(commentsCollectionRef, {
      text,
      userId: currentUser,
      createdAt: serverTimestamp(),
    });

    const newCommentSnapshot = await getDoc(docRef);
    const data: IProfile | null = await getUserId(currentUser);

    if (!data) {
      throw new Error('Could not get the username.');
    }

    if (newCommentSnapshot.exists()) {
      const newCommentData = newCommentSnapshot.data();

      const createdAtString = formatFireStoreTimestamp(newCommentData.createdAt);

      return {
        id: docRef.id,
        userId: newCommentData.userId,
        author: data.name,
        avatar: data.avatar ?? '',
        text: newCommentData.text,
        createdAt: createdAtString,
      };
    } else {
      throw new Error('comment is not found in Firestore.');
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('error add comment:', error.message);
    } else {
      console.error('unknown comments error:', error);
    }
    throw error;
  }
};

export const getCommentsForPost = async (blogPostId: string): Promise<IComment[]> => {
  try {
    const commentsCollectionRef = collection(db, 'blogs', blogPostId, 'comments');

    const q = query(commentsCollectionRef, orderBy('createdAt', 'desc'));

    const querySnapshot = await getDocs(q);

    const commentsPromises = querySnapshot.docs.map(async (doc) => {
      const data = doc.data();
      const createdAtString = formatFireStoreTimestamp(data.createdAt);
      const userData: IProfile | null = await getUserId(data.userId);
      console.log(userData, 'userData');

      /*   if (!userData) {
        throw new Error('Could not get the user.');
      } */

      return {
        id: doc.id,
        author: userData?.name ? userData.name : 'The user has been deleted',
        avatar: userData?.avatar ? userData.avatar : '',
        userId: data.userId ? data.userId : '',
        text: data.text ?? '',
        createdAt: createdAtString,
      };
    });

    const comments: IComment[] = await Promise.all(commentsPromises);
    return comments;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('error get comment:', error.message);
    } else {
      console.error('unknown comments error:', error);
    }
    throw error;
  }
};

export const deleteCommentRoute = async ({
  blogPostId,
  commentId,
}: {
  blogPostId: string;
  commentId: string;
}) => {
  try {
    const currentUserId = await userIdentification();

    const commentDocRef = doc(db, 'blogs', blogPostId, 'comments', commentId);

    const commentSnap = await getDoc(commentDocRef);

    if (!commentSnap.exists()) {
      throw new Error('The Comment was not found.');
    }

    const blogData = commentSnap.data() as IComment;

    if (blogData.userId !== currentUserId) {
      throw new Error('Insufficient rights to delete this comment');
    }

    await deleteDoc(commentDocRef);

    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('error delete comment:', error.message);
    } else {
      console.error('unknown comments error:', error);
    }
    throw error;
  }
};

interface CommentUpdateData {
  text?: string;
  author?: string;
}

export const updateCommentRoute = async ({
  blogPostId,
  editingCommentId,
  updates,
}: {
  blogPostId: string;
  editingCommentId: string;
  updates: CommentUpdateData;
}): Promise<IComment | undefined> => {
  try {
    const currentUserId = await userIdentification();
    const commentDocRef = doc(db, 'blogs', blogPostId, 'comments', editingCommentId);

    const commentSnap = await getDoc(commentDocRef);

    if (!commentSnap.exists()) {
      throw new Error('The Comment was not found.');
    }

    const blogData = commentSnap.data() as IComment;

    if (blogData.userId !== currentUserId) {
      throw new Error('Insufficient rights to delete this comment');
    }

    const dataToUpdate = {
      ...updates,
      updatedAt: serverTimestamp(),
    };

    await updateDoc(commentDocRef, dataToUpdate);

    const newCommentSnapshot = await getDoc(commentDocRef);

    if (newCommentSnapshot.exists()) {
      const newCommentData = newCommentSnapshot.data();

      const createdAtString = formatFireStoreTimestamp(newCommentData.createdAt);
      const userData: IProfile | null = await getUserId(newCommentData.userId);

      if (!userData) {
        throw new Error('Could not get the user.');
      }

      return {
        id: commentDocRef.id,
        userId: newCommentData.userId,
        avatar: userData?.avatar ?? '',
        author: userData?.name ?? '',
        text: newCommentData.text,
        createdAt: createdAtString,
      };
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('comment update error:', error.message);
    } else {
      console.error('unknown error:', error);
    }
    throw error;
  }
};
