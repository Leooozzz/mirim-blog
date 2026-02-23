"use server";

import { api } from "@/lib/api";
import { ListAdminTypes } from "@/types/user";
import { cookies } from "next/headers";

export const ListAdmin = async (): Promise<ListAdminTypes[]> => {
  const token = (await cookies()).get("auth_token")?.value;

  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  try {
    const response = await api.get("/admin/listadmin", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data.admin.map((admin: ListAdminTypes) => ({
        ...admin,
        status: admin.status ? "Ativo" : "Inativo",
      }));
    }
  } catch (error) {
    console.error("Erro ao listar administradores:", error);
  }

  return [];
};
