import { Router } from "express";
import { PrivateRoute } from "../middlewares/privateRoute";
import * as CategoryController from "../controllers/categoryController";

export const CategoryRoutes = Router()

CategoryRoutes.post('/', PrivateRoute, CategoryController.AddCategory)
CategoryRoutes.put('/:id', PrivateRoute, CategoryController.EditCategory)
CategoryRoutes.delete('/:id', PrivateRoute, CategoryController.DeletedCategory)

export default CategoryRoutes