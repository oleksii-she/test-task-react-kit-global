"use client";
import { ZodError } from "zod";
import { useState, useEffect, useRef } from "react";
import { IComment } from "@/types";
import { CommentForm } from "../blogForm/addCommentForm";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getCommentsApi,
  updateComment,
  sortCommentsDateFilter,
} from "@/store/features/blogSlice";
import { updateCommentRoute } from "@/routes/commentsRoutes";
import { addCommentSchema, addCommentSchemaNoId } from "@/schemasValidation";
import { Filter } from "../filter";
import { CommentsList } from "./commentsList";
export const SectionComments = ({
  id: blogPostId,
  data,
}: {
  id: string;
  data: IComment[];
}) => {
  const [disabled, setDisabled] = useState(true);
  const [updateState, setUpdateState] = useState<{
    [key: string]: { author: string; text: string };
  }>({});
  const [errorUpdate, setErrorUpdate] = useState("");
  const [errorFields, setErrorFields] = useState({
    author: "",
    text: "",
  });
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const hasInitialized = useRef(false);

  const dispatch = useAppDispatch();
  const comments = useAppSelector((state) => state.blogs.comments);

  const validate = (state: { author: string; text: string }) => {
    const result = addCommentSchemaNoId.safeParse(state);
    if (!result.success) {
      const formatted = result.error.format();
      setErrorFields({
        author: formatted.author?._errors?.[0] ?? "",
        text: formatted.text?._errors?.[0] ?? "",
      });
      return false;
    }
    setErrorFields({
      author: "",
      text: "",
    });
    return true;
  };

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    commentId: string
  ) => {
    const { name, value } = e.target;
    setUpdateState((prevState) => {
      const updatedComment = {
        ...prevState[commentId],
        [name]: value,
      };

      const updated = {
        [commentId]: updatedComment,
      };

      const valid = validate(updated[commentId]);

      setDisabled(!valid);

      return updated;
    });
  };

  const submitEditComment = async () => {
    if (!editingCommentId) return;
    setDisabled(true);
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

  useEffect(() => {
    if (!hasInitialized.current && data.length > 0) {
      dispatch(getCommentsApi(data));
      hasInitialized.current = true;
    }
  }, [dispatch, data]);

  const changFilter = (value: "oldest" | "newest") => {
    dispatch(sortCommentsDateFilter(value));
  };

  return (
    <section className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-indigo-300 mb-2">Comments</h3>

        <CommentForm id={blogPostId} />

        {data.length !== 0 && (
          <div className="mb-5">
            <Filter onChange={changFilter} />
          </div>
        )}

        {comments.length === 0 && !hasInitialized.current && (
          <h2 className="text-white text-center font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            Write your comment ✍️
          </h2>
        )}
        <CommentsList
          comments={comments}
          editingCommentId={editingCommentId}
          setEditingCommentId={setEditingCommentId}
          updateState={updateState}
          setUpdateState={setUpdateState}
          errorFields={errorFields}
          submitEditComment={submitEditComment}
          errorUpdate={errorUpdate}
          disabled={disabled}
          blogPostId={blogPostId}
          onChangeHandler={onChangeHandler}
        />
      </div>
    </section>
  );
};
