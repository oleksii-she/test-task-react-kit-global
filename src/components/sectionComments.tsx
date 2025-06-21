"use client";

import { useState, useEffect } from "react";
import { IComment } from "@/types";
import { CommentForm } from "./blogForm/addCommentForm";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getCommentsApi,
  addCommentCollectionId,
  updateComment,
} from "@/store/features/blogSlice";
import { CommentEdit } from "./blogForm/editCommentForm";
import { ButtonDeleteComment } from "./ButtonDeleteComment";
import { updateCommentRoute } from "@/routes/commentsRoutes";
import { updateCommentSchema } from "@/schemasValidation";
import { ZodError } from "zod";

export const SectionComments = ({
  id: blogPostId,
  data,
}: {
  id: string;
  data: IComment[];
}) => {
  const [commentState, setCommentState] = useState<IComment[]>([]);
  const [updateState, setUpdateState] = useState<{
    [key: string]: { author: string; text: string };
  }>({});

  const [errorUpdate, setErrorUpdate] = useState("");
  const [editingField, setEditingField] = useState<{
    commentId: string | null;
    field: "author" | "text" | null;
  }>({ commentId: null, field: null });
  console.log(updateState, "updateState");

  const dispatch = useAppDispatch();
  const comments = useAppSelector((state) => state.blogs.comments);
  const defaultFields = () => {
    setEditingField({ commentId: null, field: null });
  };

  useEffect(() => {
    dispatch(addCommentCollectionId({ id: blogPostId }));
    if (comments.length === 0) {
      dispatch(getCommentsApi(data));
    }
  }, [dispatch, data, comments.length, blogPostId]);

  useEffect(() => {
    setCommentState(comments);
  }, [comments]);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    commentId: string
  ) => {
    const { name, value } = e.target;
    setUpdateState((prevState) => ({
      ...prevState,
      [commentId]: {
        ...prevState[commentId],
        [name]: value,
      },
    }));
  };

  const submit = async () => {
    if (!editingField.commentId || !editingField.field) return;

    const updatedData = {
      id: editingField.commentId,
      [editingField.field]:
        updateState[editingField.commentId]?.[editingField.field] || "",
    };

    try {
      updateCommentSchema.parse(updatedData);

      const res = await updateCommentRoute({
        blogPostId,
        editingCommentId: editingField.commentId,
        updates: {
          [editingField.field]: updatedData[editingField.field],
        },
      });

      if (!res) {
        setErrorUpdate("Sorry, failed to make an update");
        return;
      }

      dispatch(updateComment(updatedData));

      defaultFields();
      setUpdateState({});
      setErrorUpdate("");
    } catch (error) {
      if (error instanceof ZodError) {
        const firstError = error.errors[0]?.message || "Validation error.";
        setErrorUpdate(firstError);
      } else {
        setErrorUpdate("Unexpected error occurred.");
      }
    }
  };

  return (
    <section className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-indigo-300 mb-2">Comments</h3>

        <CommentForm id={blogPostId} />

        {commentState.length === 0 && (
          <h2 className="text-white text-center font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            Write your comment ✍️
          </h2>
        )}

        <ul className="space-y-4">
          {commentState.map(({ id: commentId, author, text, createdAt }) => {
            const isEditingAuthor =
              editingField.commentId === commentId &&
              editingField.field === "author";
            const isEditingText =
              editingField.commentId === commentId &&
              editingField.field === "text";

            const updatedValues = updateState[commentId] || { author, text };

            return (
              <li
                key={commentId}
                className="p-4 border border-gray-700 rounded-lg bg-neutral-800"
              >
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-semibold shadow">
                      {author?.slice(0, 2).toUpperCase()}
                    </div>

                    {isEditingAuthor ? (
                      <>
                        <CommentEdit
                          value={updatedValues.author}
                          onChangeHandler={(e) => onChangeHandler(e, commentId)}
                          submit={submit}
                          type="author"
                          defaultFields={defaultFields}
                        />
                        <p className="text-red-700">{errorUpdate}</p>
                      </>
                    ) : (
                      <>
                        <span className="text-white font-medium">{author}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingField({ commentId, field: "author" });
                          }}
                          className="px-3 py-1 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700"
                        >
                          ✏️ Author
                        </button>
                      </>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">{createdAt}</span>
                </div>

                <div className="mt-2">
                  {isEditingText ? (
                    <>
                      <CommentEdit
                        value={updatedValues.text}
                        onChangeHandler={(e) => onChangeHandler(e, commentId)}
                        submit={submit}
                        type="text"
                        defaultFields={defaultFields}
                      />
                      <p className="text-red-700">{errorUpdate}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                        {text}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingField({ commentId, field: "text" });
                        }}
                        className="mt-2 px-3 py-1 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700"
                      >
                        ✏️ Edit Text
                      </button>
                    </>
                  )}
                </div>

                <ButtonDeleteComment
                  blogPostId={blogPostId}
                  commentId={commentId}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
