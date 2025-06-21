"use client";
import { Modal } from "./modal/modal";
import { AddBlogForm } from "./blogForm/addBlogForm";
import { useState } from "react";
export const AddBlog = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="block">
      <div>
        <button
          className="text-xl sm:text-1xl md:text-3xl  cursor-pointer bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-blue-500 hover:to-blue-700 hover:scale-105 transition-transform duration-300"
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
