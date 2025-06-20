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
          className="bg-blue-200 text-gray-600 p-0.5 "
          onClick={() => setToggle(!toggle)}
        >
          Edit blog
        </button>

        <Modal modalToggle={toggle} setModalToggle={setToggle}>
          <EditBlogForm id={id} setModalToggle={setToggle} data={data} />
        </Modal>
      </div>
    </div>
  );
};
