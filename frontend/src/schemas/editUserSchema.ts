import { z } from "zod";

export const editProfileSchema = z.object({
  handle: z.string().min(3, "Username must be at least 3 characters"),
  description: z
    .string()
    .max(200, "Description cannot be longer than 200 characters"),
  // image: z.string().optional(),
});
