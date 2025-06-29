'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { AvatarIcon } from '../icons/icons';
export const UAuhProfile = () => {
  const { status } = useSession();

  const href = status === 'authenticated' ? 'profile' : 'auth';
  const signature = status === 'authenticated' ? 'Profile' : 'Sign In';
  return (
    <Link
      href={`/${href}`}
      className="cursor-pointer group flex flex-col items-center text-white hover:text-indigo-400 transition"
    >
      <div className="w-10 h-10 p-2 rounded-full border-2 border-indigo-600 group-hover:border-indigo-400 transition-colors">
        <AvatarIcon />
      </div>
      <p className="text-xs mt-1 group-hover:text-indigo-400 transition-colors">{signature}</p>
    </Link>
  );
};
