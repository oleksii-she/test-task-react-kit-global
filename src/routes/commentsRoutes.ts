import { db } from "@/firebase/config";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  getDocs,
  orderBy,
  getDoc,
  Timestamp,
} from "firebase/firestore";

export const addCommentRoute = async ({
  id,
  author,
  text,
}: {
  id: string;
  author: string;
  text: string;
}) => {
  try {
    const commentsCollectionRef = collection(db, "blogs", id, "comments");

    const docRef = await addDoc(commentsCollectionRef, {
      author,
      text,
      createdAt: serverTimestamp(),
    });

    const newCommentSnapshot = await getDoc(docRef);

    if (newCommentSnapshot.exists()) {
      const newCommentData = newCommentSnapshot.data();

      let createdAtString = "";
      if (newCommentData.createdAt instanceof Timestamp) {
        const date = newCommentData.createdAt.toDate();
        createdAtString = date.toLocaleDateString("uk-UA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
      } else {
        console.warn(
          "createdAt не є об'єктом Timestamp:",
          newCommentData.createdAt
        );
        createdAtString = new Date().toLocaleDateString("uk-UA", {});
      }

      const finalAuthor = newCommentData.author as string;
      const finalText = newCommentData.text as string;

      return {
        id: docRef.id,
        author: finalAuthor,
        text: finalText,
        createdAt: createdAtString,
      };
    } else {
      throw new Error("Щойно доданий коментар не знайдено у Firestore.");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Помилка під час додавання коментаря:", error.message);
    } else {
      console.error("Невідома помилка під час додавання коментаря:", error);
    }
    throw error;
  }
};

export const getCommentsForPost = async (blogPostId: string) => {
  try {
    const commentsCollectionRef = collection(
      db,
      "blogs",
      blogPostId,
      "comments"
    );

    const q = query(commentsCollectionRef, orderBy("createdAt", "asc"));

    const querySnapshot = await getDocs(q);

    const comments = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      let createdAtString = "";

      if (data.createdAt && typeof data.createdAt.toDate === "function") {
        const date = data.createdAt.toDate();

        createdAtString = date.toLocaleDateString("uk-UA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
      }

      return {
        id: doc.id,
        ...data,
        createdAt: createdAtString,
      };
    });
    return comments;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("comment error:", error.message);
    } else {
      console.error("unknown error:", error);
    }
    throw error;
  }
};
