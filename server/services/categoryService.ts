import { prisma } from "../lib/prisma";


export const CreateCategory = async (name: string) => {
  return prisma.category.create({
    data: { name },
  });
};
export const GetCategoryById = async (id: number) => {
  return await prisma.category.findUnique({ where: { id } });
};
export const GetAllCategory = async () => {
  return await prisma.category.findMany({
    orderBy: { name: "asc" },
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
