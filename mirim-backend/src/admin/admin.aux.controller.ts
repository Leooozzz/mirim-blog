import {
  GetNumberPost,
  GetNumberPostDraft,
  GetNumberPostViews,
} from "../post/post.services";
import { ExtendedRequest } from "../types/extendsRequest";
import { Response } from "express";
import { GetAllAdmins } from "./admin.aux.service";

export const CountPosts = async (req: ExtendedRequest, res: Response) => {
  try {
    const posts = await GetNumberPost();
    return res.json({ posts });
  } catch (error) {
    console.log("Count posts", error);
    return res.status(500).json("Internal server error");
  }
};

export const CountPostDraft = async (req: ExtendedRequest, res: Response) => {
  try {
    const posts = await GetNumberPostDraft();
    return res.json({ posts });
  } catch (error) {
    console.log("Count post draft", error);
    return res.status(500).json("Internal server error");
  }
};

export const CountViews = async (req: ExtendedRequest, res: Response) => {
  try {
    const posts = await GetNumberPostViews();
    return res.json({ posts });
  } catch (error) {
    console.log("Count views", error);
    return res.status(500).json("Internal server error");
  }
};

export const ListAdmin = async (req: ExtendedRequest, res: Response) => {
  try {
    const admin = await GetAllAdmins();
    return res.json({ admin });
  } catch (error) {
    console.log("ListAdmin", error);
    return res.status(500).json("Internal server error");
  }
};
