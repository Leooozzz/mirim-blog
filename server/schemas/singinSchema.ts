import z from "zod";

export const singin_schema = z.object({
    email: z.email(),
    password: z.string().min(8)
})