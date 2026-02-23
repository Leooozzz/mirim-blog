import Link from "next/link";
import { GetPost } from "@/actions/getPosts";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DeletePostButton } from "./deletePost";
import { Pencil } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireAdmin } from "@/actions/authAdmin";

export const ListPosts = async () => {
  const posts = await GetPost();
  const userLog = await requireAdmin();

  return (
    <div className="min-h-screen bg-muted/40 p-6">
      <div className="mx-auto max-w-6xl">
        <Card className="shadow-lg border border-muted">
          <CardHeader className="flex flex-col gap-2 border-b pb-6">
            <CardTitle className="text-3xl font-bold">Posts do blog</CardTitle>
            <p className="text-sm text-muted-foreground">
              Gerencie os posts do blog
            </p>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Título</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Criado em</TableHead>
                    <TableHead>Autor</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {posts.map((post) => (
                    <TableRow
                      key={post.id}
                      className="hover:bg-muted/40 transition-colors"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-11 w-11 overflow-hidden rounded-lg border bg-muted">
                            <img
                              src={post.cover}
                              alt={post.title}
                              className="h-full w-full object-cover"
                            />
                          </div>

                          <Link
                            href={`/admin/post/${post.slug}`}
                            className="font-medium hover:underline line-clamp-1"
                          >
                            {post.title}
                          </Link>
                        </div>
                      </TableCell>

                      <TableCell>
                        {" "}
                        <Badge
                          variant="secondary"
                          className={
                            post.status === "Publicado"
                              ? "bg-blue-500/15 text-blue-600 dark:text-blue-400"
                              : "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400"
                          }
                        >
                          {" "}
                          {post.status}{" "}
                        </Badge>{" "}
                      </TableCell>

                      <TableCell className="text-muted-foreground">
                        {new Date(post.createdAt).toLocaleDateString("pt-BR")}
                      </TableCell>

                      <TableCell>
                        <span className="font-medium">{post.authorName}</span>
                      </TableCell>

                      <TableCell>
                        <span className="rounded-md bg-blue-500/10 px-2 py-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                          {post.category || "Sem categoria"}
                        </span>
                      </TableCell>

                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Link href={`/admin/post/edit/${post.slug}`}>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="flex items-center gap-1 cursor-pointer"
                            >
                              <Pencil size={16} />
                              Editar
                            </Button>
                          </Link>
                          {userLog.role !== "EDITOR" && (
                            <DeletePostButton slug={post.slug} />
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}

                  {posts.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="py-20 text-center text-sm text-muted-foreground"
                      >
                        Nenhum post encontrado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
