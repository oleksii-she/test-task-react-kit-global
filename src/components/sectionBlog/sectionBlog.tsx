'use client';

import { useEffect, useRef } from 'react';
import { BlogList } from '../blogList/BlogList';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getBlogsApi } from '@/store/features/blogSlice';
import { IBlog } from '@/types/types';

export const SectionBlogs = ({ blogs }: { blogs: IBlog[] }) => {
  const dispatch = useAppDispatch();

  const items = useAppSelector((state) => state.blogs.blogs);

  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current && blogs.length > 0) {
      dispatch(getBlogsApi(blogs));
      hasInitialized.current = true;
    }
  }, [dispatch, blogs]);

  if (blogs.length === 0 && !hasInitialized.current) {
    return (
      <h2 className="text-white text-center font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
        Write your blog ✍️
      </h2>
    );
  }

  return (
    <section>
      <BlogList items={items} />
    </section>
  );
};
