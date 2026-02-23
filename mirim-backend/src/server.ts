import express, { NextFunction, Request, Response, urlencoded } from "express";
import cors from "cors";
import helmet from "helmet";
import { configDotenv } from "dotenv";
import { AuthRoutes } from "./auth/auth.routes";
import CategoryRoutes from "./category/category.routes";
import AuxRoutes from "./admin/routes/admin.aux.routes";
import PostRoutes from "./post/post.routes";
import AdminPostRoutes from "./admin/routes/admin.post.routes";
import AdminEditor from "./admin/routes/admin.editor";

configDotenv()

const server = express();

server.use(cors());
server.use(helmet());
server.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);
server.use(express.static("public"));
server.use(express.json());

server.use("/posts", PostRoutes);
server.use("/auth", AuthRoutes);

server.use("/admin/category", CategoryRoutes);
server.use("/admin", AdminPostRoutes);
server.use("/admin", AuxRoutes);
server.use("/admin", AdminEditor);

server.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Ocorreu algum erro" });
});

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
