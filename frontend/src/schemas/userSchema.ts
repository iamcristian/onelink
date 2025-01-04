import z from "zod";

export const userSchema = z.object({
  handle: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(30, { message: "Username must be at most 30 characters long" })
    .regex(/^[a-zA-Z0-9._-]+$/, {
      message:
        "Username must be alphanumeric and just can include '.', '_', and '-'",
    }),
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters long",
    })
    .max(255, {
      message: "Name must be at most 255 characters long",
    }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(255, { message: "Password must be at most 255 characters long" }),
  description: z.string().max(255),
  image: z.string().url(),
  links: z.string().optional(),
});

export const registerUserSchema = userSchema
  .pick({
    handle: true,
    name: true,
    email: true,
    password: true,
  })
  .extend({
    confirmPassword: z
      .string()
      .min(8, {
        message: "Confirm Password must be at least 8 characters long",
      })
      .max(255, {
        message: "Confirm Password must be at most 255 characters long",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
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
});
