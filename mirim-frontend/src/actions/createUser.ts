"use server";

import { api } from "@/lib/api";
import { cookies } from "next/headers";

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

export const CreateUser = async ({
  name,
  email,
  password,
}: RegisterData): Promise<{ error: string | null }> => {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) {
    return { error: "Usuário não autenticado" };
  }
  try {
    const response = await api.post(
      "/admin/create-editor",
      { name, email, password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return { error: null };
  } catch (err: any) {
    return {
      error:
        err?.response?.data?.message || "Ocorreu um erro ao criar o usuário",
    };
  }
};
