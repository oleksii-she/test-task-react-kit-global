// schema.ts
import { z } from "zod";

export const addBlogSchema = z.object({
  id: z.string(),
  title: z.string().min(3, "Заголовок має містити щонайменше 3 символи"),
  description: z.string().min(5, "Опис має бути більш розгорнутим"),
});
