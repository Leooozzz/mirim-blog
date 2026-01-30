export type GetPostType = {
  id: number;
  title: string;
  status: string;
  slug: string;
  cover:string,
  createAt: string;
};
export type CreatePostFormData = {
  title: string;
  tags: string;
  body: string;
  categoryId: number;
  cover: File | null;
};
