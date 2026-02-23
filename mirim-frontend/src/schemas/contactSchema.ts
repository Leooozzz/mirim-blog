import z from "zod";

export const ContactSchema = z.object({
    name: z.string(),
    email: z.email(),
    message: z.string(),
})