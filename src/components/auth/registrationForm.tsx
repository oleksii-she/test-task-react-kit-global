'use client';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { UInputText } from '@/components/UComponent/UInputText';
import { registrationSchema } from '@/schemasValidation';
import { useValidation } from '@/hooks/useValidation';
import { Loader } from '../Loader/Loader';
import { registerUser } from '@/routes/usersRoutes';
export const RegistrationForm = () => {
  const [disabled, setDisabled] = useState(true);
  const [load, setLoad] = useState(false);

  const [initialValue, setInitialValue] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const { errors, validate } = useValidation(registrationSchema);

  const router = useRouter();

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

    try {
      await registerUser(initialValue);

      await signIn('credentials', {
        redirect: false,
        email: initialValue.email,
        password: initialValue.password,
      });

      router.back();

      setError('');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('There was an error, try later');
      }
    } finally {
      setDisabled(true);
      setLoad(false);
    }
  };
  return (
    <form
      onSubmit={submit}
      className="flex w-full max-w-lg flex-col gap-3 mx-auto p-2  sm:p-6 rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-800 shadow-xl space-y-6"
    >
      <h2 className="text-center text-xl sm:text-1xl md:text-3xl">Registration</h2>
      <div className="relative flex flex-col  gap-6">
        <UInputText
          name={'name'}
          placeholder={'name'}
          value={initialValue.name}
          onChange={onChangeHandler}
          error={errors.name}
        />
        <UInputText
          name={'email'}
          placeholder={'email'}
          value={initialValue.email}
          onChange={onChangeHandler}
          error={errors.email}
        />
        <UInputText
          name={'password'}
          placeholder={'password'}
          value={initialValue.password}
          onChange={onChangeHandler}
          error={errors.password}
        />
        <UInputText
          name={'confirmPassword'}
          value={initialValue.confirmPassword}
          placeholder={'confirm password'}
          onChange={onChangeHandler}
          error={errors.confirmPassword}
        />

        <p className="text-red-600 absolute bottom-[-30px]">{error}</p>
      </div>
      {load && <Loader />}
      <button
        type="submit"
        disabled={disabled}
        className={`px-4 py-2 rounded-lg transition-all duration-200 ${
          disabled
            ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer'
        }`}
      >
        Registration
      </button>
      <Link href="/auth/signin" className="text-sm text-center text-blue-400 hover:underline">
        I have an account! Sign In
      </Link>
    </form>
  );
};
