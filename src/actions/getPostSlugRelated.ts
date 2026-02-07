"use server"

import { api } from "@/lib/api"
import { RelatedPostBySlug } from "@/types/post"


export const GetPostsSlugRelated = async (
  slug: string
): Promise<RelatedPostBySlug[]> => {
  try {
  
    const response = await api.get(`/posts/${slug}/related`);

    if (response.status === 200 && Array.isArray(response.data.posts)) {
      return response.data.posts;
    }
  } catch (err) {
    console.error("Erro ao buscar posts relacionados:", err);
  }

  return [];
};
