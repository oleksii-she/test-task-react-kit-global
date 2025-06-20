import { db } from "@/firebase/config";
import { collection, doc, setDoc } from "firebase/firestore";

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

    return docRef;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("error:", error.message);
    } else {
      console.error("unknown error:", error);
    }
    throw error;
  }
};
