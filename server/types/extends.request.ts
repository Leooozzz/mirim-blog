import { User } from "@/generated/prisma/client";
import { Request } from "express";

type user_without_password = Omit<User, "password">;

export type extended_request = Request & {
  user?: user_without_password;
};
