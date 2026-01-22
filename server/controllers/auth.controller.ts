import { RequestHandler, Response } from "express";
import { singup_schema } from "../schemas/singup.schema";
import { create_user, verify_user } from "../services/user.service";
import { create_token } from "../services/auth.service";
import { singin_schema } from "../schemas/singin.schema";
import { extended_request } from "../types/extends.request";

export const singup: RequestHandler = async (req, res) => {
  const data = singup_schema.safeParse(req.body);

  if (!data.success) {
    return res.status(400).json({ error: data.error.flatten() });
  }

  const new_user = await create_user(data.data);

  if (!new_user) {
    return res.status(400).json({ error: "Error creating user." });
  }

  const token = create_token(new_user);

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

  const user = await verify_user(data.data);

  if (!user) {
    return res.status(403).json({ error: "Access denied" });
  }
  const token = create_token(user);

  res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token
  });
};

export const validate = async (req:extended_request, res:Response) => {
    res.json({user:req.user})
};