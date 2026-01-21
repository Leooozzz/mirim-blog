import z from "zod";

export const singup_schema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
});
