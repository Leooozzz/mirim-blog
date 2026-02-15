import { Router } from "express";
import { PrivateRoute } from "../middlewares/privateRoute";
import * as CategoryController from "./category.controller";
import { checkAbility } from "../middlewares/checkAbility";

export const CategoryRoutes = Router()

CategoryRoutes.get('/:id',PrivateRoute,checkAbility('read','Category'),CategoryController.GetCategory)
CategoryRoutes.post('/', PrivateRoute, checkAbility('create','Category'), CategoryController.AddCategory)
CategoryRoutes.put('/:id', PrivateRoute, checkAbility('update','Category'), CategoryController.EditCategory)
CategoryRoutes.delete('/:id', PrivateRoute, checkAbility('delete','Category'),CategoryController.DeletedCategory)

export default CategoryRoutes