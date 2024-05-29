import { z } from "zod";

export const userNameValidation = z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(25, "Username must be less than 25 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")

export const signUpSchema = z.object({
    username: userNameValidation,
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})