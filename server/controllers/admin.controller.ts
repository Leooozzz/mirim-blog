import { Response } from "express";
import { extended_request } from "../types/extends.request";
import { post_schema } from "../schemas/post.schema";
import {
  create_post,
  create_post_slug,
  handle_file_cover,
} from "../services/posts.services";
import { get_user_by_id } from "../services/user.service";
import { cover_to_url } from "../utils/cover.to.url";

export const add_post = async (req: extended_request, res: Response) => {
  if (!req.user) {
    return false;
  }
  const data = post_schema.safeParse(req.body);
  if (!data.success) {
    return res.status(400).json({ error: data.error.flatten() });
  }
  if (!req.file) {
    return res.json({ error: "No file" });
  }
  const cover_name = await handle_file_cover(req.file);
  if (!cover_name) {
    return res.json({ error: "Image not allowed" });
  }

  const slug = await create_post_slug(data.data.title);
  const new_post = await create_post({
    authorId: req.user.id,
    slug,
    title: data.data.title,
    tags: data.data.tags,
    body: data.data.body,
    cover: cover_name,
  });
  const author = await get_user_by_id(new_post.authorId)
  res.status(201).json({
    id:new_post.id,
    slug:new_post.slug,
    title:new_post.title,
    createdAt: new_post.createdAt,
    cover: cover_to_url(new_post.cover),
    tags:new_post.tags,
    authorName: author?.name

  })
};
export const get_posts = async (req: extended_request, res: Response) => {};
export const get_post = async (req: extended_request, res: Response) => {};
export const edit_post = async (req: extended_request, res: Response) => {};
export const remove_post = async (req: extended_request, res: Response) => {};
