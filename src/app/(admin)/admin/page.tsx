import { requireAdmin } from "@/actions/authAdmin";
import { GetPost } from "@/actions/getPosts";
import {
  GetPostCountDraft,
  GetPostCountPublished,
  GetViewsCount,
} from "@/actions/getQuantityPosts";
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

const Page = async () => {
  await requireAdmin();

  const totalPosts = await GetPostCountPublished();
  const totalPostDraft = await GetPostCountDraft();
  const totalViews = await GetViewsCount();
  const posts = await GetPost(3);

  return (
    <main className="p-8 min-h-screen bg-background text-foreground ">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Painel do Blog</h1>
        <p className="text-muted-foreground">Resumo das atividades do blog</p>
      </header>

    
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ">
        <div className="bg-card text-card-foreground p-6 rounded-lg border shadow-sm">
          <h2 className="text-sm text-muted-foreground">Posts publicados</h2>
          <p className="text-2xl font-bold">{totalPosts ?? 0}</p>
        </div>

        <div className="bg-card text-card-foreground p-6 rounded-lg border shadow-sm">
          <h2 className="text-sm text-muted-foreground">Rascunhos</h2>
          <p className="text-2xl font-bold">{totalPostDraft ?? 0}</p>
        </div>

        <div className="bg-card text-card-foreground p-6 rounded-lg border shadow-sm">
          <h2 className="text-sm text-muted-foreground">Visualizações</h2>
          <p className="text-2xl font-bold">{totalViews ?? 0}</p>
        </div>
      </section>

      <section className="mb-8 ">
        <h2 className="text-xl font-semibold mb-4">Posts recentes</h2>
        <div className="rounded-xl border bg-card shadow-sm">
          <Table className="">
            <TableHeader>
              <TableRow>
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
                <TableRow key={post.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 overflow-hidden rounded-md border ">
                        <img
                          src={post.cover}
                          alt={post.title}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <Link
                        href={`/admin/post/${post.slug}`} 
                        className="font-medium hover:underline"
                      >
                        {post.title}
                      </Link>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        post.status === "Publicado"
                          ? "bg-blue-500/15 text-blue-600 dark:text-blue-400"
                          : "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400"
                      }
                    >
                      {post.status}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {new Date(post.createdAt).toLocaleDateString("pt-BR")}
                  </TableCell>

                  <TableCell>
                    <span className="font-medium">{post.authorName}</span>
                  </TableCell>

                  <TableCell>
                    <span className="font-medium text-blue-500">
                      {post.category}
                    </span>
                  </TableCell>

                  <TableCell>
                    <div className="flex justify-end gap-2">
                      
                      <Link href={`/admin/post/edit/${post.slug}`}>
                        <Button size="sm" variant="secondary" className="cursor-pointer">
                          Editar
                        </Button>
                      </Link>

                   
                      <DeletePostButton slug={post.slug} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {posts.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-16 text-center text-sm text-muted-foreground"
                  >
                    Nenhum post encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Ações rápidas</h2>

        <div className="flex gap-4 flex-wrap">
          <Button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            <Link href={"/admin/criar-post"}>Criar novo post</Link>
          </Button>
          <Button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
            <Link href={"/admin/listar-categorias"}>Gerenciar categorias</Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Page;
