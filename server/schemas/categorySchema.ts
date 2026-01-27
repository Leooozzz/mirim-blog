import z from "zod";

export const category_schema = z.object({
  name: z.string(),
});

export const UpdateCategorySchema = z.object({
  name: z.string().optional()
})