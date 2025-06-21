"use client";
import { useEffect, useState } from "react";

import { BlogList } from "../blogList/BlogList";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getBlogsApi } from "@/store/features/blogSlice";
import { IBlog } from "@/types";

export const SectionBlogs = ({ blogs }: { blogs: IBlog[] }) => {
  const [blogsState, setBlogsState] = useState<IBlog[]>([]);
  const dispatch = useAppDispatch();

  const items = useAppSelector((state) => state.blogs.blogs);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(getBlogsApi(blogs));
    }
  }, [dispatch, blogs, items.length]);

  useEffect(() => {
    setBlogsState(items);
  }, [items]);

  if (items.length === 0) {
    return (
      <h2 className="text-white text-center font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
        Write your blog ✍️
      </h2>
    );
  }
  return (
    <section>
      <BlogList items={blogsState} />
    </section>
  );
};
