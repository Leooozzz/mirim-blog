import { Router } from "express";

import * as AdminController from "../admin.controller";
import * as AdminAuxController from "../admin.aux.controller";
import { PrivateRoute } from "../../middlewares/privateRoute";
import { upload } from "../../lib/multer";

const AdminPostRoutes = Router()

AdminPostRoutes.post('/posts', PrivateRoute, upload.single('cover'), AdminController.AddPost)
AdminPostRoutes.get('/posts', PrivateRoute, AdminController.GetPosts)
AdminPostRoutes.get('/post/countPublished', PrivateRoute, AdminAuxController.CountPosts)
AdminPostRoutes.get('/post/countDraft', PrivateRoute, AdminAuxController.CountPostDraft)
AdminPostRoutes.get('/post/:slug', PrivateRoute, AdminController.GetPost)
AdminPostRoutes.put('/post/:slug', PrivateRoute, upload.single('cover'), AdminController.EditPost)
AdminPostRoutes.delete('/post/:slug', PrivateRoute, AdminController.RemovePost)


export default AdminPostRoutes