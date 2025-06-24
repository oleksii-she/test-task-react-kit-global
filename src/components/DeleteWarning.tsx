"use client";

import { SetStateAction } from "react";
import Loading from "@/app/loading";
type PropsDelete = {
  error: string;
  handleDelete: () => Promise<void>;
  setToggle: React.Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
};

export const DeleteWarning = ({
  handleDelete,
  error,
  setToggle,
  isLoading,
}: PropsDelete) => {
  return (
    <div className="max-w-md mx-auto p-6 rounded-xl bg-black shadow-md space-y-4">
      <h2 className="text-center text-2xl font-semibold text-gray-200 mb-6">
        Do you really want to delete?
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="relative flex justify-between mt-3.5">
        <button
          disabled={isLoading}
          className={`
    flex items-center justify-center gap-2
    font-semibold py-2 px-4 rounded-lg shadow-md
    transition duration-200 ease-in-out
    ${
      !isLoading
        ? "bg-gradient-to-r from-red-500 to-pink-500 text-white hover:brightness-110 hover:scale-105 active:scale-95"
        : "bg-gray-400 text-gray-700 cursor-not-allowed opacity-75"
    }
  `}
          onClick={handleDelete}
        >
          Yes
        </button>
        {isLoading && (
          <div className="absolute w-full">
            <Loading />
          </div>
        )}
        <button
          className="
    bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md
    hover:bg-green-600 hover:scale-105 active:scale-95 transition duration-200 ease-in-out
  "
          onClick={() => setToggle(false)}
        >
          No
        </button>
      </div>
    </div>
  );
};
