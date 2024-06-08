
import { z } from "zod";

export const loginSchema = z.object({
identifier: z.string(),
password: z.string()
})