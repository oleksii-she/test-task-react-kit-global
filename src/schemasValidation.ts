import { z } from "zod";

export const addBlogSchema = z.object({
  id: z.string(),
  title: z.string().min(3, "The title must contain at least 3 characters"),
  description: z.string().min(5, "The description should be more expanded"),
});
