import { User } from "../../prisma/prisma/client";
import { create_jsonwebtoken, read_jsonwebtoken } from "../lib/jwt";
import { Request } from "express";
import { token_type_payload } from "../types/token.types";
import { get_user_by_id } from "./user.service";

export const create_token = (user: User) => {
  return create_jsonwebtoken({ id: user.id });
};
export const verify_request = async (req: Request) => {
  const { authorization } = req.headers;

  if (authorization) {
    const auth_split = authorization.split("Bearer ");
    if (auth_split[1]) {
      const payload = read_jsonwebtoken(auth_split[1]);
      if (payload) {
        const user_id = (payload as token_type_payload).id;
        const user = await get_user_by_id(user_id)
        if(user) return user
      }
    }
  }
  
  return false;
};
