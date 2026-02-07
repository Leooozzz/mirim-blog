import { GetNumberPost, GetNumberPostDraft, GetNumberPostViews } from "../services/postsServices";
import { ExtendedRequest } from "../types/extendsRequest";
import { Response } from "express";

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
