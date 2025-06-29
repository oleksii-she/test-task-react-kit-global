'use client';
import { ZodError } from 'zod';
import { useState, useEffect, useRef } from 'react';
import { IComment } from '@/types/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getCommentsApi, updateComment, sortCommentsDateFilter } from '@/store/features/blogSlice';
import { updateCommentRoute } from '@/routes/commentsRoutes';
import { addCommentSchema, addCommentSchemaNoId } from '@/schemasValidation';
import { Filter } from '../filter';
import { CommentsList } from './commentsList';
import Loading from '@/app/loading';

export const SectionComments = ({ id: blogPostId, data }: { id: string; data: IComment[] }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [updateState, setUpdateState] = useState<{
    [key: string]: { text: string };
  }>({});
  const [errorUpdate, setErrorUpdate] = useState('');
  const [errorFields, setErrorFields] = useState({
    text: '',
  });
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const hasInitialized = useRef(false);

  const dispatch = useAppDispatch();
  const comments = useAppSelector((state) => state.blogs.comments);

  const validate = (state: { text: string }) => {
    const result = addCommentSchemaNoId.safeParse(state);
    if (!result.success) {
      const formatted = result.error.format();
      setErrorFields({
        text: formatted.text?._errors?.[0] ?? '',
      });
      return false;
    }
    setErrorFields({
      text: '',
    });
    return true;
  };

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    commentId: string
  ) => {
    const { name, value } = e.target;

    setUpdateState((prevState) => {
      const updatedComment = {
        ...prevState[commentId],
        [name]: value,
      };

      const updated = {
        [commentId]: updatedComment,
      };

      const valid = validate(updated[commentId]);

      setDisabled(!valid);

      return updated;
    });
  };

  const submitEditComment = async () => {
    if (!editingCommentId) return;
    setIsLoading(true);
    setDisabled(true);
    const updatedData = {
      id: editingCommentId,
      ...updateState[editingCommentId],
    };

    try {
      const parse = addCommentSchema.parse(updatedData);

      const updates = {
        text: parse.text,
      };

      const res = await updateCommentRoute({
        blogPostId,
        editingCommentId,
        updates,
      });

      if (!res) {
        setErrorUpdate('Sorry, failed to make an update');
        return;
      }
      dispatch(updateComment(res));

      setEditingCommentId(null);
      setIsLoading(false);
      setUpdateState({});
      setErrorUpdate('');
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          const field = err.path[0];
          if (typeof field === 'string') {
            fieldErrors[field] = err.message;
          }
        });

        setErrorFields({
          text: fieldErrors.text || '',
        });
      } else if (error instanceof Error) {
        setErrorUpdate(error.message);
      } else {
        setErrorUpdate('Unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!hasInitialized.current && data) {
      dispatch(getCommentsApi([...data]));
      hasInitialized.current = true;
    }
  }, [dispatch, data]);

  const changFilter = (value: 'oldest' | 'newest') => {
    dispatch(sortCommentsDateFilter(value));
  };

  return (
    <section className="space-y-6">
      <div>
        {comments.length !== 0 && (
          <div className="mb-5">
            <Filter onChange={changFilter} />
          </div>
        )}

        {comments.length === 0 && (
          <h2 className="text-white text-center font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            Write your comment ✍️
          </h2>
        )}
        {isLoading && <Loading />}
        <CommentsList
          comments={comments}
          editingCommentId={editingCommentId}
          setEditingCommentId={setEditingCommentId}
          updateState={updateState}
          setUpdateState={setUpdateState}
          errorFields={errorFields}
          submitEditComment={submitEditComment}
          errorUpdate={errorUpdate}
          disabled={disabled}
          blogPostId={blogPostId}
          onChangeHandler={onChangeHandler}
        />
      </div>
    </section>
  );
};
