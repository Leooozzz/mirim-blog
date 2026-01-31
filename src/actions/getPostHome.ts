import { api } from "@/lib/api";
import { GetPostType } from "@/types/post";


export const GetPostHome = async (): Promise<GetPostType[]> => {
  try {
    const response = await api.get("posts")

    if (response.status === 200 && Array.isArray(response.data.post)) {
      return response.data.post
    }
  } catch (err) {
    console.error("Erro ao buscar posts:", err)
  }

  return []
}