"use client";

import { addCommentSchema } from "@/schemasValidation";
import { useRef, useState } from "react";
import { addComment } from "@/store/features/blogSlice";
import { useAppDispatch } from "@/store/hooks";
import { Loader } from "../Loader/Loader";
import { addCommentRoute } from "@/routes/commentsRoutes";

export const CommentForm = ({ id }: { id: string }) => {
  const [load, setLoad] = useState(false);
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

    setLoad(true);
    const result = addCommentSchema.safeParse(data);

    if (!result.success) {
      setLoad(false);
      console.error(result.error.format());
      return;
    }

    const res = await addCommentRoute(data);

    if (!res) {
      setLoad(false);
      return;
    }
    dispatch(addComment(res));
    setLoad(false);
    formRef.current?.reset();
  };

  return (
    <form className="space-y-4 pb-6" onSubmit={handleSubmit} ref={formRef}>
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
      {load && <Loader />}
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-white"
      >
        Submit
      </button>
    </form>
  );
};
