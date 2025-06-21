"use client";
import { Modal } from "./modal/modal";
import { deleteBlog } from "@/store/features/blogSlice";
import { deleteBlogRoute } from "@/routes/deleteBlog";
import { useAppDispatch } from "@/store/hooks";
import { useState } from "react";
import { useRouter } from "next/navigation";
export const DeleteBlogBtn = ({ id }: { id: string }) => {
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <div className="block">
      <div>
        <button
          className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white 
                 font-semibold py-2 px-4 rounded-lg shadow-md 
                 hover:brightness-110 hover:scale-105 active:scale-95 
                 transition duration-200"
          onClick={() => setToggle(!toggle)}
        >
          🗑️ Delete blog
        </button>

        <Modal modalToggle={toggle} setModalToggle={setToggle}>
          <div className="max-w-md mx-auto p-6 rounded-2xl bg-neutral-900 shadow-xl space-y-6">
            <h2 className="text-xl font-semibold text-white">
              Do you really want to delete?
            </h2>

            {error && <p className="text-red-500 font-medium">{error}</p>}

            <div className="flex justify-between gap-4 mt-6">
              <button
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg shadow 
                       transition duration-200 active:scale-95"
                onClick={async () => {
                  const res = await deleteBlogRoute(id);
                  if (!res) {
                    setError("Oops error");
                    return;
                  }
                  dispatch(deleteBlog(id));
                  router.back();
                  setToggle(false);
                }}
              >
                ✅ Yes, delete
              </button>

              <button
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 rounded-lg shadow 
                       transition duration-200 active:scale-95"
                onClick={() => setToggle(false)}
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};
