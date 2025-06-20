import { IBlog } from "@/types";
import Link from "next/link";

export const BlogItem = ({ id, title, description }: IBlog) => {
  return (
    <li
      key={id}
      className="border max-w-96 border-gray-200 shadow-sm mb-4 p-4 rounded-md  hover:shadow-md transition duration-300"
    >
      <h2 className="text-lg font-semibold text-indigo-600 mb-1">{title}</h2>
      <p className="text-white-700 text-sm line-clamp-3">{description}</p>
      <Link href={`/${id}`}>read more</Link>
    </li>
  );
};
