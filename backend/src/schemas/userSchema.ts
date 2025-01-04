import z from "zod";

export const userSchema = z.object({
  handle: z.string().min(3).max(30),
  name: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string().min(8).max(255),
  description: z.string().max(255),
  image: z.string().url(),
  links: z.string().optional(),
});

export const registerUserSchema = userSchema.pick({
  handle: true,
  name: true,
  email: true,
  password: true,
});

export const loginUserSchema = userSchema.pick({
  email: true,
  password: true,
});

export const updateUserSchema = z.object({
  handle: z.string().min(3).max(255).optional(),
  description: z.string().max(255).optional(),
  links: z.string().optional(),
});

export const searchByHandleSchema = userSchema.pick({
  handle: true,
})