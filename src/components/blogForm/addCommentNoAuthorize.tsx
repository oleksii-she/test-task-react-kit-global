import Link from 'next/link';

export const AddCommentNoAuthorize = () => {
  return (
    <div className="bg-neutral-900  border border-gray-700 p-6 rounded-lg text-center text-gray-300">
      <p className="text-lg mb-2">Want to leave a comment?</p>
      <p className="mb-4">Please sign in or create an account to join the discussion.</p>
      <div className="flex justify-center gap-4">
        <Link
          href={'/auth/signin'}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
        >
          Sign In
        </Link>
        <Link
          href={'/auth/signup'}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
        >
          Register
        </Link>
      </div>
    </div>
  );
};
