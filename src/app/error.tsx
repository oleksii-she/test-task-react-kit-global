"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
}: Readonly<{
  error: Error & { digest?: string };
}>) {
  useEffect(() => {
    console.error("An error occurred:", error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center px-6 py-12  border border-gray-700  bg-neutral-800 rounded-2xl shadow-lg">
        <h1 className="text-6xl font-bold text-red-500 mb-4">500</h1>
        <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
          {error.name}
        </h2>
        <p className="text-gray-300  mb-6">{error.message}</p>
        <Link
          href="/"
          className="inline-block  text-sm line-clamp-3 mb-4 cursor-pointer bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-blue-500 hover:to-blue-700 hover:scale-105 transition-transform duration-300"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
