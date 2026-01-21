import { prisma } from "../lib/prisma";
import {  user_type_singin, user_type_singup } from "../types/user.types";
import bcrypt from "bcrypt";

export const create_user = async ({ name, email, password }: user_type_singup) => {
  email = email.toLowerCase();

  const user = await prisma.user.findFirst({ where: { email } });
  if (user) return false;

  const new_password = bcrypt.hashSync(password, 10);

  return await prisma.user.create({
    data: { name, email, password: new_password },
  });
};

export const verify_user = async({email,password}:user_type_singin) => {
  email = email.toLowerCase()

  const user = await prisma.user.findFirst({where:{email}})
  if (!user) return false;
  
  if(!bcrypt.compareSync(password, user.password)) return false;

  return user;

  
}