"use server";

import { api } from "@/lib/api";
import { cookies } from "next/headers";

export const CreatePost = async (
  data: FormData,
): Promise<{ error: string | null }> => {
  const token = (await cookies()).get("auth_token")?.value;

  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  try {
    await api.post("/admin/posts", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { error: null };
  } catch (err) {
    console.error(err);
    return { error: "Erro ao criar Post" };
  }
};
