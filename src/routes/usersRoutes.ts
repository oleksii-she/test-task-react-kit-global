'use server';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
} from 'firebase/auth';
import { setDoc, serverTimestamp, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '@/firebase/config';

import { IRegistration } from '@/types/types';

import { getUserId } from './getUserId';
import { IProfile, IUpdateProfile } from '@/types/types';
import { formatFireStoreTimestamp } from '@/utils/utills';

export const registerUser = async (data: IRegistration) => {
  try {
    const { email, password, name } = data;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (user) {
      await sendEmailVerification(user);
      const profileDataToSave = {
        name: name,
        emailVerified: user.emailVerified,
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

export const resendEmailVerification = async () => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('Користувач не авторизований.');
  }

  if (user.emailVerified) {
    throw new Error('Електронна пошта вже підтверджена.');
  }

  try {
    await sendEmailVerification(user);
    return { success: true, message: 'Лист з підтвердженням надіслано повторно.' };
  } catch (error: unknown) {
    console.error('Помилка при повторному надсиланні листа:', error);
    return { success: false, message: 'Не вдалося надіслати лист з підтвердженням.' };
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

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (user) {
      const res = await getUserId(user.uid);
      return res;
    }

    return null;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('error signing in with Google:', error.message);
    } else {
      console.error('unknown error signing in with Google:', error);
    }
    throw error;
  }
};

export const updateUserProfile = async (id: string, dataToUpdate: IUpdateProfile): Promise<IProfile> => {
  try {
    const userRef = doc(db, 'users', id);

    const updatePayload = {
      ...dataToUpdate,
    };

    await updateDoc(userRef, updatePayload);
    const newUserSnapshot = await getDoc(userRef);

    if (newUserSnapshot.exists()) {
      const newUserData = newUserSnapshot.data();

      const createdAtString = formatFireStoreTimestamp(newUserData.createdAt);

      return {
        id: id,
        name: newUserData.name || '',
        avatar: newUserData.avatar || '',
        showContacts: newUserData.showContacts ?? false,
        ...newUserData,
        createdAt: createdAtString || '',
      };
    } else {
      throw new Error('Just added/Updated Blog was not found in Firestore.');
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message.includes('document does not exist')) {
        console.error(`Id:  ${id} not found.`, error.message);
      } else {
        console.error(`error update ${id}:`, error.message);
      }
    } else {
      console.error(`error ${id}:`, error);
    }
    throw error;
  }
};
