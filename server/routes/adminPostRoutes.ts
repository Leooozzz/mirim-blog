import { Router } from "express";
import { PrivateRoute } from "../middlewares/privateRoute";
import { upload } from "../lib/multer";
import * as AdminController from "../controllers/adminController";
import * as AdminAuxController from "../controllers/adminAuxController";

const AdminPostRoutes = Router()

AdminPostRoutes.post('/posts', PrivateRoute, upload.single('cover'), AdminController.AddPost)
AdminPostRoutes.get('/posts', PrivateRoute, AdminController.GetPosts)
AdminPostRoutes.get('/post/countPublished', PrivateRoute, AdminAuxController.CountPosts)
AdminPostRoutes.get('/post/countDraft', PrivateRoute, AdminAuxController.CountPostDraft)
AdminPostRoutes.get('/post/:slug', PrivateRoute, AdminController.GetPost)
AdminPostRoutes.put('/post/:slug', PrivateRoute, upload.single('cover'), AdminController.EditPost)
AdminPostRoutes.delete('/post/:slug', PrivateRoute, AdminController.RemovePost)


export default AdminPostRoutes