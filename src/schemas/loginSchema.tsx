import z from "zod";

export const login_schema = z.object({
    email: z.email({message:"E-mail invalido"}),
    password: z.string().min(8,{message:"A senha deve conter minimo 8 caracteres"})
})