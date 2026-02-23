import jwt from "jsonwebtoken";

export const CreateJsonwebtoken = (payload: any) => {
  return jwt.sign(payload, process.env.JSONWEBTOKEN_SECRET as string);
};
export const ReadJsonwebtoken = (hash: string) => {
  try {
    return jwt.verify(hash, process.env.JSONWEBTOKEN_SECRET as string);
  } catch (err) {
    return false;
  }
};
