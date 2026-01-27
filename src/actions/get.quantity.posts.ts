"use server";

import { api } from "@/lib/api";
import { cookies } from "next/headers";

export const GetPostCountPublished = async (): Promise<number> => {
  const token = (await cookies()).get("auth_token")?.value;

  if (!token) {
    return 0;
  }

  try {
    const response = await api.get("/admin/post/countPublished", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data.posts;
    }
  } catch (err) {
    console.error("Erro ao buscar quantidade de posts:", err);
  }

  return 0;
};

export const GetPostCountDraft = async (): Promise<number> => {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) {
    return 0;
  }

  try {
    const response = await api.get("/admin/post/countDraft", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data.posts;
    }
  } catch (err) {
    console.error("Erro ao buscar quantidade de posts:", err);
  }

  return 0;
};
