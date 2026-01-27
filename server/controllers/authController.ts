import { RequestHandler, Response } from "express";
import { singup_schema } from "../schemas/singupSchema";
import { CreateUser, VerifyUser } from "../services/userService";
import { singin_schema } from "../schemas/singinSchema";
import { ExtendedRequest } from "../types/extendsRequest";
import { CreateToken } from "../services/authservice";



export const singup: RequestHandler = async (req, res) => {
  const data = singup_schema.safeParse(req.body);

  if (!data.success) {
    return res.status(400).json({ error: data.error.flatten() });
  }

  const new_user = await CreateUser(data.data);

  if (!new_user) {
    return res.status(400).json({ error: "Error creating user." });
  }

  const token = CreateToken(new_user);

  res.status(201).json({
    user: {
      id: new_user.id,
      name: new_user.name,
      email: new_user.email,
    },
    token,
  });
};

export const singin: RequestHandler = async (req, res) => {
  const data = singin_schema.safeParse(req.body);
  if (!data.success) {
    return res.status(400).json({ error: data.error.flatten() });
  }

  const user = await VerifyUser(data.data);

  if (!user) {
    return res.status(403).json({ error: "Access denied" });
  }
  const token = CreateToken(user);

  res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token
  });
};

export const validate = async (req:ExtendedRequest, res:Response) => {
    res.json({user:req.user})
};