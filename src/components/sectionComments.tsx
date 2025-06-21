"use client";

import { useState, useEffect } from "react";
import { IComment } from "@/types";
import { CommentForm } from "./blogForm/addCommentForm";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getCommentsApi,
  addCommentCollectionId,
} from "@/store/features/blogSlice";

export const SectionComments = ({
  id,
  data,
}: {
  id: string;
  data: IComment[];
}) => {
  const [commentState, setCommentState] = useState<IComment[]>([]);
  const dispatch = useAppDispatch();

  const comments = useAppSelector((state) => state.blogs.comments);
  useEffect(() => {
    dispatch(addCommentCollectionId({ id }));
    if (comments.length === 0) {
      dispatch(getCommentsApi(data));
    }
  }, [dispatch, data, comments.length, id]);

  useEffect(() => {
    setCommentState(comments);
  }, [comments]);

  return (
    <section className="space-y-6 ">
      <div>
        <h3 className="text-xl font-semibold text-indigo-300">Коментарі</h3>

        <CommentForm id={id} />

        {commentState.length === 0 && (
          <h2 className="text-white text-center font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            Write your comment ✍️
          </h2>
        )}

        <ul className="space-y-4">
          {commentState.length > 0 &&
            commentState.map(({ id, author, text, createdAt }) => (
              <li
                key={id}
                className="bg-gradient-to-br from-neutral-800 to-neutral-900 p-5 rounded-xl border border-gray-700 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-semibold shadow">
                      {author?.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="text-sm text-white font-medium">
                      {author}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">{createdAt}</span>
                </div>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {text}
                </p>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};
