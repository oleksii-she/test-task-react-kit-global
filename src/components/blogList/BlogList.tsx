import { BlogItem } from "./BlogItem";
import { IBlog } from "@/types";

interface BlogListProps {
  items: IBlog[];
}

export const BlogList = ({ items }: BlogListProps) => {


  return (
    <ul>
      {items.map(({ id, title, description }) => (
        <BlogItem key={id} id={id} title={title} description={description} />
      ))}
    </ul>
  );
};
