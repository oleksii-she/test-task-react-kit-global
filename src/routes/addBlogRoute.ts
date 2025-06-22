import { db } from "@/firebase/config";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { formatFireStoreTimestamp } from "@/utills";
export const addBlogRoute = async ({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) => {
  try {
    const docRef = doc(collection(db, "blogs"), id);

    await setDoc(docRef, {
      title,
      description,
      createdAt: new Date(),
    });

    const newBlogSnapshot = await getDoc(docRef);

    if (newBlogSnapshot.exists()) {
      const newBlogData = newBlogSnapshot.data();

      const createdAtString = formatFireStoreTimestamp(newBlogData.createdAt);

      return {
        id: docRef.id,
        title: newBlogData.title as string,
        description: newBlogData.description as string,
        createdAt: createdAtString,
      };
    } else {
      throw new Error("Just added/Updated Blog was not found in Firestore.");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("error:", error.message);
    } else {
      console.error("unknown error:", error);
    }
    throw error;
  }
};
