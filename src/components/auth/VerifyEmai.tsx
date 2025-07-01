'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/firebase/config';
import { sendEmailVerification } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { updateUserProfile } from '@/routes/usersRoutes';
import { getUserId } from '@/routes/getUserId';
import { IProfile } from '@/types/types';

export default function VerifyEmail() {
  const [user, setUser] = useState(auth.currentUser);
  const [emailSent, setEmailSent] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { data: session } = useSession();
// useEffect(() => {
//   if (user && user.emailVerified) {
//     router.push('/profile');
//   } else {
//     const fetchUser = async () => {
//       const userId = (session?.user as { id?: string })?.id;
//       if (userId) {
//         const userObj: IProfile | null = await getUserId(userId);
//         if (!userObj) {
//           setError("We couldn't find the registered user, try logging back in");
//           return;
//         }
//         if (userObj?.emailVerified) {
//           router.push('/profile');
//         }
//       }
//     };

//     fetchUser();
//   }
// }, [router, session, user]);

useEffect(() => {
  const checkAndRedirect = async () => {
    const authUser = user;
    const userId = (session?.user as { id?: string })?.id;

    if (!authUser || !userId) return;

    if (authUser.emailVerified) {
      const userObj: IProfile | null = await getUserId(userId);

      if (!userObj) {
        setError("We couldn't find the registered user, try logging back in");
        return;
      }

      if (!userObj.emailVerified) {
        await updateUserProfile(authUser.uid, {
          emailVerified: true,
        });
      }

      router.push('/profile');
    }
  };

  checkAndRedirect();
}, [router, session, user]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        await firebaseUser.reload();
        setUser(firebaseUser);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleResend = async () => {
    if (user && !user.emailVerified) {
      await sendEmailVerification(user);
      setEmailSent(true);
    }
  };

  const handleCheck = async () => {
    if (user) {
      setChecking(true);
      setError('');
      await user.reload();
      if (user.emailVerified) {
        await updateUserProfile(user.uid, {
          emailVerified: user.emailVerified,
        });
        router.push('/profile');
        setError('');
      } else {
        setError('Email not yet confirmed.');
      }
      setChecking(false);
    }
  };

  if (!user) {
    return <p className="text-center text-gray-400">User downloads...</p>;
  }

  return (
    <div className="relative w-full max-w-md mx-auto p-4 sm:p-8 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white rounded-2xl shadow-xl flex flex-col gap-6">
      <h2 className="text-xl font-semibold mb-4 text-center">Confirm your email address</h2>
      <p className="mb-4 text-gray-400 text-center">
        We sent a letter to <strong>{user.email}</strong>. Check your mail.
      </p>

      <button
        onClick={handleResend}
        className="w-full py-2 rounded-md font-medium text-center transition duration-300 bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Resend the email
      </button>

      {emailSent && <p className="text-green-400 mb-2">The email has been resent!</p>}

      <button
        onClick={handleCheck}
        disabled={checking}
        className={`w-full py-2 rounded-md font-medium text-center transition duration-300 ${
          checking
            ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
        }`}
      >
        {checking ? 'Checking....' : 'I confirmed'}
      </button>
      {error && (
        <p className="text-red-500 text-center mt-2 absolute bottom-0 right-0 left-0">{error}</p>
      )}
    </div>
  );
}
