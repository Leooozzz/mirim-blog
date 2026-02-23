import { prisma } from "../libs/prisma";
import { CreateCategoryType } from "./category.type";

export const CreateCategory = async (data: CreateCategoryType) => {
  return prisma.category.create({
    data,
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
};
export const GetCategoryById = async (id: number) => {
  return await prisma.category.findUnique({ where: { id } });
};
export const GetAllCategory = async () => {
  return await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
};
export const DeleteCategory = async (id: number) => {
  return await prisma.category.delete({
    where: { id },
  });
};
export const UpdateCategory = async (id: number, data: { name?: string }) => {
  return await prisma.category.update({
    where: { id },
    data,
  });
};
