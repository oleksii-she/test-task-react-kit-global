"use client";

import { SetStateAction } from "react";

type PropsDelete = {
  error: string;
  handleDelete: () => Promise<void>;
  setToggle: React.Dispatch<SetStateAction<boolean>>;
};

export const DeleteWarning = ({
  handleDelete,
  error,
  setToggle,
}: PropsDelete) => {
  return (
    <div className="max-w-md mx-auto p-6 rounded-xl bg-black shadow-md space-y-4">
      <h2>Do you really want to delete?</h2>
      {error && <p className="text-red-500">error</p>}
      <div className="flex justify-between mt-3.5">
        <button className="bg-red-500 p-5" onClick={handleDelete}>
          Yes
        </button>
        <button className="bg-green-500 p-5" onClick={() => setToggle(false)}>
          No
        </button>
      </div>
    </div>
  );
};
