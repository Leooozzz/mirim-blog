import { Router } from "express";
import * as postController from "./post.controller";
import * as CategoryController from "../category/category.controller";
export const PostRoutes = Router();

PostRoutes.get("/category", CategoryController.GetCategories);
PostRoutes.get("/category/:id", postController.GetPostByCategory);
PostRoutes.get("/:slug/related", postController.GetRelatedPost);
PostRoutes.get("/:slug", postController.GetPost);
PostRoutes.get("/", postController.GetAllPost);

export default PostRoutes;
