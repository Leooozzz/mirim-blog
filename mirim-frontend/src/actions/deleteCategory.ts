"use server";

import { api } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type DeleteCategoryProps = {
  id: Number;
};

export async function deleteCategory({
  id,
}: DeleteCategoryProps): Promise<void> {
  const token = (await cookies()).get("auth_token")?.value;

  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  if (!id) {
    throw new Error("id da categoria é obrigatório");
  }

  try {
    await api.delete(`/admin/category/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    revalidatePath("/admin/categories");
  } catch (error) {
    console.error("Erro ao deletar categoria:", error);
    throw new Error("Não foi possível deletar o categoria");
  }
}
