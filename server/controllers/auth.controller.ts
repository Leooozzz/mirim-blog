import { RequestHandler } from "express";
import { singup_schema } from "../schemas/singup.schema";
import { create_user } from "../services/user.service";

export const singup: RequestHandler = async (req, res) => { 

  const data = singup_schema.safeParse(req.body);

  if (!data.success) {
    return res.status(400).json({ error: data.error.flatten() });
  }

  const new_user = await create_user(data.data);

  if (!new_user) {
    return res.status(400).json({ error: "Error creating user." });
  }

  const token = '';

  res.status(201).json({
    user:{
        id: new_user.id,
        name: new_user.name,
        email: new_user.email
    },
    token
  })
};
export const validate: RequestHandler = async (req, res) => {};
export const singin: RequestHandler = async (req, res) => {};
