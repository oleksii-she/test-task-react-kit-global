"use client";
import { useEffect, useState } from "react";

import { BlogList } from "../blogList/BlogList";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getBlogsApi, sortBlogsDateFilter } from "@/store/features/blogSlice";
import { IBlog } from "@/types";
import { Filter } from "../filter";

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

  const changeFilter = (value: "oldest" | "newest") => {
    dispatch(sortBlogsDateFilter(value));
  };

  if (blogs.length === 0) {
    return (
      <h2 className="text-white text-center font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
        Write your blog ✍️
      </h2>
    );
  }
  return (
    <section>
      {blogsState.length !== 0 && (
        <div className="mb-5">
          <Filter onChange={changeFilter} />
        </div>
      )}

      <BlogList items={blogsState} />
    </section>
  );
};
