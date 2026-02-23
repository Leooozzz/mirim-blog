import z from "zod";

export const AdminEditorSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(8),
});

export const AdminUpdateEditorSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().min(8).optional(),
  status: z.boolean().optional(),
});
