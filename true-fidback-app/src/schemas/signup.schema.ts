import { z } from "zod";

export const usernameValidation = z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must only contain letters and numbers")


export const SignupSchema = z.object({
    username: usernameValidation,
    email: z.string().email("Invalid email address"),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(32, { message: "Password must be less than 32 characters" })
})