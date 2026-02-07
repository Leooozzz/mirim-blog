import { Router } from "express";
import * as postController from "../controllers/postController";
import * as CategoryController from '../controllers/categoryController'
export const PostRoutes = Router()

PostRoutes.get('/category', CategoryController.GetCategory)
PostRoutes.get('/:slug/related', postController.GetRelatedPost)
PostRoutes.get('/:slug', postController.GetPost)
PostRoutes.get('/', postController.GetAllPost)


export default PostRoutes