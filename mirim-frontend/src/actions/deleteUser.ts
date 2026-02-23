"use server";

import { api } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type DeletePostProps = {
  id: Number;
};

export async function deleteUser({ id }: DeletePostProps): Promise<void> {
  const token = (await cookies()).get("auth_token")?.value;

  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  if (!id) {
    throw new Error("Id do usuario é obrigatório");
  }

  try {
    await api.delete(`/admin/delete-editor/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    revalidatePath("/admin/administradores");
  } catch (error) {
    console.error("Erro ao deletar post:", error);
    throw new Error("Não foi possível deletar o Usuario");
  }
}
