import { RequestHandler } from "express";
import {
  GetPostBySlug,
  GetPostPublished,
  GetPostSameTags,
} from "../services/postsServices";
import { CoverToUrl } from "../utils/coverToUrl";
import { GetAllCategory } from "../services/categoryService";

export const GetAllPost: RequestHandler = async (req, res) => {
  let page = 1;
  if (req.query.page) {
    page = parseInt(req.query.page as string);
    if (page <= 0) {
      return res.json({ error: "Page not found" });
    }
  }
  let post = await GetPostPublished(page);

  const PostToReturn = post.map((posts) => ({
    id: posts.id,
    status: posts.status,
    title: posts.title,
    createdAt: posts.createdAt,
    cover: CoverToUrl(posts.cover),
    authorName: posts.author?.name,
    body:posts.body,
    category: posts.category?.name,
    tags: posts.tags,
    slug: posts.slug,
  }));
  res.json({ post: PostToReturn, page });
};

export const GetPost: RequestHandler = async (req, res) => {
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
      status:post.status,
      body: post.body,
      tags: post.tags,
      slug: post.slug,
    },
  });
};

export const GetRelatedPost: RequestHandler = async (req, res) => {
  const { slug } = req.params;

  let posts = await GetPostSameTags(slug as string)

  const posts_to_return  = posts.map(post => ({
     id: post.id,
    status: post.status,
    title: post.title,
    createdAt: post.createdAt,
    cover: CoverToUrl(post.cover),
    authorName: post.author?.name,
    tags: post.tags,
    slug: post.slug,
  }))

  res.json({posts:posts_to_return})
};
export const GetCategory:RequestHandler = async (req,res) => {
  const category = await GetAllCategory();
  if (!category) {
    return false;
  }
  return res.json({ category });
};
