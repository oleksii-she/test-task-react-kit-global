'use client';
import { useSession } from 'next-auth/react';
import { addCommentSchema, addCommentSchemaNoId } from '@/schemasValidation';
import { useRef, useState } from 'react';
import { addComment } from '@/store/features/blogSlice';
import { useAppDispatch } from '@/store/hooks';
import { Loader } from '../Loader/Loader';
import { addCommentRoute } from '@/routes/commentsRoutes';
import { AddCommentNoAuthorize } from './addCommentNoAuthorize';

export const CommentForm = ({ id }: { id: string }) => {
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState<{
    text?: string;
    other?: string;
  }>({});
  const [initialState, setInitialState] = useState({
    text: '',
  });
  const [load, setLoad] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const { status } = useSession();

  const dispatch = useAppDispatch();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    const updatedState = {
      ...initialState,
      [name]: value,
    };

    setInitialState(updatedState);

    const result = addCommentSchemaNoId.safeParse(updatedState);

    if (!result.success) {
      const formatted = result.error.format();
      setErrors({
        text: formatted.text?._errors?.[0],
      });
    } else {
      setErrors({});
    }

    setDisabled(!result.success);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      id,

      text: (formData.get('text') as string) ?? '',
    };

    setLoad(true);

    const result = addCommentSchema.safeParse(data);

    if (!result.success) {
      setLoad(false);
      console.error(result.error.format());
      return;
    }

    try {
      const res = await addCommentRoute(data);

      if (!res) {
        setLoad(false);
        return;
      }
      dispatch(addComment(res));
      setLoad(false);
      formRef.current?.reset();
      setDisabled(true);
      setInitialState({
        text: '',
      });
    } catch (err: unknown) {
      console.error('Error during blog deletion:', err);

      if (err instanceof Error) {
        setErrors({
          other: err.message,
        });
      } else {
        setErrors({
          other: 'Unknown error occurred during deletion.',
        });
      }
    } finally {
      setLoad(false);
    }
  };

  if (status === 'unauthenticated') {
    return <AddCommentNoAuthorize />;
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} ref={formRef}>
      <div className="relative">
        <textarea
          name="text"
          value={initialState.text}
          onChange={onChangeHandler}
          placeholder="Comment..."
          className="w-full bg-neutral-900 text-white border border-gray-700 px-4 py-2 rounded-lg resize-none"
          rows={4}
        />
        {errors.text && <p className="text-red-500 text-sm absolute bottom[-1px]">{errors.text}</p>}
      </div>
      {load && <Loader />}
      {status === 'loading' && <Loader />}
      <button
        type="submit"
        disabled={disabled}
        className={`px-4 py-2 rounded-lg transition-all duration-200 ${
          disabled
            ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer'
        }`}
      >
        Submit
      </button>
      {errors.other && <p className="text-red-500 text-sm absolute">{errors.other}</p>}
    </form>
  );
};
