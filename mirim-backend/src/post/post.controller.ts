import { RequestHandler } from "express";
import {
  GetPostBySlug,
  GetPostPublished,
  GetPostSameTags,
  PostByCategory,
} from "./post.services";
import { CoverToUrl } from "../utils/coverToUrl";

export const GetAllPost: RequestHandler = async (req, res) => {
  try {
    let post = await GetPostPublished();

    const PostToReturn = post.map((posts) => ({
      id: posts.id,
      status: posts.status,
      title: posts.title,
      createdAt: posts.createdAt,
      cover: CoverToUrl(posts.cover),
      authorName: posts.author?.name,
      body: posts.body,
      category: posts.category?.name,
      tags: posts.tags,
      slug: posts.slug,
    }));
    res.json({ post: PostToReturn });
  } catch (error) {
    console.log("Get All Post", error);
    return res.status(500).json("Internal server error");
  }
};

export const GetPost: RequestHandler = async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await GetPostBySlug(slug as string);

    if (!post || (post && post.status != "PUBLISHED")) {
      return res.json("Non-existent post");
    }

    res.json({
      post: {
        id: post.id,
        title: post.title,
        createdAt: post.createdAt,
        cover: CoverToUrl(post.cover),
        authorName: post.author?.name,
        status: post.status,
        body: post.body,
        tags: post.tags,
        slug: post.slug,
      },
    });
  } catch (error) {
    console.log("Get Posts", error);
    return res.status(500).json("Internal server error");
  }
};

export const GetRelatedPost: RequestHandler = async (req, res) => {
  try {
    const { slug } = req.params;

    let posts = await GetPostSameTags(slug as string);

    const PostToReturn = posts.map((post) => ({
      id: post.id,
      status: post.status,
      title: post.title,
      body: post.body,
      createdAt: post.createdAt,
      cover: CoverToUrl(post.cover),
      authorName: post.author?.name,
      tags: post.tags,
      category: post.category,
      slug: post.slug,
    }));

    res.json({ posts: PostToReturn });
  } catch (error) {
    console.log("Get Related Post", error);
    return res.status(500).json("Internal server error");
  }
};

export const GetPostByCategory: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryId = Number(id);

    if (Number.isNaN(categoryId)) {
      return res.status(400).json({ message: "Invalid category id" });
    }

    const posts = await PostByCategory(categoryId);

    const postsWithCoverUrl = posts.map((post) => ({
      ...post,
      cover: CoverToUrl(post.cover),
    }));

    return res.json({ posts: postsWithCoverUrl });
  } catch (error) {
    console.log("Get post by category", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
