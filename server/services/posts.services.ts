import { v4 } from "uuid";
import fs from "fs/promises";

export const handle_file_cover = async (file: Express.Multer.File) => {
  try {
    const allowed = ["image/jpeg", "image/jpg", "image/png"];
    if (allowed.includes(file.mimetype)) {
      const cover_name = `${v4()}.jpg`;
      await fs.rename(file.path, `./public/images/covers/${cover_name}`);
      return cover_name;
    }
  } catch {
    return false;
  }
};
