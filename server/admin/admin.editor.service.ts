import { Prisma } from "../../generated/prisma";
import { prisma } from "../lib/prisma";
import { GetUserById } from "../services/user.service";
import { AdminEditorType, AdminUpdateUserType } from "./admin.types";
import bcrypt from 'bcrypt'

export const CreateEditor = async ({name,email,password}:AdminEditorType) => {
   email = email.toLowerCase()

   const editor = await prisma.user.findFirst({where:{email}})

   if(editor) return false

    const newPassword = bcrypt.hashSync(password,10)

    return await prisma.user.create({
    data: { name, email, password: newPassword },
  });
}

export const DeleteUser = async (id: number) =>{
  return await prisma.user.delete({
    where: { id },
  });
}

