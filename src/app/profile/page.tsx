import { ProfileUser } from '@/components/profile/userProfile';
import type { Metadata } from 'next';
import type { User } from 'next-auth';
import { getUserId } from '@/routes/getUserId';
import { getServerSession } from 'next-auth';
import { IBlog, IProfile } from '@/types/types';
import NotFound from '../not-found';
import { authOptions } from '@/authConfig';
import { getBlogsByUserId } from '@/routes/getBlogsRoute';
import { BlogList } from '@/components/blogList/BlogList';
export const metadata: Metadata = {
  title: 'Profile',
  description: 'Profile information!',
};
const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  let userId = '';

  if (session?.user) {
    const extendedUser = session.user as User;
    userId = extendedUser.id || '';
  }

  const userData: IProfile | null = await getUserId(userId);
  const blogData: IBlog[] = await getBlogsByUserId(userId);

  if (!userData) {
    return NotFound();
  }

  return (
    <>
      <section className="bg-gradient-to-b from-neutral-900 to-neutral-800 text-gray-100 rounded-xl shadow-lg p-8 border border-gray-700 mb-12">
        <ProfileUser data={userData} />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-indigo-400 mb-4">Your blogs</h2>

        <p className="mb-6 text-gray-300">
          Quantity: <span className="font-semibold text-indigo-300">{blogData.length}</span>
        </p>

        {blogData.length > 0 ? (
          <BlogList items={blogData} />
        ) : (
          <h3 className="text-lg text-gray-400 italic">There are no blogs</h3>
        )}
      </section>
    </>
  );
};

export default ProfilePage;
