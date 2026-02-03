import { Response } from "express";
import { ExtendedRequest } from "../types/extendsRequest";
import { post_schema, update_post } from "../schemas/postSchema";
import {
  CreatePost,
  CreatePostSlug,
  DeletePost,
  GetAllPostService,
  GetNumberPost,
  GetNumberPostDraft,
  GetNumberPostViews,
  GetPostBySlug,
  HandleFileCover,
  incrementProductView,
  UpdatePost,
} from "../services/postsServices";
import { GetUserById } from "../services/userService";
import { CoverToUrl } from "../utils/coverToUrl";
import {
  category_schema,
  UpdateCategorySchema,
} from "../schemas/categorySchema";
import {
  CreateCategory,
  DeleteCategory,
  GetAllCategory,
  GetCategoryById,
  UpdateCategory,
} from "../services/categoryService";

//CRIAR POST E SLUG

export const AddPost = async (req: ExtendedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Access denied" });
  }

  const data = post_schema.safeParse(req.body);
  if (!data.success) {
    return res.status(400).json({ error: data.error.flatten() });
  }

  if (!req.file) {
    return res.status(400).json({ error: "No file" });
  }

  const cover_name = await HandleFileCover(req.file);
  if (!cover_name) {
    return res.status(400).json({ error: "Image not allowed" });
  }


  const category = await GetCategoryById(data.data.categoryId);
  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }

  const slug = await CreatePostSlug(data.data.title);

  const new_post = await CreatePost({
    authorId: req.user.id,
    slug,
    title: data.data.title,
    tags: data.data.tags,
    body: data.data.body,
    cover: cover_name,
    categoryId: category.id,
  });

  const author = await GetUserById(new_post.authorId);

  return res.status(201).json({
    id: new_post.id,
    slug: new_post.slug,
    title: new_post.title,
    body: new_post.body,
    createdAt: new_post.createdAt,
    cover: CoverToUrl(new_post.cover),
    tags: new_post.tags,
    category: new_post.category?.name,
    authorName: author?.name,
  });
};

//EDITAR
export const EditPost = async (req: ExtendedRequest, res: Response) => {
  const { slug } = req.params;
  const data = update_post.safeParse(req.body);
  if (!data.success) {
    return res.json({ error: data.error.flatten().fieldErrors });
  }
  const post = await GetPostBySlug(slug as string);
  if (!post) {
    return res.json({ error: "Non-existent post" });
  }
  let cover_name: string | false | undefined = false;

  if (req.file) {
    cover_name = await HandleFileCover(req.file);
  }
  
  const updated_post = await UpdatePost(slug as string, {
    updateAt: new Date(),
    status: data.data.status ?? undefined,
    title: data.data.title ?? undefined,
    tags: data.data.tags ?? undefined,
    body: data.data.body ?? undefined,
    cover: cover_name ? cover_name : undefined,
  });

  const author = await GetUserById(updated_post.authorId);

  res.json({
    post: {
      id: updated_post.id,
      status: updated_post.status,
      title: updated_post.title,
      body: updated_post.body,
      slug: updated_post.slug,
      createdAt: updated_post.createdAt,
      cover: CoverToUrl(updated_post.cover),
      tags: updated_post.tags,
      authorName: author?.name,
    }
  });
};

//DELETAR
export const RemovePost = async (req: ExtendedRequest, res: Response) => {
  const { slug } = req.params;
  const post = await GetPostBySlug(slug as string);
  if (!post) {
    return res.json({ error: "Non-existent post" });
  }
  await DeletePost(post.slug);
  res.json({ error: null });
};

//PEGAR POSTS
export const GetPosts = async (req: ExtendedRequest, res: Response) => {
  let posts = await GetAllPostService();

  const post_to_return = posts.map((posts) => ({
    id: posts.id,
    status: posts.status,
    title: posts.title,
    createdAt: posts.createdAt,
    cover: CoverToUrl(posts.cover),
    authorName: posts.author?.name,
    category: posts.category?.name,
    tags: posts.tags,
    slug: posts.slug,
  }));
  res.json({ posts: post_to_return });
};

export const GetPost = async (req: ExtendedRequest, res: Response) => {
  const { slug } = req.params;


  const post = await GetPostBySlug(slug as string);


  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

 
  await incrementProductView(post.id);

  res.status(200).json({
    post: {
      id: post.id,
      status: post.status,              
      title: post.title,
      body: post.body,
      createdAt: post.createdAt,
      cover: CoverToUrl(post.cover),
      authorName: post.author?.name,
      category: post.category?.name,    
      tags: post.tags,
      slug: post.slug,
    },
  });
};

//COUNT
export const CountPosts = async (req: ExtendedRequest, res: Response) => {
  const posts = await GetNumberPost();
  return res.json({ posts });
};

export const CountPostDraft = async (req: ExtendedRequest, res: Response) => {
  const posts = await GetNumberPostDraft();
  return res.json({ posts });
};

export const CountViews = async (req: ExtendedRequest, res: Response) => {
  const posts = await GetNumberPostViews();
  return res.json({ posts });
};

//CATEGORIAS
export const AddCategory = async (req: ExtendedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Acess denied" });
  }
  const data = category_schema.safeParse(req.body);
  if (!data.success) {
    return res.status(400).json({ error: data.error.flatten() });
  }

  const category = await CreateCategory(data.data.name);
  console.log(category);
  return res.status(201).json({
    id: category.id,
    name: category.name,
  });
};

export const GetCategory = async (req: ExtendedRequest, res: Response) => {
  const category = await GetAllCategory();
  if (!category) {
    return false;
  }
  return res.json({ category });
};

export const DeletedCategory = async (req: ExtendedRequest, res: Response) => {
  const { id } = req.params;

  const category = await DeleteCategory(Number(id));

  if (!category) {
    return res.status(404).json({ error: "Not found Category" });
  }

  res.json({ error: null, category });
};

export const EditCategory = async (req: ExtendedRequest, res: Response) => {
  const { id } = req.params;
  const data = UpdateCategorySchema.safeParse(req.body);
  if (!data.success) {
    return res.json({ error: data.error.flatten().fieldErrors });
  }
  const category = await GetCategoryById(Number(id));
  if (!category) {
    return res.json({ error: "Non-Existet Category" });
  }

  const updatedCategory = await UpdateCategory(Number(id), {
    name: data.data.name ?? undefined,
  });
  return res.json(updatedCategory);
};
