import Link from 'next/link';
import { AddBlog } from './ButtonAddBlog';

import { UAuhProfile } from './UComponent/UAuthProfile';

export const Header = () => {
  return (
    <header className="bg-black text-white py-4 shadow-md border-b border-gray-700">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <Link
          href="/"
          className="text-3xl sm:text-4xl font-extrabold hover:text-gray-300 transition"
        >
          MyBlog
        </Link>

        <nav className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <UAuhProfile />
        </nav>
      </div>
    </header>
  );
};

<div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
  <Link
    href="/auth"
    className="text-lg sm:text-xl bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-blue-500 hover:to-blue-700 hover:scale-105 transition-transform duration-300"
  >
    Login
  </Link>
  <Link
    href="/profile"
    className="text-lg sm:text-xl bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-blue-500 hover:to-blue-700 hover:scale-105 transition-transform duration-300"
  >
    Profile
  </Link>
  <AddBlog />
</div>;
