"use client";
import { SectionBlogs } from "./sectionBlog";
import { IBlog } from "@/types";
import { useAppDispatch } from "@/store/hooks";
import { sortBlogsDateFilter } from "@/store/features/blogSlice";
import { Filter } from "../filter";
export default function SectionBlogsWrapper({
  blogs,
}: Readonly<{ blogs: IBlog[] }>) {
  const dispatch = useAppDispatch();
  const changeFilter = (value: "oldest" | "newest") => {
    dispatch(sortBlogsDateFilter(value));
  };

  return (
    <>
      {blogs.length !== 0 && (
        <div className="mb-5">
          <Filter onChange={changeFilter} />
        </div>
      )}

      <SectionBlogs blogs={blogs} />
    </>
  );
}
