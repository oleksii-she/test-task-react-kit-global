import { ProfileUser } from '@/components/profile/userProfile';
import type { Metadata } from 'next';
import type { User } from 'next-auth';
import { getUserId } from '@/routes/getUserId';
import { getServerSession } from 'next-auth';
import { IProfile } from '@/types/types';
import NotFound from '../not-found';
import { authOptions } from '@/authConfig';
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

  if (!userData) {
    return NotFound();
  }

  return (
    <section className="w-full mx-auto mt-12 bg-gradient-to-b from-neutral-900 to-neutral-800 text-gray-100 rounded-xl shadow-lg p-8 border border-gray-700">
      {<ProfileUser data={userData} />}
    </section>
  );
};

export default ProfilePage;
