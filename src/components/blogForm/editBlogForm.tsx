"use client";

import { addBlogSchema } from "@/schemasValidation";
import { useState, useRef, SetStateAction, useEffect } from "react";
import { updateBlog } from "@/store/features/blogSlice";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { updateBlogRoute } from "@/routes/updateBlogRoute";
import { IBlog } from "@/types";

export const EditBlogForm = ({
  id,
  data,
  setModalToggle,
}: {
  id: string;
  data: IBlog | null;
  setModalToggle: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [initialState, setInitialState] = useState<IBlog | null>();
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});

  useEffect(() => {
    if (!data) {
      setError("Data not found");
      return;
    }
    setInitialState(data);
  }, [data]);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInitialState((prevState) => {
      if (!prevState) return prevState;
      return {
        ...prevState,
        [name]: value.trim(),
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      id: id,
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

    const newData = await updateBlogRoute(id, result.data);
    console.log(newData, "newData");
    if (!newData) {
      return setError("error update");
    }

    dispatch(updateBlog(result.data));
    setModalToggle(false);
    setErrors({});
    formRef.current?.reset();
    router.back();
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 rounded-xl bg-black shadow-md space-y-4"
    >
      <h3>Edit Blog</h3>
      {error && <p>{error}</p>}

      {initialState && (
        <>
          <div>
            <input
              name="title"
              placeholder="Title"
              value={initialState.title}
              onChange={onChangeHandler}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.title && (
              <label className="text-red-500 text-sm mt-1">
                {errors.title}
              </label>
            )}
          </div>

          <div>
            <textarea
              name="description"
              placeholder="Description..."
              value={initialState.description}
              onChange={onChangeHandler}
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
        </>
      )}
    </form>
  );
};
