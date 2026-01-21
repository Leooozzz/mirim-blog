import { User } from "@/generated/prisma/client";
import { create_jsonwebtoken } from "../lib/jwt";

export const create_token = (user: User) =>{
    return create_jsonwebtoken({id:user.id})
}