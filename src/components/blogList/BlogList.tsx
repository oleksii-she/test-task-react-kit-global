import { BlogItem } from "./BlogItem";
import { IBlog } from "@/types";

interface BlogListProps {
  items: IBlog[];
}

export const BlogList = ({ items }: BlogListProps) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map(({ id, title, description }) => (
        <BlogItem key={id} id={id} title={title} description={description} />
      ))}
    </ul>
  );
};
