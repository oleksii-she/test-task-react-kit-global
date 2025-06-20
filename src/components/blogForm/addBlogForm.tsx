"use client";

import { addBlogSchema } from "@/schemasValidation";
import { useState, useRef, SetStateAction } from "react";
import { addBlog } from "@/store/features/blogSlice";
import { useAppDispatch } from "@/store/hooks";
import { nanoid } from "nanoid";
import { addBlogRoute } from "@/routes/addBlogRoute";

export const AddBlogForm = ({
  setModalToggle,
}: {
  setModalToggle: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      id: `${nanoid()}`,
      title: formData.get("title"),
      description: formData.get("description"),
    };

    const result = addBlogSchema.safeParse(data);

    if (!result.success) {
      const formatted = result.error.format();
      setErrors({
        title: formatted.title?._errors[0],
        description: formatted.description?._errors[0],
      });
      return;
    }

    await addBlogRoute(result.data);
    dispatch(addBlog(result.data));

    setErrors({});
    formRef.current?.reset();
    setModalToggle(false);
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 rounded-xl bg-black shadow-md space-y-4"
    >
      <div>
        <input
          name="title"
          placeholder="Title"
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.title && (
          <label className="text-red-500 text-sm mt-1">{errors.title}</label>
        )}
      </div>

      <div>
        <textarea
          name="description"
          placeholder="Description..."
          className="w-full border border-gray-300 px-4 py-2 h-32 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
      >
        Add Blog
      </button>
    </form>
  );
};
