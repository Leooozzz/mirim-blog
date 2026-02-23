import z from "zod";

export const CategorySchema = z.object({
  name: z.string(),
});

export const UpdateCategorySchema = z.object({
  name: z.string().optional(),
});
