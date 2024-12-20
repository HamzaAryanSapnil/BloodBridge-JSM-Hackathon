import { z } from "zod";

export const messagesSchema = z.object({
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 charecters" })
    .max(300, { message: "Content cannot exceed 300 characters" }),
});
