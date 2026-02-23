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
  tags:string,
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
  
export type EditPostType = {
  tile:string,
  tags:string,
  body:string,
  cover:File|null
}
export type EditPostFormData = {
  title?: string;
  tags?: string;
  body?: string;
  categoryId?: number;
  cover?: File | null;
  status: "DRAFT" | "PUBLISHED";
};


export type RelatedPostBySlug = {
  id:number,
  status:string,
  title:string,
  body:string,
  createdAt:string,
  cover:string,
  authorName:string,
  category:{
    name:string
  }
  tags:string,
  slug:string
}
