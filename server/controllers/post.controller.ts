import { RequestHandler } from "express";
import {
  get_post_byslug,
  get_post_published,
  get_post_same_tags,
} from "../services/posts.services";
import { cover_to_url } from "../utils/cover.to.url";

export const get_all_post: RequestHandler = async (req, res) => {
  let page = 1;
  if (req.query.page) {
    page = parseInt(req.query.page as string);
    if (page <= 0) {
      return res.json({ error: "Page not found" });
    }
  }
  let post = await get_post_published(page);

  const post_to_return = post.map((posts) => ({
    id: posts.id,
    status: posts.status,
    title: posts.title,
    createdAt: posts.createdAt,
    cover: cover_to_url(posts.cover),
    authorName: posts.author?.name,
    tags: posts.tags,
    slug: posts.slug,
  }));
  res.json({ post: post_to_return, page });
};

export const get_post: RequestHandler = async (req, res) => {
  const { slug } = req.params;
  const post = await get_post_byslug(slug as string);

  if (!post || (post && post.status != "PUBLISHED")) {
    return res.json("Non-existent post");
  }

  res.json({
    post: {
      id: post.id,
      title: post.title,
      createdAt: post.createdAt,
      cover: cover_to_url(post.cover),
      authorName: post.author?.name,
      tags: post.tags,
      slug: post.slug,
    },
  });
};

export const get_related_post: RequestHandler = async (req, res) => {
  const { slug } = req.params;

  let posts = await get_post_same_tags(slug as string)

  const posts_to_return  = posts.map(post => ({
     id: post.id,
    status: post.status,
    title: post.title,
    createdAt: post.createdAt,
    cover: cover_to_url(post.cover),
    authorName: post.author?.name,
    tags: post.tags,
    slug: post.slug,
  }))

  res.json({posts:posts_to_return})
};
