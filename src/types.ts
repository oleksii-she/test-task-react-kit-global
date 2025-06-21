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
