"use client";

import { useState } from "react";

export const Filter = ({
  onChange,
}: {
  onChange: (value: "oldest" | "newest") => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<"oldest" | "newest">("newest");

  const handleSelect = (value: "oldest" | "newest") => {
    setSelected(value);
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left w-full max-w-xs">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-between w-full rounded-md border border-gray-700 bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {selected === "newest" ? "From Newest" : "From Oldest"}
        <svg
          className="ml-2 -mr-1 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.23 8.27a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-md bg-neutral-900 border border-gray-700 shadow-lg">
          <ul className="py-1 text-sm text-white">
            <li
              onClick={() => handleSelect("newest")}
              className="px-4 py-2 hover:bg-neutral-800 cursor-pointer"
            >
              From Newest
            </li>
            <li
              onClick={() => handleSelect("oldest")}
              className="px-4 py-2 hover:bg-neutral-800 cursor-pointer"
            >
              From Oldest
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
