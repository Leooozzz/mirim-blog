import { prisma } from "../lib/prisma";

export const create_category = async (name: string) => {
  return await prisma.category.create({
    data: { name },
  });
};
export const get_category_by_name = async (name: string) => {
  return await prisma.category.findFirst({
    where: { name },
  });
};
export const get_all_category = async (name: string) => {
  return await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
};
export const delete_category = async (id: number) => {
  return await prisma.category.delete({
    where: { id },
  });
};
