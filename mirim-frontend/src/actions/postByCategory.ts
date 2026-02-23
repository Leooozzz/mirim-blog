"use server"
import { api } from "@/lib/api";
import { GetPostType } from "@/types/post";

export const getPostByCategory = async (
 categoryId:number,

): Promise<GetPostType[]> => {
  try {
    const response = await api.get(
      `/posts/category/${categoryId}`,
    );

    return response.data.posts.map((post: any): GetPostType => ({
      id: post.id,
      title: post.title,
      status: post.status,
      slug: post.slug,
      cover: post.cover,
      body: post.body,
      authorName: post.author.name,
      category: post.category.name,
      createdAt: post.createdAt,
    }));
  } catch (error) {
    console.error("getPostByCategory error:", error);
    return []; 
  }
};
