import z from "zod"

export const CreateUserSchema=z.object({
    name:z.string().min(2,{message:"Nome deve ter no minimo 2 caracteres"}),
    email:z.email({message:"E-mail invalido"}),
    password:z.string().min(8,{message:"A senha deve ter no minimo 8 caracteres "}),
    confirmPassword:z.string()

}).refine(data=> data.password === data.confirmPassword,{message:"As senhas não coincidem",path:['confirmPassword']})
export type ErrorStructure={
    name?:string,
    email?:string,
    password?:string,
    confirmPassword?:string,
    form?:string
}