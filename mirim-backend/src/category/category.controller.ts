import { CategorySchema, UpdateCategorySchema } from "./category.schema";
import {
  CreateCategory,
  DeleteCategory,
  GetAllCategory,
  GetCategoryById,
  UpdateCategory,
} from "./category.service";
import { ExtendedRequest } from "../types/extendsRequest";
import { RequestHandler, Response } from "express";
import { GetUserById } from "../services/user.service";
export const AddCategory = async (req: ExtendedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Acess denied" });
    }
    const data = CategorySchema.safeParse(req.body);
    if (!data.success) {
      return res.status(400).json({ error: data.error.flatten() });
    }

    const category = await CreateCategory({
      name: data.data.name,
      authorId: req.user.id,
    });
    const user = await GetUserById(req.user.id);
    return res.status(201).json({
      id: category.id,
      name: category.name,
      authorName: user?.name,
    });
  } catch (error) {
    console.log("AddCategory", error);
    return res.status(500).json("Internal server error");
  }
};

export const DeletedCategory = async (req: ExtendedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Acess denied" });
    }
    const { id } = req.params;

    const category = await DeleteCategory(Number(id));

    if (!category) {
      return res.status(404).json({ error: "Not found Category" });
    }

    res.json({ error: null, category });
  } catch (error) {
    console.log("Delete Category", error);
    return res.status(500).json("Internal server error");
  }
};
export const GetCategory = async (req: ExtendedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const category = await GetCategoryById(Number(id));
    if (!category) {
      return res.json({ error: "Non-Existent Category" });
    }
    return res.json(category);
  } catch (error) {
    console.log("Get Category", error);
    return res.status(500).json("Internal server error");
  }
};

export const EditCategory = async (req: ExtendedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Acess denied" });
    }
    const { id } = req.params;
    const data = UpdateCategorySchema.safeParse(req.body);
    if (!data.success) {
      return res.json({ error: data.error.flatten().fieldErrors });
    }
    const category = await GetCategoryById(Number(id));
    if (!category) {
      return res.json({ error: "Non-Existet Category" });
    }

    const updatedCategory = await UpdateCategory(Number(id), {
      name: data.data.name ?? undefined,
    });
    return res.json(updatedCategory);
  } catch (error) {
    console.log("Edit category", error);
    return res.status(500).json("Internal server error");
  }
};

export const GetCategories: RequestHandler = async (req, res) => {
  try {
    const category = await GetAllCategory();
    if (!category) {
      return false;
    }
    return res.json({ category });
  } catch (error) {
    console.log("Get Category", error);
    return res.status(500).json("Internal server error");
  }
};
