"use client";
import { useEffect } from "react";
import { useAppSelector } from "@/store/hooks";
import { BlogList } from "../blogList/BlogList";

import { useAppDispatch } from "@/store/hooks";
import { getBlogsApi } from "@/store/features/blogSlice";
import { IBlog } from "@/types";
export const SectionBlogs = ({ blogs }: { blogs: IBlog[] }) => {
  const items = useAppSelector((state) => state.blogs.blogs);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getBlogsApi(blogs));
  }, [blogs, dispatch]);
  return (
    <section>
      <BlogList items={items} />
    </section>
  );
};
