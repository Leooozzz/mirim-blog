import express, { NextFunction, Request, Response, urlencoded } from "express";
import cors from "cors";
import helmet from "helmet";
import { configDotenv } from "dotenv";
import { router } from "./routes/routes";
import {  PostRoutes } from "./routes/postRoutes";
import { AuthRoutes } from "./routes/authRoutes";
import CategoryRoutes from "./routes/adminCategoryRoutes";
import AdminPostRoutes from "./routes/adminPostRoutes";
import AuxRoutes from "./routes/adminAuxRoutes";

configDotenv();

const server = express();

server.use(cors());
server.use(helmet());
server.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
server.use(express.static("public"));
server.use(express.json());

server.use(router);


server.use('/posts',PostRoutes)
server.use('/auth',AuthRoutes)

server.use ('/admin/category',CategoryRoutes)
server.use('/admin',AdminPostRoutes)
server.use('/admin',AuxRoutes)


server.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Ocorreu algum erro" });
});

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
