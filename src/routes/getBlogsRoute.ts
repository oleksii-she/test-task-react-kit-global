import { db } from '@/firebase/config';
import { doc, getDoc, collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { IBlog } from '@/types/types';
import { formatFireStoreTimestamp } from '@/utils/utills';
import { getUserId } from './getUserId';

export const getBlogsRoute = async (): Promise<IBlog[]> => {
  try {
    const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    const blogs: IBlog[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const createdAtString = formatFireStoreTimestamp(data.createdAt);

      blogs.push({
        id: doc.id,
        userId: data.userId ?? '',
        title: data.title,
        description: data.description,
        createdAt: createdAtString,
      });
    });

    return blogs;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('get blog error:', error.message);
    } else {
      console.error('unknown error:', error);
    }
    throw error;
  }
};

export const getBlogsByUserId = async (userId: string): Promise<IBlog[]> => {
  try {
    const q = query(collection(db, 'blogs'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    const rawBlogs = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        userId: data.userId ?? '',
        title: data.title,
        description: data.description,
        createdAt: data.createdAt,
      };
    });

    rawBlogs.sort((a, b) => b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime());

    const blogs: IBlog[] = rawBlogs.map((blog) => ({
      ...blog,
      createdAt: formatFireStoreTimestamp(blog.createdAt),
    }));

    return blogs;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('get blogs by userId error:', error.message);
    } else {
      console.error('unknown error:', error);
    }
    throw error;
  }
};

export const getBlogByIdRoute = async (id: string): Promise<IBlog | null> => {
  try {
    const docRef = doc(db, 'blogs', id);

    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      const createdAtString = formatFireStoreTimestamp(data.createdAt);
      const user = await getUserId(data.userId);

      return {
        id: docSnapshot.id,
        title: data.title,
        name: user?.name,
        description: data.description,
        userId: data.userId,
        createdAt: createdAtString,
      } as IBlog;
    } else {
      return null;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Помилка при отриманні блогу з ID ${id}:`, error.message);
    } else {
      console.error(`Невідома помилка при отриманні блогу з ID ${id}:`, error);
    }
    throw error;
  }
};
