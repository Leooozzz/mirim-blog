import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Role, PostStatus } from "../src/generated/prisma/client";
import bcrypt from "bcrypt";
import { configDotenv } from "dotenv";

configDotenv()
const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({ adapter });


async function main() {
  console.log("🌱 Iniciando seed...");

  const hashedPassword = await bcrypt.hash("admin12345678", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@mirim.com" },
    update: {},
    create: {
      name: "Administrador",
      email: "admin@mirim.com",
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  const editor = await prisma.user.upsert({
    where: { email: "editor@mirim.com" },
    update: {},
    create: {
      name: "Editor",
      email: "editor@mirim.com",
      password: hashedPassword,
      role: Role.EDITOR,
    },
  });

  const category1 = await prisma.category.create({
    data: { name: "Tecnologia", authorId: admin.id },
  });

  const category2 = await prisma.category.create({
    data: { name: "Educação", authorId: admin.id },
  });

  await prisma.post.create({
    data: {
      slug: "primeiro-post",
      title: "Primeiro Post",
      body: "Conteúdo do primeiro post.",
      authorId: admin.id,
      categoryId: category1.id,
      status: PostStatus.PUBLISHED,
      cover: "eab455b1-2f01-433c-a3f8-0166ed158194.jpg",
      tags: "tech,dev",
    },
  });

  await prisma.post.create({
    data: {
      slug: "segundo-post",
      title: "Segundo Post",
      body: "Conteúdo do segundo post.",
      authorId: editor.id,
      categoryId: category2.id,
      status: PostStatus.PUBLISHED,
      cover: "1401fb21-d9b3-4d18-bf08-6b14693d8eca.jpg",
      tags: "educacao,blog",
    },
  });

  console.log("✅ Seed finalizada com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
