import z from "zod";

export const post_schema = z.object({
  title: z.string(),
  tags: z.string(),
  body: z.string(),
});

export const update_post = z.object({
  status: z.enum(["PUBLISHED", "DRAFT"]).optional,
  title: z.string().optional(),
  tags: z.string().optional(),
  body: z.string().optional(),
});
