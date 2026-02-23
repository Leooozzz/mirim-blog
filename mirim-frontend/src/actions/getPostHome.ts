"use server";
import { api } from "@/lib/api";
import { GetPostType } from "@/types/post";

export const GetPosts = async (limit?: number): Promise<GetPostType[]> => {
  try {
    const response = await api.get("posts");

    if (response.status === 200 && Array.isArray(response.data.post)) {
      const posts = response.data.post;
      return limit ? posts.slice(0, limit) : posts;
    }

    return [];
  } catch (err) {
    console.error("Erro ao buscar posts:", err);
    return [];
  }
};
