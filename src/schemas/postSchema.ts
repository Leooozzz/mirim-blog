import z from "zod";

export const PostSchema = z.object({
  title: z.string().min(3, "O título precisa ter ao menos 3 caracteres"),
  tags: z.string().optional(),
  body: z.string().min(10, "O corpo precisa ter ao menos 10 caracteres"),
  categoryId: z.coerce.number(),
});

export type ErrorStructure = {
    title?:string,
    tags?:string,
    body?:string
    categoryId?:string,
    form?:string
}