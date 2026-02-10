import z from "zod";

export const CategorySchema = z.object({
    name:z.string().min(2)
})

export type ErrorStructure = {
    name?:string,
    form?:FormData
}