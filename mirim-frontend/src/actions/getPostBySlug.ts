"use server";
import { api } from "@/lib/api";
import { GetPostSlug } from "@/types/post";

import { cookies } from "next/headers";

export const GetPostBySlug = async (
  slug: string,
): Promise<GetPostSlug | null> => {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) {
    throw new Error("Usuário não autenticado");
  }
  try {
    const response = await api.get(`/admin/post/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const post = response.data.post;

    return {
      ...post,
      status: post.status === "PUBLISHED" ? "Publicado" : "Rascunho",
      createdAt: post.createdAt,
    };
  } catch (err) {
    console.error("Erro ao buscar post:", err);
    return null;
  }
};

export const GetPostBySlugUser = async (
  slug: string,
): Promise<GetPostSlug | null> => {
  try {
    const response = await api.get(`/posts/${slug}`);

    if (response.status === 200 && response.data?.post) {
      return response.data.post;
    }
  } catch (err) {
    console.error("Erro ao buscar post:", err);
  }

  return null;
};
