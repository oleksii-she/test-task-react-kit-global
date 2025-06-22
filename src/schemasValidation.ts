import { z } from "zod";

export const addBlogSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(3, "The title must contain at least 3 characters")
    .max(45, "The title must contain at least 45 characters"),
  description: z.string().min(5, "The description should be more expanded"),
});

export const addCommentSchema = z.object({
  id: z.string(),
  author: z
    .string()
    .min(3, "The NickName must contain at least 3 characters")
    .max(20, "The NickName must contain at least 20 characters"),
  text: z.string().min(5, "The description should be more expanded"),
});

export const addCommentSchemaNoId = z.object({
  author: z
    .string()
    .min(3, "The NickName must contain at least 3 characters")
    .max(20, "The NickName must contain at least 20 characters"),
  text: z.string().min(5, "The description should be more expanded"),
});

export const updateCommentSchema = z.object({
  id: z.string(),
  author: z
    .string()
    .min(3)
    .max(20, "The NickName must contain at least 20 characters")
    .optional(),

  text: z.string().min(5).optional(),
});
