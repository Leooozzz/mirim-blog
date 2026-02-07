import { Router } from "express";
import { PrivateRoute } from "../middlewares/privateRoute";
import * as AdminAuxController from "../controllers/adminAuxController";

export const AuxRoutes = Router()

AuxRoutes.get('/countViews',PrivateRoute,AdminAuxController.CountViews)


export default AuxRoutes