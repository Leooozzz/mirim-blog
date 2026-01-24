import { Router } from "express";

import * as post_controller from "../controllers/post.controller";
import * as admin_controller from "../controllers/admin.controller";
import * as auth_controller from "../controllers/auth.controller";
import { private_route } from "../middlewares/private.route";
import { upload } from "../lib/multer";

export const router = Router();

router.post('/admin/posts',private_route,upload.single('cover'), admin_controller.add_post)
router.get('/admin/post',private_route, admin_controller.get_posts)
router.get('/admin/post/:slug',private_route, admin_controller.get_post)
router.put('/admin/posts/:slug',private_route,upload.single('cover'),admin_controller.edit_post)
router.delete('/admin/post/:slug',private_route, admin_controller.remove_post)

router.post('/auth/validate',private_route,auth_controller.validate)
router.post('/auth/singin',auth_controller.singin )
router.post("/auth/singup", auth_controller.singup);

router.get('/posts',post_controller.get_all_post)
//router.get('/posts/:slug',post_controller.get_post)
//router.get('/posts/:slug/related',post_controller.get_related_post)

router.get("/ping", (req, res) => {
  res.json({ pong: true });
});
