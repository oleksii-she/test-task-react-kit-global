"use client";

import { addCommentSchema } from "@/schemasValidation";
import { useRef } from "react";
import { addComment } from "@/store/features/blogSlice";
import { useAppDispatch } from "@/store/hooks";

import { addCommentRoute } from "@/routes/commentsRoutes";

export const CommentForm = ({ id }: { id: string }) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      id,
      author: (formData.get("author") as string) ?? "",
      text: (formData.get("text") as string) ?? "",
    };

    const result = addCommentSchema.safeParse(data);

    if (!result.success) {
      console.error(result.error.format());
      return; // або покажи помилку користувачу
    }

    const res = await addCommentRoute(data);
    console.log(res, "res");
    if (!res) {
      return;
    }
    dispatch(addComment(res));
    formRef.current?.reset();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        name="author"
        placeholder="NickName..."
        className="w-full bg-neutral-900 text-white border border-gray-700 px-4 py-2 rounded-lg resize-none"
      />
      <textarea
        name="text"
        placeholder="Comment..."
        className="w-full bg-neutral-900 text-white border border-gray-700 px-4 py-2 rounded-lg resize-none"
        rows={4}
      />
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-white"
      >
        Надіслати
      </button>
    </form>
  );
};
