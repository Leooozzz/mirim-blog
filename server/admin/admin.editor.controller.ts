import { Response } from "express";
import { ExtendedRequest } from "../types/extendsRequest";
import { AdminEditorSchema } from "./admin.editor.schema";
import { CreateToken } from "../auth/auth.service";
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

    res.status(200).json(
      {
        name: newEditor.name,
        email: newEditor.email,
        status: newEditor.status,
        role: newEditor.role,
        createdAt: newEditor.createdAt,
      }
    );
  } catch (error) {
    console.log("Create editor", error);
    return res.status(500).json("Internal server error");
  }
};

export const AdminUpdateEditor = async (req:ExtendedRequest,res:Response) =>{


}

export const AdminDeleteEditor = async(req:ExtendedRequest,res:Response) => {
    try{
        const {id} =req.params;

        const user = await DeleteUser(Number(id))

        if(!user){
            return res.status(404).json({ error: "Not found User" });
        }
        res.json({error: null,user})
    }catch(error){
        console.log("Delete user", error);
    return res.status(500).json("Internal server error");
    }
}