import { db } from "@/firebase/config";
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
} from "firebase/firestore";
import { formatFireStoreTimestamp } from "@/utills";
import { IComment } from "@/types";
export const addCommentRoute = async ({
  id,
  author,
  text,
}: {
  id: string;
  author: string;
  text: string;
}): Promise<IComment> => {
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

      const createdAtString = formatFireStoreTimestamp(
        newCommentData.createdAt
      );

      const finalAuthor = newCommentData.author as string;
      const finalText = newCommentData.text as string;

      return {
        id: docRef.id,
        author: finalAuthor,
        text: finalText,
        createdAt: createdAtString,
      };
    } else {
      throw new Error("comment is not found in Firestore.");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("error add comment:", error.message);
    } else {
      console.error("unknown comments error:", error);
    }
    throw error;
  }
};

export const getCommentsForPost = async (
  blogPostId: string
): Promise<IComment[]> => {
  try {
    const commentsCollectionRef = collection(
      db,
      "blogs",
      blogPostId,
      "comments"
    );

    const q = query(commentsCollectionRef, orderBy("createdAt", "desc"));

    const querySnapshot = await getDocs(q);

    const comments = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const createdAtString = formatFireStoreTimestamp(data.createdAt);

      return {
        id: doc.id,
        author: data.author ?? "",
        text: data.text ?? "",
        createdAt: createdAtString,
      };
    });

    return comments;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("error get comment:", error.message);
    } else {
      console.error("unknown comments error:", error);
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
    const commentDocRef = doc(db, "blogs", blogPostId, "comments", commentId);

    await deleteDoc(commentDocRef);

    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("error delete comment:", error.message);
    } else {
      console.error("unknown comments error:", error);
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
    const commentDocRef = doc(
      db,
      "blogs",
      blogPostId,
      "comments",
      editingCommentId
    );

    const dataToUpdate = {
      ...updates,
      updatedAt: serverTimestamp(),
    };

    await updateDoc(commentDocRef, dataToUpdate);

    const newCommentSnapshot = await getDoc(commentDocRef);

    if (newCommentSnapshot.exists()) {
      const newCommentData = newCommentSnapshot.data();

      const createdAtString = formatFireStoreTimestamp(
        newCommentData.createdAt
      );

      const finalAuthor = newCommentData.author as string;
      const finalText = newCommentData.text as string;

      return {
        id: commentDocRef.id,
        author: finalAuthor,
        text: finalText,
        createdAt: createdAtString,
      };
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("comment update error:", error.message);
    } else {
      console.error("unknown error:", error);
    }
    throw error;
  }
};
