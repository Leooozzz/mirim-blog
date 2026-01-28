"use server";

import { api } from "@/lib/api";
import { CategoryData } from "@/types/category";
import { cookies } from "next/headers";

export const CreateCategory = async ({
  name,
}: CategoryData): Promise<{ error: string | null }> => {
  const token = (await cookies()).get("auth_token")?.value;

  if (!token) {
    throw new Error("Usuário não autenticado");
  }
  try {
    await api.post(
      "/admin/category",
      { name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return { error: null };
  } catch (err) {
    console.error(err);
    return { error: "Erro ao criar categoria" };
  }
};
