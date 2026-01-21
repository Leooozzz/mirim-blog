import { prisma } from "../lib/prisma";
import { user_type } from "../types/user.types";
import bcrypt from "bcrypt";

export const create_user = async ({ name, email, password }: user_type) => {
  email = email.toLowerCase();

  const user = await prisma.user.findFirst({ where: { email } });
  if (user) return false;

  const new_password = bcrypt.hashSync(password, 10);

  return await prisma.user.create({
    data: { name, email, password: new_password },
  });
};
