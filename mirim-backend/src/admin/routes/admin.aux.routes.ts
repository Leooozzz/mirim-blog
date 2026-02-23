import { Router } from "express";
import { PrivateRoute } from "../../middlewares/privateRoute";
import * as AdminAuxController from "../admin.aux.controller";
import { checkAbility } from "../../middlewares/checkAbility";

export const AuxRoutes = Router()

AuxRoutes.get('/countViews',PrivateRoute, checkAbility('read','Post'),AdminAuxController.CountViews)
AuxRoutes.get('/listadmin',PrivateRoute, checkAbility('read','Post'),AdminAuxController.ListAdmin)

export default AuxRoutes