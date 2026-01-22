import z from "zod";

export const post_schema = z.object({
    title: z.string(),
    tags: z.string(),
    body: z.string()
})