import { Router } from "express";
import * as AuthController from "../controllers/authController";
import { PrivateRoute } from "../middlewares/privateRoute";
export const AuthRoutes = Router()


AuthRoutes.post('/validate',PrivateRoute,AuthController.validate)
AuthRoutes.post('/singin',AuthController.singin )
AuthRoutes.post('/singup', AuthController.singup);


export default AuthRoutes