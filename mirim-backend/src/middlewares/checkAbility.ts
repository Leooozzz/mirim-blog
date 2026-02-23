import { Response, NextFunction } from "express";
import { defineAbilitiesFor } from "../utils/cast";

export const checkAbility = (action: string, subject: string) => {
  return (req: any, res: Response, next: NextFunction) => {
    const ability = defineAbilitiesFor(req.user);

    if (!ability.can(action, subject)) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  };
};
