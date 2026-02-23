import z from "zod";

export const singinSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});
export const singUpSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
});
