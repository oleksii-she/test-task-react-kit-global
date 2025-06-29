'use client';
import { useSession } from 'next-auth/react';
import { SectionBlogs } from './sectionBlog';
import { IBlog } from '@/types/types';
import { useAppDispatch } from '@/store/hooks';
import { sortBlogsDateFilter } from '@/store/features/blogSlice';
import { Filter } from '../filter';
import Link from 'next/link';
export default function SectionBlogsWrapper({ blogs }: Readonly<{ blogs: IBlog[] }>) {
  const dispatch = useAppDispatch();
  const changeFilter = (value: 'oldest' | 'newest') => {
    dispatch(sortBlogsDateFilter(value));
  };

  const { data } = useSession();

  return (
    <>
      {!data && (
        <div className="bg-gradient-to-br from-zinc-900 to-neutral-800 border border-zinc-700  shadow-md mb-6 p-6 rounded-xl text-xl font-bold text-indigo-400 mb-2 text-center">
          To start writing, please,{' '}
          <Link href="/auth" className="text-sm text-center text-blue-400 hover:underline">
            log in
          </Link>
          .
        </div>
      )}

      {blogs.length !== 0 && (
        <div className="mb-5">
          <Filter onChange={changeFilter} />
        </div>
      )}

      <SectionBlogs blogs={blogs} />
    </>
  );
}
