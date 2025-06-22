import { db } from "@/firebase/config";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { IBlog } from "@/types";
import { formatFireStoreTimestamp } from "@/utills";
export const getBlogsRoute = async (): Promise<IBlog[]> => {
  try {
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const blogs: IBlog[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const createdAtString = formatFireStoreTimestamp(data.createdAt);

      blogs.push({
        id: doc.id,
        title: data.title,
        description: data.description,
        createdAt: createdAtString,
      });
    });

    return blogs;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("get blog error:", error.message);
    } else {
      console.error("unknown error:", error);
    }
    throw error;
  }
};

export const getBlogByIdRoute = async (id: string): Promise<IBlog | null> => {
  try {
    const docRef = doc(db, "blogs", id);

    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      let createdAtString: string;

      if (data.createdAt instanceof Timestamp) {
        createdAtString = data.createdAt.toDate().toISOString();
      } else if (data.createdAt) {
        try {
          createdAtString = new Date(data.createdAt).toISOString();
        } catch {
          createdAtString = new Date().toISOString();
        }
      } else {
        createdAtString = new Date().toISOString();
      }

      return {
        id: docSnapshot.id,
        title: data.title,
        description: data.description,
        createdAt: createdAtString,
      } as IBlog;
    } else {
      console.log(`Блог з ID: ${id} не знайдено.`);
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
