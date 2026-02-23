import { prisma } from "../libs/prisma";

export const GetUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      status: true,
      createdAt: true,
      role: true,
    },
  });
};
