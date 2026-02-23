import { NextFunction, Request, Response } from "express";
import { ExtendedRequest } from "../types/extendsRequest";
import { VerifyRequest } from "../auth/auth.service";

export const PrivateRoute = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
) => {
  const user = await VerifyRequest(req);
  if (!user) {
    return res.status(401).json({ errot: "Acess denied" });
  }
  req.user = user;

  next();
};
