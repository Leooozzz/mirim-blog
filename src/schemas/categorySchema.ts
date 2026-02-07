import z from "zod";

export const CategorySchema = z.object({
    name:z.string()
})

export type ErrorStructure = {
    name?:string,
    form?:FormData
}