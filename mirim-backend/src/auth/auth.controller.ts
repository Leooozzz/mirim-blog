import { RequestHandler, Response } from "express";

import { ExtendedRequest } from "../types/extendsRequest";
import { CreateToken, CreateUser, VerifyUser } from "./auth.service";
import { singinSchema, singUpSchema } from "./auth.schema";

export const singup: RequestHandler = async (req, res) => {
  const data = singUpSchema.safeParse(req.body);

  if (!data.success) {
    return res.status(400).json({ error: data.error.flatten() });
  }

  const newUser = await CreateUser(data.data);

  if (!newUser) {
    return res.status(400).json({ error: "Error creating user." });
  }

  const token = CreateToken(newUser);

  res.status(201).json({
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
    token,
  });
};

export const singin: RequestHandler = async (req, res) => {
  const data = singinSchema.safeParse(req.body);
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
      role: user.role,
    },
    token,
  });
};

export const validate = async (req: ExtendedRequest, res: Response) => {
  res.json({ user: req.user });
};
