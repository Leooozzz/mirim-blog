import { Response } from "express";
import { ExtendedRequest } from "../types/extendsRequest";
import { PostSchema, UpdatePostSchema } from "../post/post.schema";
import {
  CreatePost,
  CreatePostSlug,
  DeletePost,
  GetAllPostService,
  GetPostBySlug,
  HandleFileCover,
  incrementProductView,
  UpdatePost,
} from "../post/post.services";
import { GetUserById } from "../services/user.service";
import { CoverToUrl } from "../utils/coverToUrl";
import { GetCategoryById } from "../category/category.service";

//CRIAR POST E SLUG

export const AddPost = async (req: ExtendedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Access denied" });
    }

    const data = PostSchema.safeParse(req.body);
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
  } catch (error) {
    console.error("AddPost error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

//EDITAR

export const EditPost = async (req: ExtendedRequest, res: Response) => {
  try {
    const { slug } = req.params;
    const data = UpdatePostSchema.safeParse(req.body);
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

    const posts = await UpdatePost(slug as string, {
      updateAt: new Date(),
      status: data.data.status ?? undefined,
      title: data.data.title ?? undefined,
      tags: data.data.tags ?? undefined,
      body: data.data.body ?? undefined,
      cover: cover_name ? cover_name : undefined,
      category: data.data.categoryId
      ? { connect: { id: Number(data.data.categoryId) } }
      : undefined,
    });

    const author = await GetUserById(posts.authorId);

    res.json({
      post: {
        id: posts.id,
        status: posts.status,
        title: posts.title,
        body: posts.body,
        slug: posts.slug,
        createdAt: posts.createdAt,
        cover: CoverToUrl(posts.cover),
        tags: posts.tags,
        category:posts.categoryId,
        authorName: author?.name,
      },
    });
  } catch (error) {
    console.error("Edit post", error);
    return res.status(500).json("Internal server error");
  }
};

//DELETAR
export const RemovePost = async (req: ExtendedRequest, res: Response) => {
  try {
    const { slug } = req.params;
    const post = await GetPostBySlug(slug as string);
    if (!post) {
      return res.json({ error: "Non-existent post" });
    }
    await DeletePost(post.slug);
    res.json({ error: null });
  } catch (error) {
    console.log("Delete Post", error);
    return res.status(500).json("Internal server error");
  }
};

//PEGAR POSTS
export const GetPosts = async (req: ExtendedRequest, res: Response) => {
  try {
    let posts = await GetAllPostService();

    const PostsToReturn = posts.map((posts) => ({
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
    res.json({ posts: PostsToReturn });
  } catch (error) {
    console.log("Get Posts", error);
    return res.status(500).json("Internal server error");
  }
};

export const GetPost = async (req: ExtendedRequest, res: Response) => {
  try {
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
  } catch (error) {
    console.log("Get post", error);
    return res.status(500).json("Internal server error");
  }
};
