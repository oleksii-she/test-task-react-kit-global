'use server';
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { setDoc, serverTimestamp, doc } from 'firebase/firestore';
import { db, auth } from '@/firebase/config';

import { IRegistration } from '@/types/types';

import { getUserId } from './getUserId';

export const registerUser = async (data: IRegistration) => {
  try {
    const { email, password, name } = data;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (user) {
      const profileDataToSave = {
        userId: user.uid,
        name: name,
        avatar: '',
        description: '',
        contacts: {
          phone: '',
          email: user.email,
          other: '',
        },
        showContacts: false,
        createdAt: serverTimestamp(),
      };

      await setDoc(doc(db, 'users', user.uid), profileDataToSave);

      const res = await getUserId(user.uid);

      return res;
    }

    return null;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('error create user comment:', error.message);
    } else {
      console.error('unknown create user error:', error);
    }
    throw error;
  }
};



export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('error reset password:', error.message);
    } else {
      console.error('unknown reset password error:', error);
    }
    throw error;
  }
};