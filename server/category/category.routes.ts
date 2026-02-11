import { Router } from "express";
import { PrivateRoute } from "../middlewares/privateRoute";
import * as CategoryController from "./category.controller";

export const CategoryRoutes = Router()

CategoryRoutes.post('/', PrivateRoute, CategoryController.AddCategory)
CategoryRoutes.put('/:id', PrivateRoute, CategoryController.EditCategory)
CategoryRoutes.delete('/:id', PrivateRoute, CategoryController.DeletedCategory)

export default CategoryRoutes