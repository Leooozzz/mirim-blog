import { v4 } from "uuid";
import fs from "fs/promises";
import slug from "slug";

import { CreateTypePost } from "./post.types";
import { prisma } from "../libs/prisma";
import { Prisma } from "../generated/prisma/client";

export const HandleFileCover = async (file: Express.Multer.File) => {
  try {
    const allowed = ["image/jpeg", "image/jpg", "image/png"];
    if (allowed.includes(file.mimetype)) {
      const cover_name = `${v4()}.jpg`;
      await fs.rename(file.path, `/app/public/images/covers/${cover_name}`);
      return cover_name;
    }
  } catch {
    return false;
  }
};
export const GetPostPublished = async () => {
  const posts = await prisma.post.findMany({
    where: {
      status: "PUBLISHED",
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
      author: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
};

export const GetAllPostService = async () => {
  const posts = await prisma.post.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
      author: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
};

export const GetPostBySlug = async (slug: string) => {
  return await prisma.post.findUnique({
    where: { slug },
    include: {
      category: {
        select: {
          name: true,
        },
      },
      author: {
        select: {
          name: true,
        },
      },
    },
  });
};
export const incrementProductView = async (id: number) => {
  await prisma.post.update({
    where: { id },
    data: {
      views: { increment: 1 },
    },
  });
};

export const CreatePostSlug = async (title: string) => {
  let new_slug = slug(title);
  let keep_trying = true;
  let post_count = 1;

  while (keep_trying) {
    const post = await GetPostBySlug(new_slug);
    if (!post) {
      keep_trying = false;
    } else {
      new_slug = slug(`${title} ${++post_count}`);
    }
  }

  return new_slug;
};

export const CreatePost = async (data: CreateTypePost) => {
  return await prisma.post.create({
    data,
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });
};

export const UpdatePost = async (
  slug: string,
  data: Prisma.PostUpdateInput,
) => {
  return await prisma.post.update({
    where: { slug },
    data,
  });
};
export const DeletePost = async (slug: string) => {
  return await prisma.post.delete({
    where: { slug },
  });
};

export const GetPostSameTags = async (slug: string) => {
  const post = await prisma.post.findUnique({
    where: { slug },
  });
  if (!post) return [];

  const tags = post.tags.split(",");
  if (tags.length === 0) return [];

  const posts = await prisma.post.findMany({
    where: {
      status: "PUBLISHED",
      slug: { not: slug },
      OR: tags.map((term) => ({
        tags: { contains: term, mode: "insensitive" },
      })),
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
      author: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
  });
  return posts;
};

export const GetNumberPost = async () => {
  const total = await prisma.post.count({
    where: {
      status: "PUBLISHED",
    },
  });
  return total;
};

export const GetNumberPostDraft = async () => {
  const total = await prisma.post.count({
    where: {
      status: "DRAFT",
    },
  });
  return total;
};
export const GetNumberPostViews = async () => {
  const total = await prisma.post.aggregate({
    _sum: {
      views: true,
    },
  });
  return total._sum ?? 0;
};

export const PostByCategory = async (categoryId: number) => {
  return prisma.post.findMany({
    where: {
      status: "PUBLISHED",
      categoryId,
    },
    select: {
      id: true,
      title: true,
      status: true,
      slug: true,
      cover: true,
      body: true,
      createdAt: true,
      author: {
        select: {
          name: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
