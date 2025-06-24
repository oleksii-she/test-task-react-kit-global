"use client";
import { SectionBlogs } from "./sectionBlog";
import { IBlog } from "@/types";

export default function SectionBlogsWrapper({
  blogs,
}: Readonly<{ blogs: IBlog[] }>) {
  return <SectionBlogs blogs={blogs} />;
}
