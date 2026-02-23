"use server";

import { api } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type DeletePostProps = {
  slug: string;
};

export async function deletePost({ slug }: DeletePostProps): Promise<void> {
  const token = (await cookies()).get("auth_token")?.value;

  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  if (!slug) {
    throw new Error("Slug do post é obrigatório");
  }

  try {
    await api.delete(`/admin/post/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    revalidatePath("/admin/listar-post");
  } catch (error) {
    console.error("Erro ao deletar post:", error);
    throw new Error("Não foi possível deletar o post");
  }
}
