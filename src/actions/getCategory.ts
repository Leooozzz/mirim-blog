"use server"

import { api } from "@/lib/api";
import { cookies } from "next/headers";

type Category = {
  id: number;
  name: string;
};

export const GetCategories = async (): Promise<Category[]> => {
  const token = (await cookies()).get("auth_token")?.value;
 if (!token) {
    throw new Error("Usuário não autenticado");
  }

  try {
    const response = await api.get("/admin/category", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data.category;
    }
  } catch (err) {
    console.error("Erro ao buscar categorias:", err);
  }

  return [];
};
