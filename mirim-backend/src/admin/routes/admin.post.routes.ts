import { Router } from "express";
import * as AdminController from "../admin.controller";
import * as AdminAuxController from "../admin.aux.controller";
import { PrivateRoute } from "../../middlewares/privateRoute";
import { checkAbility } from "../../middlewares/checkAbility";
import { upload } from "../../libs/multer";

const AdminPostRoutes = Router()

AdminPostRoutes.post('/posts', PrivateRoute, checkAbility('create','Post'),upload.single('cover'), AdminController.AddPost)
AdminPostRoutes.get('/posts', PrivateRoute,checkAbility('read','Post'),AdminController.GetPosts)
AdminPostRoutes.get('/post/countPublished', PrivateRoute,checkAbility('read','Post'),AdminAuxController.CountPosts)
AdminPostRoutes.get('/post/countDraft', PrivateRoute,checkAbility('read', 'Post'), AdminAuxController.CountPostDraft)
AdminPostRoutes.get('/post/:slug', PrivateRoute, checkAbility('read', 'Post'),AdminController.GetPost)
AdminPostRoutes.put('/post/:slug', PrivateRoute,checkAbility('update', 'Post'), upload.single('cover'), AdminController.EditPost)
AdminPostRoutes.delete('/post/:slug', PrivateRoute,checkAbility('delete', 'Post'), AdminController.RemovePost)


export default AdminPostRoutes