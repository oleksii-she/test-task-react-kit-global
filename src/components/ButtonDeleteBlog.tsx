"use client";
import { Modal } from "./modal/modal";
import { deleteBlog } from "@/store/features/blogSlice";
import { deleteBlogRoute } from "@/routes/deleteBlog";
import { useAppDispatch } from "@/store/hooks";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DeleteWarning } from "./DeleteWarning";
export const DeleteBlogBtn = ({ id }: { id: string }) => {
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleDelete = async () => {
    const res = await deleteBlogRoute(id);
    if (!res) {
      setError("Oops error");
    }
    dispatch(deleteBlog(id));
    router.back();
    setToggle(false);
  };
  return (
    <div className="block">
      <div>
        <button
          className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white  font-semibold py-2 px-4 rounded-lg shadow-md  hover:brightness-110 hover:scale-105 active:scale-95  transition duration-200 "
          onClick={() => setToggle(!toggle)}
        >
          Delete blog
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-white-500 transition"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3m-4 0h14"
            />
          </svg>
        </button>

        <Modal modalToggle={toggle} setModalToggle={setToggle}>
          <DeleteWarning
            error={error}
            handleDelete={handleDelete}
            setToggle={setToggle}
          />
        </Modal>
      </div>
    </div>
  );
};
