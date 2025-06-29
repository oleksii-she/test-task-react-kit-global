import { AvatarIcon } from '@/components/icons/icons';
import { IProfile } from '@/types/types';
import { ButtonSignOut } from '../ButtonSignOut';
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

          {/* Соцмережі */}
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
        <ButtonSignOut />
      </div>

      {/* Біо / Цитата */}
      <p className="italic text-gray-300 mt-6">
        Пишу про те, як змінюється світ — і як залишатися людиною серед цих змін.
      </p>

      <div className="mt-10">
        <div className="flex justify-end mb-4">
          <AddBlog />
        </div>
      </div>
      {/* Статті */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Останні статті</h2>

        {/* Можна замінити на map(data.articles) */}
        <div className="bg-neutral-800 hover:bg-neutral-700 transition p-5 rounded-lg border border-gray-700 mb-4">
          <h3 className="text-lg font-semibold text-indigo-400">
            📱 Як штучний інтелект змінює наші смартфони
          </h3>
          <p className="text-sm text-gray-400 mt-1">Опубліковано: 20 червня 2025</p>
        </div>

        <div className="bg-neutral-800 hover:bg-neutral-700 transition p-5 rounded-lg border border-gray-700 mb-4">
          <h3 className="text-lg font-semibold text-indigo-400">
            🌍 Українські стартапи, які вражають світ
          </h3>
          <p className="text-sm text-gray-400 mt-1">Опубліковано: 10 червня 2025</p>
        </div>

        <div className="bg-neutral-800 hover:bg-neutral-700 transition p-5 rounded-lg border border-gray-700">
          <h3 className="text-lg font-semibold text-indigo-400">
            🎙️ Технології та культура: подкасти, які варто слухати
          </h3>
          <p className="text-sm text-gray-400 mt-1">Опубліковано: 30 травня 2025</p>
        </div>
      </div>
    </div>
  );
};
