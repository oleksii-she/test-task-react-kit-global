'use client';

import { signOut } from 'next-auth/react';

export const ButtonSignOut = () => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/auth/signin' })}
      className="cursor-pointer text-sm text-red-400 hover:text-red-300 border border-red-500 px-3 py-1 rounded-md ml-2"
    >
      Exit
    </button>
  );
};
