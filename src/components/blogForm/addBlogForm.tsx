"use client";

import { addBlogSchema } from "@/schemasValidation";
import { useState, useRef, SetStateAction } from "react";
import { addBlog } from "@/store/features/blogSlice";
import { useAppDispatch } from "@/store/hooks";
import { nanoid } from "nanoid";
import { addBlogRoute } from "@/routes/addBlogRoute";
import { Loader } from "../Loader/Loader";
import { IBlog } from "@/types";

export const AddBlogForm = ({
  setModalToggle,
}: {
  setModalToggle: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [initialState, setInitialState] = useState({
    id: `${nanoid()}`,
    title: "",
    description: "",
  });
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    other?: string;
  }>({});
  const [load, setLoad] = useState(false);

  const formRef = useRef<HTMLFormElement | null>(null);

  const clearState = () => {
    setInitialState({
      id: `${nanoid()}`,
      title: "",
      description: "",
    });
  };

  const validate = (state: IBlog) => {
    const result = addBlogSchema.safeParse(state);
    if (!result.success) {
      const formatted = result.error.format();
      setErrors({
        title: formatted.title?._errors?.[0],
        description: formatted.description?._errors?.[0],
      });
      return false;
    }
    setErrors({});
    return true;
  };

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const spaceCount = (value.match(/\s/g) || []).length;
    console.log(spaceCount);

    setInitialState((prev) => {
      const updated = { ...prev, [name]: value };

      validate(updated);
      setDisabled(!addBlogSchema.safeParse(updated).success);
      return updated;
    });
  };

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);

    setLoad(true);
    const result = validate(initialState);

    if (!result) {
      setLoad(false);
      return;
    }

    const res = await addBlogRoute(initialState);

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
    clearState();
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
          value={initialState.title}
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
          value={initialState.description}
          onChange={onChangeHandler}
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
        disabled={disabled}
        className={`px-4 py-2 rounded-lg transition-all duration-200 ${
          disabled
            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
        }`}
      >
        Add Blog
      </button>
    </form>
  );
};
