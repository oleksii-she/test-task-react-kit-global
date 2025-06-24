import { ICommentsListProps } from "@/types";
import { CommentItem } from "./commentItem";

export const CommentsList = ({
  comments,
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
}: ICommentsListProps) => {
  return (
    <ul>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
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
      ))}
    </ul>
  );
};
