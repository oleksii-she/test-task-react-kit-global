import { CommentEdit } from "../blogForm/editCommentForm";
import { ButtonDeleteComment } from "../ButtonDeleteComment";
import { ICommentItemProps } from "@/types";

export const CommentItem = ({
  comment,
  editingCommentId,
  setEditingCommentId,
  updateState,
  setUpdateState,
  errorFields,
  submitEditComment,
  errorUpdate,
  disabled,
  blogPostId,
  onChangeHandler,
}: ICommentItemProps) => {
  const commentId = comment.id;
  const author = comment.author;
  const text = comment.text;
  const isEditing = editingCommentId === comment.id;
  const updatedValues = updateState[commentId] || { author, text };

  return (
    <li
      className="p-4 border border-gray-700 rounded-lg bg-neutral-800"
      key={commentId}
    >
      <article>
        {!isEditing ? (
          <>
            <div className="flex justify-between items-center mb-5">
              <div className="flex gap-4 items-center">
                <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-semibold shadow">
                  {author?.slice(0, 2).toUpperCase()}
                </div>
                <span className="text-white font-medium">{author}</span>
              </div>
              <span className="text-xs text-gray-400">{comment.createdAt}</span>
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
              <p className="text-red-700 absolute">{errorFields.author}</p>
            </div>
            <div className="mb-5">
              <div className="relative">
                <CommentEdit
                  value={updatedValues.text}
                  onChangeHandler={(e) => onChangeHandler(e, commentId)}
                  type={"text"}
                />
                <p className="text-red-700 absolute">{errorFields.text}</p>
              </div>
              <p className="text-red-700">{errorUpdate}</p>
            </div>
          </div>
        )}
      </article>

      <div className="flex justify-between mt-5">
        <ButtonDeleteComment blogPostId={blogPostId} commentId={commentId} />

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
              disabled={disabled}
              className={`inline-flex items-center gap-1 px-4 py-2 text-white font-semibold text-sm rounded-full
    ${
      disabled
        ? "bg-emerald-400 cursor-not-allowed opacity-50"
        : "bg-gradient-to-tr from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 active:scale-95 shadow-lg transition-all duration-200"
    }`}
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
};
