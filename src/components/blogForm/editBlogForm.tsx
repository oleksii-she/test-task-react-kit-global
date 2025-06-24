"use client";

import { addBlogSchema } from "@/schemasValidation";
import { useState, useRef, SetStateAction, useEffect } from "react";
import { updateBlog } from "@/store/features/blogSlice";
import { useAppDispatch } from "@/store/hooks";
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
  const [disabled, setDisabled] = useState(true);
  const [initialState, setInitialState] = useState<IBlog>({
    id,
    title: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [load, setLoad] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
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

  const validate = (state: IBlog) => {
    const result = addBlogSchema.safeParse(state);
    if (!result.success) {
      const formatted = result.error.format();
      setErrors({
        title: formatted.title?._errors?.[0] ?? "",
        description: formatted.description?._errors?.[0] ?? "",
      });
      return false;
    }
    setErrors({
      title: "",
      description: "",
    });
    return true;
  };

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInitialState((prev) => {
      const updated = { ...prev, [name]: value };

      const valid = validate(updated);
      setDisabled(!valid);
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      id: id,
      title: formData.get("title"),
      description: formData.get("description"),
    };

    const result = addBlogSchema.safeParse(data);
    setLoad(true);
    if (!result.success) {
      const formatted = result.error.format();
      setErrors({
        title: formatted.title?._errors[0],
        description: formatted.description?._errors[0],
      });
      setLoad(false);

      return;
    }

    const newData = await updateBlogRoute(id, result.data);

    if (!newData) {
      setLoad(false);
      return setError("error update");
    }

    dispatch(updateBlog(newData));
    setModalToggle(false);
    setErrors({});
    setLoad(false);
    formRef.current?.reset();
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="mx-auto p-8 rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-800 shadow-xl space-y-6"
    >
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
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
        disabled={disabled}
        className={`px-4 py-2 rounded-lg transition-all duration-200 ${
          disabled
            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
        }`}
      >
        Edit Blog
      </button>
    </form>
  );
};
