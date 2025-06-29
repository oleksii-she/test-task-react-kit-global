"use client";
import { Modal } from "./modal/modal";
import { deleteComment } from "@/store/features/blogSlice";
import { deleteCommentRoute } from "@/routes/commentsRoutes";
import { useAppDispatch } from "@/store/hooks";
import { useState } from "react";

import { DeleteWarning } from "./DeleteWarning";
export const ButtonDeleteComment = ({
  commentId,
  blogPostId,
}: {
  commentId: string;
  blogPostId: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    setIsLoading(true);
    setError("");

    try {
      const res = await deleteCommentRoute({ blogPostId, commentId });
      if (!res) {
        setError("Oops error");
        return;
      }
      dispatch(deleteComment(commentId));

      setToggle(false);
    } catch (err: unknown) {
      if (err instanceof Error) { 
        setError(err.message);
      } else {
        setError("Unknown error occurred during deletion.");
        
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="block">
      <div>
        <button
          className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white  font-semibold py-2 px-4 rounded-lg shadow-md  hover:brightness-110 hover:scale-105 active:scale-95  transition duration-200 "
          onClick={() => setToggle(!toggle)}
        >
          🗑️
        </button>

        <Modal modalToggle={toggle} setModalToggle={setToggle}>
          <DeleteWarning
            isLoading={isLoading}
            error={error}
            handleDelete={handleDelete}
            setToggle={setToggle}
          />
        </Modal>
      </div>
    </div>
  );
};
