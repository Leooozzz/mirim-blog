import { requireAdmin } from "@/actions/authAdmin";
import { GetPost } from "@/actions/getPosts";
import {
  GetPostCountDraft,
  GetPostCountPublished,
  GetViewsCount,
} from "@/actions/getQuantity";
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

import Link from "next/link";
import { DeletePostButton } from "@/components/admin/posts/deletePost";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil } from "lucide-react";

const Page = async () => {
  const userLog = await requireAdmin();

  const totalPosts = await GetPostCountPublished();
  const totalPostDraft = await GetPostCountDraft();
  const totalViews = await GetViewsCount();
  const posts = await GetPost(5);

  return (
    <main className="min-h-screen bg-muted/40 p-6">
      <div className="mx-auto max-w-7xl space-y-10">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Painel do Blog</h1>
          <p className="text-muted-foreground">Resumo das atividades do blog</p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-xl border bg-card p-6 shadow-sm transition hover:shadow-md">
            <h2 className="text-sm text-muted-foreground">Posts publicados</h2>
            <p className="mt-2 text-3xl font-bold">{totalPosts ?? 0}</p>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow-sm transition hover:shadow-md">
            <h2 className="text-sm text-muted-foreground">Rascunhos</h2>
            <p className="mt-2 text-3xl font-bold">{totalPostDraft ?? 0}</p>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow-sm transition hover:shadow-md">
            <h2 className="text-sm text-muted-foreground">Visualizações</h2>
            <p className="mt-2 text-3xl font-bold">{totalViews ?? 0}</p>
          </div>
        </section>

        <div className="bg-muted/40 ">
      <div className="">
        <Card className="shadow-lg border border-muted">
        <CardHeader className="flex flex-col gap-2 border-b pb-6">
            <CardTitle className="text-3xl font-bold">
              Posts mais recente
            </CardTitle>
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
                        post.status === "Publicado" ? "bg-blue-500/15 text-blue-600 dark:text-blue-400": "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400"
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

        <section className="space-y-4 ">
          <h2 className="text-xl font-semibold">Ações rápidas</h2>

          <div className="flex  gap-4">
            <Link href="/admin/criar-post">
              <Button size="lg" className="cursor-pointer">Criar novo post</Button>
            </Link>

            <Link href="/admin/listar-categorias">
              <Button size="lg" variant="secondary" className="cursor-pointer">
                Gerenciar categorias
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Page;
