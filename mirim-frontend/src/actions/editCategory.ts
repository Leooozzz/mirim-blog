"use server";

import { api } from "@/lib/api";
import { cookies } from "next/headers";

type EditProps = {
  id: number;
  name: string;
};

export const EditCategory = async ({
  id,
  name,
}: EditProps): Promise<{ error: string | null }> => {
  const token = (await cookies()).get("auth_token")?.value;

  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  try {
    await api.put(
      `/admin/category/${id}`,
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
    return { error: "Erro ao editar categoria" };
  }
};
