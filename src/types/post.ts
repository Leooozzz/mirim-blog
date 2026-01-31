export type GetPostType = {
  id: number;
  title: string;
  status: string;
  slug: string;
  cover:string,
  body:string,
  authorName:string,
  category:string,
  createdAt: string;
};

export type GetPostSlug = {
  id: number;
  title: string;
  status: string;
  slug: string;
  cover:string,
  body:string,
  authorName:string
  createdAt: string;
  category:string

};
export type CreatePostFormData = {
  title: string;
  tags: string;
  body: string;
  categoryId: number;
  cover: File | null;
};


