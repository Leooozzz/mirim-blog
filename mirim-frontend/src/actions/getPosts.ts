"use server";
import { api } from "@/lib/api";
import { GetPostType } from "@/types/post";
import { cookies } from "next/headers";

export const GetPost = async (limit?: number): Promise<GetPostType[]> => {
  const token = (await cookies()).get("auth_token")?.value;

  if (!token) {
    throw new Error("Usuário não autenticado");
  }
  try {
    const response = await api.get("/admin/posts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const posts = response.data.posts.map((post: any) => {
        return {
          ...post,
          status: post.status === "PUBLISHED" ? "Publicado" : "Rascunho",
          createAt: post.createAt,
        };
      });

      return limit ? posts.slice(0, limit) : posts;
    }
  } catch (err) {
    console.error("Erro ao buscar posts:", err);
  }

  return [];
};
