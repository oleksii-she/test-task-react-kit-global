import Link from "next/link";
import { AddBlog } from "./ButtonAddBlog";
export const Header = () => {
  return (
    <header className="text-white py-4 shadow-md border-b border-gray-700">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link
          href="/"
          className="text-3xl sm:text-2xl md:text-5xl font-extrabold hover:text-gray-300 transition"
        >
          MyBlog
        </Link>
        <AddBlog />
      </div>
    </header>
  );
};
