import Link from 'next/link';

import { UAuhProfile } from './UComponent/UAuthProfile';
import { ButtonSignOut } from './ButtonSignOut';
export const Header = () => {
  return (
    <header className="bg-black text-white py-4 shadow-md border-b border-gray-700">
      <div className="flex justify-between items-center mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-3xl sm:text-4xl font-extrabold hover:text-gray-300 transition"
        >
          MyBlog
        </Link>

        <nav className="flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-4">
          <UAuhProfile />
          <ButtonSignOut />
        </nav>
      </div>
    </header>
  );
};
