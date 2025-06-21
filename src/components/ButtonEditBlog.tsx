"use client";

import { Modal } from "./modal/modal";
import { EditBlogForm } from "./blogForm/editBlogForm";
import { useState } from "react";
import { IBlog } from "@/types";

export const EditBlogBtn = ({
  data,
  id,
}: {
  data: IBlog | null;
  id: string;
}) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="block">
      <div>
        <button
          onClick={() => setToggle(!toggle)}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
             text-white font-semibold py-2 px-4 rounded-lg shadow-lg 
             hover:brightness-110 hover:scale-105 active:scale-95 
             transition duration-200"
        >
          ✏️ Edit blog
        </button>

        <Modal closeIcon={true} modalToggle={toggle} setModalToggle={setToggle}>
          <EditBlogForm id={id} setModalToggle={setToggle} data={data} />
        </Modal>
      </div>
    </div>
  );
};
