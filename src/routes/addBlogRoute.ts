import { db } from "@/firebase/config";
import { collection, addDoc } from "firebase/firestore";

export const addBlogRoute = async ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  try {
    const docRef = await addDoc(collection(db, "blogs"), {
      title,
      description,
      createdAt: new Date(),
    });

    return docRef.id;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("error:", error.message);
    } else {
      console.error("Невідома помилка:", error);
    }
    throw error;
  }
};
