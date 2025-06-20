import { db } from "@/firebase/config";
import { doc, updateDoc } from "firebase/firestore";

interface IUpdateBlogData {
  title?: string;
  description?: string;
}

export const updateBlogRoute = async (
  id: string,
  dataToUpdate: IUpdateBlogData
): Promise<string> => {
  try {
    const blogRef = doc(db, "blogs", id);

    const updatePayload = {
      ...dataToUpdate,
    };

    await updateDoc(blogRef, updatePayload);

    return id;
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message.includes("document does not exist")) {
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
