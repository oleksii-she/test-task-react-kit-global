import { SetStateAction } from 'react';
export interface IBlog {
  id: string;
  userId?: string;
  name?: string;
  title: string;
  description: string;
  createdAt?: string;
}

export interface IComment {
  id: string;
  userId?: string;
  author?: string;
  avatar: string;
  text?: string;
  createdAt?: string;
}

type CommonEditProps = {
  editingCommentId: string | null;
  setEditingCommentId: React.Dispatch<SetStateAction<string | null>>;
  updateState: {
    [key: string]: {
      text: string;
    };
  };
  setUpdateState: React.Dispatch<
    SetStateAction<{
      [key: string]: {
        text: string;
      };
    }>
  >;
  errorFields: {
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

export interface ILogin {
  email: string;
  password: string;
}
export interface IRegistration {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IProfile {
  id: string;
  name: string;
  avatar: string;
  description?: string;
  emailVerified?: boolean;
  contacts?: {
    phone?: string;
    email?: string;
    twitter: string;
    linkedIn?: string;
    telegram?: string;
  };
  showContacts: boolean;
  createdAt?: string;
}

export interface IUpdateProfile {
  id?: string;
  name?: string;
  avatar?: string;
  description?: string;
  emailVerified?: boolean;
  contacts?: {
    phone?: string;
    email?: string;
    twitter?: string;
    linkedIn?: string;
    telegram?: string;
  };
  showContacts?: boolean;
  createdAt?: string;
}
