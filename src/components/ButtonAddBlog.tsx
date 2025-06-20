"use client";
import { Modal } from "./modal/modal";
import { AddBlogForm } from "./blogForm/addBlogForm";
import { useState } from "react";
export const AddBlog = () => {
  const [toggle, setToggle] = useState(false);
  console.log(toggle, "toggle");

  return (
    <div className="block">
      <div>
        <button
          className="bg-blue-200 text-gray-600 p-0.5 "
          onClick={() => setToggle(!toggle)}
        >
          Add blog
        </button>

        <Modal modalToggle={toggle} setModalToggle={setToggle}>
          <AddBlogForm setModalToggle={setToggle} />
        </Modal>
      </div>
    </div>
  );
};
