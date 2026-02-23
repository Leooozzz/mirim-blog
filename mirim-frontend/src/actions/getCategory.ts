"use server";

import { api } from "@/lib/api";

type Category = {
  id: number;
  name: string;
  createdAt: Date;
  author: {
    name: string;
  };
};

export const GetCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get("/posts/category");
    if (response.status === 200) {
      return response.data.category;
    }
  } catch (err) {
    console.error("Erro ao buscar categorias:", err);
  }

  return [];
};
