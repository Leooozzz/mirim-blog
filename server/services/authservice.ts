import { User } from "../../prisma/prisma/client";
import { CreateJsonwebtoken, ReadJsonwebtoken } from "../lib/jwt";
import { Request } from "express";
import { TokenTypePayload } from "../types/tokenTypes";
import { GetUserById } from "./userService";

export const CreateToken = (user: User) => {
  return CreateJsonwebtoken({ id: user.id });
};
export const verify_request = async (req: Request) => {
  const { authorization } = req.headers;

  if (authorization) {
    const auth_split = authorization.split("Bearer ");
    if (auth_split[1]) {
      const payload = ReadJsonwebtoken(auth_split[1]);
      if (payload) {
        const user_id = (payload as TokenTypePayload).id;
        const user = await GetUserById(user_id)
        if(user) return user
      }
    }
  }
  
  return false;
};
