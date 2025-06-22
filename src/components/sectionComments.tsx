"use client";
import { ZodError } from "zod";
import { useState, useEffect } from "react";
import { IComment } from "@/types";
import { CommentForm } from "./blogForm/addCommentForm";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getCommentsApi,
  addCommentCollectionId,
  updateComment,
  sortCommentsDateFilter,
} from "@/store/features/blogSlice";
import { CommentEdit } from "./blogForm/editCommentForm";
import { ButtonDeleteComment } from "./ButtonDeleteComment";
import { updateCommentRoute } from "@/routes/commentsRoutes";
import { addCommentSchema } from "@/schemasValidation";
import { Filter } from "./filter";

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
  const [errorFields, setErrorFields] = useState({
    author: "",
    text: "",
  });
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

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

  const submitEditComment = async () => {
    if (!editingCommentId) return;

    const updatedData = {
      id: editingCommentId,
      ...updateState[editingCommentId],
    };

    try {
      const parse = addCommentSchema.parse(updatedData);

      const updates = {
        author: parse.author,
        text: parse.text,
      };

      const res = await updateCommentRoute({
        blogPostId,
        editingCommentId,
        updates,
      });

      if (!res) {
        setErrorUpdate("Sorry, failed to make an update");
        return;
      }
      dispatch(updateComment(res));

      setEditingCommentId(null);
      setUpdateState({});
      setErrorUpdate("");
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          const field = err.path[0];
          if (typeof field === "string") {
            fieldErrors[field] = err.message;
          }
        });

        setErrorFields({
          author: fieldErrors.author || "",
          text: fieldErrors.text || "",
        });
      } else {
        setErrorUpdate("Unexpected error occurred");
      }
    }
  };

  const dispatch = useAppDispatch();
  const comments = useAppSelector((state) => state.blogs.comments);

  useEffect(() => {
    dispatch(addCommentCollectionId({ id: blogPostId }));
    if (comments.length === 0) {
      dispatch(getCommentsApi(data));
    }
  }, [dispatch, data, comments.length, blogPostId]);

  useEffect(() => {
    setCommentState(comments);
  }, [comments]);

  const changFilter = (value: "oldest" | "newest") => {
    dispatch(sortCommentsDateFilter(value));
  };

  return (
    <section className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-indigo-300 mb-2">Comments</h3>

        <CommentForm id={blogPostId} />

        <div className="mb-5">
          <Filter onChange={changFilter} />
        </div>

        {commentState.length === 0 && (
          <h2 className="text-white text-center font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            Write your comment ✍️
          </h2>
        )}

        <ul className="space-y-4">
          {commentState.map(({ id: commentId, author, text, createdAt }) => {
            const isEditing = editingCommentId === commentId;
            const updatedValues = updateState[commentId] || { author, text };

            return (
              <li
                key={commentId}
                className="p-4 border border-gray-700 rounded-lg bg-neutral-800"
              >
                <article>
                  {!isEditing ? (
                    <>
                      <div className="flex justify-between items-center mb-5">
                        <div className="flex gap-4 items-center">
                          <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-semibold shadow">
                            {author?.slice(0, 2).toUpperCase()}
                          </div>
                          <span className="text-white font-medium">
                            {author}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">
                          {createdAt}
                        </span>
                      </div>
                      <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                        {text}
                      </p>
                    </>
                  ) : (
                    <div className="relative">
                      <div className="mb-5 relative">
                        <CommentEdit
                          value={updatedValues.author}
                          onChangeHandler={(e) => onChangeHandler(e, commentId)}
                          type={"author"}
                        />
                        <p className="text-red-700 absolute">
                          {errorFields.author}
                        </p>
                      </div>
                      <div className="mb-5">
                        <div className="relative">
                          <CommentEdit
                            value={updatedValues.text}
                            onChangeHandler={(e) =>
                              onChangeHandler(e, commentId)
                            }
                            type={"text"}
                          />
                          <p className="text-red-700 absolute">
                            {errorFields.text}
                          </p>
                        </div>
                        <p className="text-red-700">{errorUpdate}</p>
                      </div>
                    </div>
                  )}
                </article>

                <div className="flex justify-between mt-5">
                  <ButtonDeleteComment
                    blogPostId={blogPostId}
                    commentId={commentId}
                  />

                  {!isEditing ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (!updateState[commentId]) {
                          setUpdateState((prev) => ({
                            ...prev,
                            [commentId]: {
                              author: author ?? "",
                              text: text ?? "",
                            },
                          }));
                        }
                        setEditingCommentId(commentId);
                      }}
                      className="px-3 py-1 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700"
                    >
                      ✏️ Edit
                    </button>
                  ) : (
                    <div className="flex gap-2.5">
                      <button
                        type="button"
                        onClick={submitEditComment}
                        className="inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-tr from-emerald-500 to-emerald-600 text-white font-semibold text-sm rounded-full shadow-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 active:scale-95"
                      >
                        ✅ Confirm
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setUpdateState({});
                          setEditingCommentId(null);
                        }}
                        className="inline-flex items-center gap-1 px-4 py-2 bg-gray-300 text-gray-800 font-semibold text-sm rounded-full shadow-inner hover:bg-gray-400 transition-all duration-200 active:scale-95"
                      >
                        ❌ Close
                      </button>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
