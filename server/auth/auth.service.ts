import { User } from "../../prisma/prisma/client";
import { CreateJsonwebtoken, ReadJsonwebtoken } from "../lib/jwt";
import { Request } from "express";

import { GetUserById } from "../services/user.service";
import { TokenTypePayload, UserTypeSingIn, UserTypeSingUp } from "./auth.types";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

export const CreateToken = (user: User) => {
  return CreateJsonwebtoken({ id: user.id });
};
export const VerifyRequest = async (req: Request) => {
  const { authorization } = req.headers;

  if (authorization) {
    const authSplit = authorization.split("Bearer ");
    if (authSplit[1]) {
      const payload = ReadJsonwebtoken(authSplit[1]);
      if (payload) {
        const userId = (payload as TokenTypePayload).id;
        const user = await GetUserById(userId)
        if(user) return user
      }
    }
  }
  
  return false;
};

export const VerifyUser = async({email,password}:UserTypeSingIn) => {
  email = email.toLowerCase()

  const user = await prisma.user.findFirst({where:{email}})
  if (!user) return false;
  
  if(!bcrypt.compareSync(password, user.password)) return false;

  return user;

  
}
export const CreateUser = async ({ name, email, password }: UserTypeSingUp) => {
  email = email.toLowerCase();

  const user = await prisma.user.findFirst({ where: { email } });
  if (user) return false;

  const new_password = bcrypt.hashSync(password, 10);

  return await prisma.user.create({
    data: { name, email, password: new_password },
  });
};