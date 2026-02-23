import { Response } from "express";
import { ExtendedRequest } from "../types/extendsRequest";
import { AdminEditorSchema } from "./admin.editor.schema";
import { CreateEditor, DeleteUser } from "./admin.editor.service";

export const AdminCreateEditor = async (
  req: ExtendedRequest,
  res: Response,
) => {
  try {
    if (!req.user) {
      return res.status(201).json({ error: "Acess denied" });
    }
    const data = AdminEditorSchema.safeParse(req.body);

    if (!data.success) {
      return res.status(400).json({ error: data.error.flatten() });
    }
    const newEditor = await CreateEditor(data.data);

    if (!newEditor) {
      return res.status(400).json({ error: "Error creating editor." });
    }

    res.status(200).json({
      name: newEditor.name,
      email: newEditor.email,
      status: newEditor.status,
      role: newEditor.role,
      createdAt: newEditor.createdAt,
    });
  } catch (error) {
    console.log("Create editor", error);
    return res.status(500).json("Internal server error");
  }
};

export const AdminDeleteEditor = async (
  req: ExtendedRequest,
  res: Response,
) => {
  try {
    if (!req.user) {
      return res.status(201).json({ error: "Acess denied" });
    }
    const { id } = req.params;
    if (req.user.id === Number(id)) {
      return res.status(403).json({ error: "You can't exclude yourself." });
    }
    const user = await DeleteUser(Number(id));

    if (!user) {
      return res.status(404).json({ error: "Not found User" });
    }
    res.json({ error: null, user });
  } catch (error) {
    console.log("Delete user", error);
    return res.status(500).json("Internal server error");
  }
};
