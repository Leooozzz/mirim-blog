"use server";

import { api } from "@/lib/api";
import { cookies } from "next/headers";

export const GetCategory = async (id: number) => {
  const token = (await cookies()).get("auth_token")?.value;

  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  const { data } = await api.get(`/admin/category/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
