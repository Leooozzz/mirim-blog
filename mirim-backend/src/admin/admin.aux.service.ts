import { prisma } from "../libs/prisma";

export const GetAllAdmins = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      status: true,
      role: true,
      createdAt: true,
    },
  });
};
