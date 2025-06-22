"use client";

import { addCommentSchema, addCommentSchemaNoId } from "@/schemasValidation";
import { useRef, useState } from "react";
import { addComment } from "@/store/features/blogSlice";
import { useAppDispatch } from "@/store/hooks";
import { Loader } from "../Loader/Loader";
import { addCommentRoute } from "@/routes/commentsRoutes";

export const CommentForm = ({ id }: { id: string }) => {
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState<{ author?: string; text?: string }>({});
  const [initialState, setInitialState] = useState({
    author: "",
    text: "",
  });
  const [load, setLoad] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const dispatch = useAppDispatch();

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    const updatedState = {
      ...initialState,
      [name]: value,
    };

    setInitialState(updatedState);

    const result = addCommentSchemaNoId.safeParse(updatedState);

    if (!result.success) {
      const formatted = result.error.format();
      setErrors({
        author: formatted.author?._errors?.[0],
        text: formatted.text?._errors?.[0],
      });
    } else {
      setErrors({});
    }

    setDisabled(!result.success);
  };

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
      <div className="relative">
        <input
          name="author"
          value={initialState.author}
          onChange={onChangeHandler}
          placeholder="NickName..."
          className="w-full bg-neutral-900 text-white border border-gray-700 px-4 py-2 rounded-lg resize-none"
        />
        {errors.author && (
          <p className="text-red-500 text-sm absolute">{errors.author}</p>
        )}
      </div>
      <div className="relative">
        <textarea
          name="text"
          value={initialState.text}
          onChange={onChangeHandler}
          placeholder="Comment..."
          className="w-full bg-neutral-900 text-white border border-gray-700 px-4 py-2 rounded-lg resize-none"
          rows={4}
        />
        {errors.text && (
          <p className="text-red-500 text-sm absolute">{errors.text}</p>
        )}
      </div>
      {load && <Loader />}
      <button
        type="submit"
        disabled={disabled}
        className={`px-4 py-2 rounded-lg transition-all duration-200 ${
          disabled
            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
        }`}
      >
        Submit
      </button>
    </form>
  );
};
