'use client';
import { useState } from 'react';
import Link from 'next/link';

import { UInputText } from '@/components/UComponent/UInputText';
import { loginSchema } from '@/schemasValidation';
import { useRouter } from 'next/navigation';
import { useValidation } from '@/hooks/useValidation';
import { Loader } from '../Loader/Loader';
import { signIn } from 'next-auth/react';
import { GoogleIcon } from '../icons/icons';

/* const ForgotPassword = ({ handlerForgotPassword }: { handlerForgotPassword: () => void }) => {
  const [disabled, setDisabled] = useState(true);
  const [load, setLoad] = useState(false);

  const [initialValue, setInitialValue] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [messageEmail, setMessageEmail] = useState('');

  const { errors, validate } = useValidation(fargotSchema);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInitialValue((prev) => {
      const updated = { ...prev, [name]: value };

      const valid = validate(updated);
      setDisabled(!valid);
      return updated;
    });
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    setLoad(true);
    setError('');

    try {
      const result = await resetPassword(initialValue.email);
      if (result) {
        setMessageEmail('A link to reset your password has been sent to your email.');
        setTimeout(() => {
          handlerForgotPassword();
        }, 6000);
      } else {
        setError('Unable to send a password reset link. Please try again.');
      }
    } catch (error: unknown) {
      console.error('Critical error during sign in:', error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Unknown error. Please try again.');
      }
    } finally {
      setLoad(false);
      setDisabled(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="w-full max-w-md mx-auto p-4 sm:p-6 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white rounded-2xl shadow-xl flex flex-col gap-6"
    >
      <h2 className="text-center text-2xl sm:text-3xl font-semibold">Login</h2>

      <div className="flex flex-col gap-8">
        <UInputText
          name="email"
          placeholder="Email"
          value={initialValue.email}
          onChange={onChangeHandler}
          error={errors.email}
        />

        {load && <Loader />}

        <button
          type="submit"
          disabled={disabled}
          className={`w-full py-2 rounded-md font-medium text-center transition duration-300 ${
            disabled
              ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          submit
        </button>

        {error && <p className="text-sm text-red-500 text-center mt-2">{error}</p>}
        {messageEmail && <p className="text-sm text-green-500 text-center mt-2">{messageEmail}</p>}
      </div>
      <button
        type="button"
        onClick={() => handlerForgotPassword()}
        className="text-sm text-center text-blue-400 hover:underline"
      >
        I remembered the password
      </button>

      <Link href="/auth/signup" className="text-sm text-center text-blue-400 hover:underline">
        Don&apos;t have an account? Register
      </Link>
    </form>
  );
}; */

export const LoginForm = () => {
  const [disabled, setDisabled] = useState(true);
  const [load, setLoad] = useState(false);

  const [initialValue, setInitialValue] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const router = useRouter();

  const { errors, validate } = useValidation(loginSchema);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInitialValue((prev) => {
      const updated = { ...prev, [name]: value };

      const valid = validate(updated);
      setDisabled(!valid);
      return updated;
    });
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    setLoad(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: initialValue.email,
        password: initialValue.password,
      });

      if (result?.error) {
        setError(result?.error);
      } else {
        const referrer = document.referrer;
        const isDirectVisit = !referrer;

        const isFromAuth = referrer && new URL(referrer).pathname.startsWith('/auth');

        if (isDirectVisit || isFromAuth) {
          router.push('/');
        } else {
          router.back();
        }
      }
    } catch (error: unknown) {
      console.error('Critical error during sign in:', error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Невідома помилка. Спробуйте ще раз.');
      }
    } finally {
      setLoad(false);
      setDisabled(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      const result = await signIn('google', { redirect: false });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        const referrer = document.referrer;
        const isDirectVisit = !referrer;

        const isFromAuth = referrer && new URL(referrer).pathname.startsWith('/auth');

        if (isDirectVisit || isFromAuth) {
          router.push('/');
        } else {
          router.back();
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Error signing in with Google');
      }
    }
  };

  return (
    <form
      onSubmit={submit}
      className="w-full max-w-md mx-auto p-4 sm:p-6 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white rounded-2xl shadow-xl flex flex-col gap-6"
    >
      <h2 className="text-center text-2xl sm:text-3xl font-semibold">Login</h2>

      <div className="flex flex-col gap-8">
        <UInputText
          name="email"
          placeholder="Email"
          value={initialValue.email}
          onChange={onChangeHandler}
          error={errors.email}
        />
        <UInputText
          name="password"
          placeholder="Password"
          value={initialValue.password}
          onChange={onChangeHandler}
          error={errors.password}
        />

        {load && <Loader />}

        <button
          type="submit"
          disabled={disabled}
          className={`w-full py-2 rounded-md font-medium text-center transition duration-300 ${
            disabled
              ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          Login
        </button>

        {error && <p className="text-sm text-red-500 text-center mt-2">{error}</p>}
      </div>
      <Link
        href={'/auth/forgot-password'}
        className="text-sm text-center text-blue-400 hover:underline"
      >
        Forgot your password?
      </Link>

      <Link href="/auth/signup" className="text-sm text-center text-blue-400 hover:underline">
        Don&apos;t have an account? Register
      </Link>

      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-full bg-white shadow transition-transform duration-200 hover:scale-110 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <GoogleIcon />
        </button>
      </div>
    </form>
  );
};
