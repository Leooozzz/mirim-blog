import { Router } from "express";
import * as postController from "../controllers/postController";

export const PostRoutes = Router()

PostRoutes.get('/category', postController.GetCategory)
PostRoutes.get('/:slug/related', postController.GetRelatedPost)
PostRoutes.get('/:slug', postController.GetPost)
PostRoutes.get('/', postController.GetAllPost)


export default PostRoutes