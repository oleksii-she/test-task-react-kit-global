"use client";

import { addBlogSchema } from "@/schemasValidation";
import { useState, useRef, SetStateAction, useEffect } from "react";
import { updateBlog } from "@/store/features/blogSlice";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { updateBlogRoute } from "@/routes/updateBlogRoute";
import { IBlog } from "@/types";
import { Loader } from "../Loader/Loader";
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
  const [load, setLoad] = useState(false);
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
        [name]: value,
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
      className="mx-auto p-8 rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-800 shadow-xl space-y-6"
    >
      {load && <Loader />}
      <div>
        <input
          name="title"
          value={initialState?.title}
          onChange={onChangeHandler}
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
          onChange={onChangeHandler}
          value={initialState?.description}
          placeholder="Description..."
          className="w-full bg-gray-900 text-white border  md:min-h-[300px]  border-gray-700 px-5 py-3 h-36 rounded-lg shadow-inner resize-none
                 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500
                 placeholder-gray-500 transition duration-300"
        />
        {errors.description && (
          <p className="text-red-400 text-sm mt-1">{errors.description}</p>
        )}
      </div>

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
