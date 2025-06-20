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
          className="bg-red-200 text-gray-600 p-0.5 "
          onClick={() => setToggle(!toggle)}
        >
          Delete blog
        </button>

        <Modal modalToggle={toggle} setModalToggle={setToggle}>
          <div className="max-w-md mx-auto p-6 rounded-xl bg-black shadow-md space-y-4">
            <h2>Do you really want to delete?</h2>
            {error && <p className="text-red-500">error</p>}
            <div className="flex justify-between mt-3.5">
              <button
                className="bg-red-500 p-5"
                onClick={async () => {
                  const res = await deleteBlogRoute(id);
                  if (!res) {
                    setError("Oops error");
                  }
                  dispatch(deleteBlog(id));
                  router.back();
                  setToggle(false);
                }}
              >
                Yes
              </button>
              <button
                className="bg-green-500 p-5"
                onClick={() => setToggle(false)}
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};
