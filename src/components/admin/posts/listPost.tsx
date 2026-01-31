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

export const ListPosts = async () => {
  const posts = await GetPost();

  return (
    <div className="mx-auto max-w-6xl p-6">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Posts do Blog</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie seus posts publicados e rascunhos
          </p>
        </div>
      </header>

      <div className="rounded-xl border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead>Autor</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-md border shrink-0">
                      <img
                        src={post.cover}
                        alt={post.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <Link
                      href={`/admin/post/${post.slug}`}
                      className="font-medium line-clamp-2 hover:underline"
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

                <TableCell className="text-muted-foreground">
                  {new Date(post.createAt).toLocaleDateString("pt-BR")}
                </TableCell>

                <TableCell>
                  <span className="font-medium line-clamp-2">
                    {post.authorName}
                  </span>
                </TableCell>

                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/post/${post.slug}`}>
                      <Button size="sm" variant="secondary">
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
                  colSpan={5}
                  className="py-16 text-center text-sm text-muted-foreground"
                >
                  Nenhum post encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
