"use client";

import { addBlogSchema } from "@/schemasValidation";
import { useState, useRef, SetStateAction } from "react";
import { addBlog } from "@/store/features/blogSlice";
import { useAppDispatch } from "@/store/hooks";
import { nanoid } from "nanoid";
import { addBlogRoute } from "@/routes/addBlogRoute";
import { Loader } from "../Loader/Loader";
export const AddBlogForm = ({
  setModalToggle,
}: {
  setModalToggle: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    other?: string;
  }>({});
  const [load, setLoad] = useState(false);

  const formRef = useRef<HTMLFormElement | null>(null);

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      id: `${nanoid()}`,
      title: formData.get("title"),
      description: formData.get("description"),
    };
    setLoad(true);
    const result = addBlogSchema.safeParse(data);

    if (!result.success) {
      const formatted = result.error.format();
      setErrors({
        title: formatted.title?._errors[0],
        description: formatted.description?._errors[0],
      });
      setLoad(false);
      return;
    }

    const res = await addBlogRoute(result.data);

    if (!res) {
      setErrors({
        other: "Error on the server, try later",
      });
    }

    dispatch(addBlog(res));
    setLoad(false);
    setErrors({});
    formRef.current?.reset();
    setModalToggle(false);
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="mx-auto p-8 rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-800 shadow-xl space-y-6"
    >
      {load && <Loader />}
      <div>
        <input
          name="title"
          placeholder="Title"
          className="w-full bg-gray-900  text-white border border-gray-700 px-5 py-3 rounded-lg shadow-inner
                 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500
                 placeholder-gray-500 transition duration-300"
        />
        {errors.title && (
          <label className="text-red-400 text-sm mt-1 block">
            {errors.title}
          </label>
        )}
      </div>

      <div>
        <textarea
          name="description"
          placeholder="Description..."
          className="w-full bg-gray-900 text-white border  md:min-h-[300px]  border-gray-700 px-5 py-3 h-36 rounded-lg shadow-inner resize-none
                 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500
                 placeholder-gray-500 transition duration-300"
        />
        {errors.description && (
          <p className="text-red-400 text-sm mt-1">{errors.description}</p>
        )}
      </div>
      {errors.other && (
        <label className="text-red-400 text-sm mt-1 block">
          {errors.other}
        </label>
      )}

      <button
        type="submit"
        className="cursor-pointer w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold
               hover:bg-indigo-700 active:scale-95 transition-transform duration-150 shadow-lg"
      >
        Add Blog
      </button>
    </form>
  );
};
