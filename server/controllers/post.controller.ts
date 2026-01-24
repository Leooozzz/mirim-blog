import { RequestHandler } from "express";
import { get_post_published } from "../services/posts.services";
import { cover_to_url } from "../utils/cover.to.url";

export const get_all_post: RequestHandler = async (req, res) => {
    let page = 1 ;
    if(req.query.page){
        page = parseInt(req.query.page as string)
        if(page <= 0){
           return res.json({error:"Page not found"})
        }
    }
    let post = await get_post_published(page)

    const post_to_return = post.map((posts) => ({
        id: posts.id,
        status: posts.status,
        title: posts.title,
        createAt: posts.createdAt,
        cover: cover_to_url(posts.cover),
        authorName: posts.author?.name,
        tags: posts.tags,
        slug: posts.slug,
      }));
      res.json({ post: post_to_return, page });
};
export const get_related_post: RequestHandler = async (req, res) => {};
export const get_post: RequestHandler = async (req, res) => {};
