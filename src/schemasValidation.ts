import { z } from 'zod';

export const addBlogSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .trim()
    .min(3, 'The title must contain at least 3 characters')
    .max(45, 'The title must contain at least 45 characters')
    .refine((val) => val.replace(/\s/g, '').length >= 3, {
      message: 'The title must contain at least 3 meaningful characters',
    }),
  description: z
    .string()
    .trim()
    .min(40, 'The description should be more expanded')
    .max(4000, 'The description must contain at least 4000 characters')
    .refine((val) => val.replace(/\s/g, '').length >= 3, {
      message: 'The description must contain at least 3 meaningful characters',
    }),
});

export const addCommentSchema = z.object({
  id: z.string(),
  text: z
    .string()
    .trim()
    .min(5, 'The description should be more expanded')
    .refine((val) => val.replace(/\s/g, '').length >= 3, {
      message: 'The text must contain at least 3 meaningful characters',
    }),
});

export const addCommentSchemaNoId = z.object({
  text: z
    .string()
    .trim()
    .min(5, 'The description should be more expanded')
    .max(1000, 'The text must contain at least 1000 characters')
    .refine((val) => val.replace(/\s/g, '').length >= 3, {
      message: 'The text must contain at least 3 meaningful characters',
    }),
});

export const registrationSchema = z
  .object({
    name: z.string().min(2, 'Name is required').max(50, 'Name must be at most 50 characters'),
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords should match',
  });
export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});
