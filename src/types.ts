import { SetStateAction } from "react";
export interface IBlog {
  id: string;
  title: string;
  description: string;
  createdAt?: string;
}
export interface IComment {
  id: string;
  author?: string;
  text?: string;
  createdAt?: string;
}

type CommonEditProps = {
  editingCommentId: string | null;
  setEditingCommentId: React.Dispatch<SetStateAction<string | null>>;
  updateState: {
    [key: string]: {
      author: string;
      text: string;
    };
  };
  setUpdateState: React.Dispatch<
    SetStateAction<{
      [key: string]: {
        author: string;
        text: string;
      };
    }>
  >;
  errorFields: {
    author: string;
    text: string;
  };
  submitEditComment: () => Promise<void>;
  errorUpdate: string;
  disabled: boolean;
  blogPostId: string;
  onChangeHandler: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    commentId: string
  ) => void;
};

export type ICommentItemProps = CommonEditProps & {
  comment: IComment;
};

export type ICommentsListProps = CommonEditProps & {
  comments: IComment[];
};
