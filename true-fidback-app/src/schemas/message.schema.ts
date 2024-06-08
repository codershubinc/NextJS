
import { z } from "zod";

export const messageSchema = z.object({
    content: z.string()
    .min(10, "Message cannot be less than 10 characters")
    .max(200, "Message must be less than 200 characters")
})