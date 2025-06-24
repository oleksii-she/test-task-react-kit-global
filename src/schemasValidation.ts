import { z } from "zod";

export const addBlogSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .trim()
    .min(3, "The title must contain at least 3 characters")
    .max(45, "The title must contain at least 45 characters")
    .refine((val) => val.replace(/\s/g, "").length >= 3, {
      message: "The title must contain at least 3 meaningful characters",
    }),
  description: z
    .string()
    .trim()
    .min(40, "The description should be more expanded")
    .max(4000, "The description must contain at least 4000 characters")
    .refine((val) => val.replace(/\s/g, "").length >= 3, {
      message: "The description must contain at least 3 meaningful characters",
    }),
});

export const addCommentSchema = z.object({
  id: z.string(),
  author: z
    .string()
    .trim()
    .min(3, "The NickName must contain at least 3 characters")
    .max(20, "The NickName must contain at least 20 characters")
    .max(1000, "The text must contain at least 1000 characters")
    .refine((val) => val.replace(/\s/g, "").length >= 3, {
      message: "The author must contain at least 3 meaningful characters",
    }),

  text: z
    .string()
    .trim()
    .min(5, "The description should be more expanded")
    .refine((val) => val.replace(/\s/g, "").length >= 3, {
      message: "The text must contain at least 3 meaningful characters",
    }),
});

export const addCommentSchemaNoId = z.object({
  author: z
    .string()
    .trim()
    .min(3, "The NickName must contain at least 3 characters")
    .max(20, "The NickName must contain at least 20 characters")
    .refine((val) => val.replace(/\s/g, "").length >= 3, {
      message: "The author must contain at least 3 meaningful characters",
    }),
  text: z
    .string()
    .trim()
    .min(5, "The description should be more expanded")
    .max(1000, "The text must contain at least 1000 characters")
    .refine((val) => val.replace(/\s/g, "").length >= 3, {
      message: "The text must contain at least 3 meaningful characters",
    }),
});
