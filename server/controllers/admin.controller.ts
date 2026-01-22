import { Response } from "express";
import { extended_request } from "../types/extends.request";
import { post_schema } from "../schemas/post.schema";

export const add_post = async (req: extended_request, res: Response) => {
  if (!req.user) {
    return false;
  }
  const data= post_schema.safeParse(req.body)
  if(!data.success){
   return res.status(400).json({ error: data.error.flatten() });
  }
  if(!req.file){
    return res.json({error: 'No file'})
  }
};
export const get_posts = async (req: extended_request, res: Response) => {};
export const get_post = async (req: extended_request, res: Response) => {};
export const edit_post = async (req: extended_request, res: Response) => {};
export const remove_post = async (req: extended_request, res: Response) => {};
