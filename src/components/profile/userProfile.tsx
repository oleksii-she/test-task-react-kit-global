import { AvatarIcon } from '@/components/icons/icons';
import { IProfile } from '@/types/types';

import Image from 'next/image';
import Link from 'next/link';
import { AddBlog } from '../ButtonAddBlog';

export const ProfileUser = ({ data }: { data: IProfile }) => {
  return (
    <div className="">
      <div className="flex flex-col gap-2 sm:flex-row items-center space-x-6 border-b border-gray-700 pb-6">
        <div className="w-28 h-28 rounded-full border-2 border-gray-600 bg-neutral-800 flex items-center justify-center">
          {data.avatar ? (
            <Image
              src={data.avatar}
              width={112}
              height={112}
              alt={data.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <AvatarIcon />
          )}
        </div>

        <div>
          <h1 className="text-3xl font-semibold text-indigo-400 mb-1">{data.name}</h1>

          <p className="text-gray-300 mt-1">
            {data.description || 'Автор статей про технології, культуру та майбутнє.'}
          </p>

          <div className="flex space-x-4 mt-3">
            <Link href="#" className="text-amber-500 hover:underline font-medium">
              Twitter
            </Link>
            <Link href="#" className="text-amber-500 hover:underline font-medium">
              LinkedIn
            </Link>
            <Link href="#" className="text-amber-500 hover:underline font-medium">
              Більше статей
            </Link>
          </div>
        </div>
      </div>

      <p className="italic text-gray-300 mt-6">
        Пишу про те, як змінюється світ — і як залишатися людиною серед цих змін.
      </p>

      <div className="mt-10">
        <div className="flex justify-end mb-4">
          <AddBlog />
        </div>
      </div>
    </div>
  );
};
