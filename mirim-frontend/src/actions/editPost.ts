"use server";
import { api } from "@/lib/api";
import { cookies } from "next/headers";

type EditProps = {
  slug: string;
  data: FormData;
};

export const EditPost = async ({
  slug,
  data,
}: EditProps): Promise<{ error: string | null }> => {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) {
    throw new Error("Usuário não autenticado");
  }
  try {
    await api.put(`/admin/post/${slug}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return { error: null };
  } catch (err) {
    console.error(err);
    return { error: "Erro ao editar Post" };
  }
};
