'use client';
import { Modal } from './modal/modal';
import { AddBlogForm } from './blogForm/addBlogForm';
import { useState } from 'react';
export const AddBlog = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="block">
      <div>
        <button
          className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition"
          onClick={() => setToggle(!toggle)}
        >
          ➕ Add Blog
        </button>

        <Modal closeIcon={true} modalToggle={toggle} setModalToggle={setToggle}>
          <AddBlogForm setModalToggle={setToggle} />
        </Modal>
      </div>
    </div>
  );
};
