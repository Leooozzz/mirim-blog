import z from "zod";

export const PostSchema = z.object({
  title: z.string(),
  tags: z.string(),
  body: z.string(),
  categoryId: z.coerce.number(),
});

export const UpdatePostSchema = z.object({
  status: z.enum(["PUBLISHED", "DRAFT"]).optional(),
  title: z.string().optional(),
  tags: z.string().optional(),
  body: z.string().optional(),
});
