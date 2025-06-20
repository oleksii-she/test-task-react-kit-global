import { db } from "@/firebase/config"; // Імпортуємо ваш ініціалізований db
import { doc, deleteDoc } from "firebase/firestore"; // Імпортуємо doc та deleteDoc

export const deleteBlogRoute = async (id: string): Promise<string> => {
  try {
    const blogRef = doc(db, "blogs", id);

    await deleteDoc(blogRef);
    return "success";
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message.includes("document does not exist")) {
        console.error(`Id:  ${id} not found.`, error.message);
      } else {
        console.error(`error delete ${id}:`, error.message);
      }
    } else {
      console.error(`error ${id}:`, error);
    }
    throw error;
  }
};
