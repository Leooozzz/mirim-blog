import {  Router } from "express";

import * as post_controller from "../controllers/postController";
import * as AdminController from "../controllers/adminController";
import * as AuthController from "../controllers/authController";
import { PrivateRoute } from "../middlewares/privateRoute";
import { upload } from "../lib/multer";

export const router = Router();


router.post('/admin/category',PrivateRoute,AdminController.AddCategory)
router.post('/admin/posts', PrivateRoute, upload.single('cover'), AdminController.AddPost)
router.get('/admin/posts', PrivateRoute, AdminController.GetPosts)
router.get('/admin/post/countPublished', PrivateRoute, AdminController.CountPosts)
router.get('/admin/post/countDraft', PrivateRoute, AdminController.CountPostDraft)
router.get('/admin/post/:slug', PrivateRoute, AdminController.GetPost)
router.get('/admin/category',PrivateRoute,AdminController.GetCategory)
router.get('/admin/countViews',PrivateRoute,AdminController.CountViews)
router.put('/admin/posts/:slug', PrivateRoute, upload.single('cover'), AdminController.EditPost)
router.put('/admin/category/:id',PrivateRoute,AdminController.EditCategory)
router.delete('/admin/post/:slug', PrivateRoute, AdminController.RemovePost)
router.delete('/admin/category/:id',PrivateRoute,AdminController.DeletedCategory)



router.post('/auth/validate',PrivateRoute,AuthController.validate)
router.post('/auth/singin',AuthController.singin )
router.post('/auth/singup', AuthController.singup);

router.get('/posts', post_controller.GetAllPost)
router.get('/posts/:slug/related', post_controller.GetRelatedPost)
router.get('/posts/:slug', post_controller.GetPost)

router.get("/ping", (req, res) => {
  res.json({ pong: true });
});
