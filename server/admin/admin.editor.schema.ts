import z from "zod";

export const AdminEditorSchema = z.object({
    name:z.string(),
    email:z.email(),
    password:z.string(),
})