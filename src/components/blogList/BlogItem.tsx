import { IBlog } from '@/types/types';
import Link from 'next/link';

export const BlogItem = ({ id, title, description }: IBlog) => {
  return (
    <li
      key={id}
      className="bg-gradient-to-br from-zinc-900 to-neutral-800 border border-zinc-700 max-w-96 shadow-md mb-6 p-6 rounded-xl hover:shadow-xl hover:-translate-y-1 transition duration-300"
    >
      <h2 className="text-xl font-bold text-indigo-400 mb-2">{title}</h2>
      <p className="text-gray-300 text-sm line-clamp-3 mb-4">{description}</p>
      <Link
        href={`/${id}`}
        className="inline-block text-sm text-indigo-300 hover:text-white font-medium transition"
      >
        Read more →
      </Link>
    </li>
  );
};
