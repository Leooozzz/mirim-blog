import { v4 } from "uuid";
import fs from "fs/promises";
import slug from "slug";
import { prisma } from "../lib/prisma";
import {  create_type_post } from "../types/post.types";
import { Prisma } from "../../prisma/prisma/client";

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
export const get_post_byslug = async (slug:string) => {
  return await prisma.post.findUnique({
    where: { slug },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
};

export const create_post_slug = async (title: string) => {
  let new_slug = slug(title);
  let keep_trying = true;
  let post_count = 1;

  while (keep_trying) {
    const post = await get_post_byslug(new_slug);
    if (!post) {
      keep_trying = false;
    } else {
      new_slug = slug(`${title} ${++post_count}`);
    }
  }

  return new_slug;
};

export const create_post = async (data:create_type_post) =>{
    return await prisma.post.create({data})
}

export const update_Post = async (slug:string, data: Prisma.PostUpdateInput) =>{
    return await prisma.post.update({
        where:{slug},
        data
    })
}