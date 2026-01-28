import { GetPost } from "@/actions/getPosts";
import { Button } from "../ui/button";
import { deletePost } from "@/actions/deletePost";
import { DeletePostButton } from "./deletePost";

export const ListPosts = async () => {
    const Posts = await GetPost();
    
  return (
    <div className="mx-auto max-w-7xl p-6">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Posts do Blog</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie seus posts publicados e rascunhos
          </p>
        </div>
      </header>

      <div className="rounded-xl border bg-card shadow-sm overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/40">
            <tr>
              <th className="px-6 py-4 text-left font-medium text-muted-foreground">
                Título
              </th>
              <th className="px-6 py-4 text-left font-medium text-muted-foreground">
                Status
              </th>
              <th className="px-6 py-4 text-left font-medium text-muted-foreground">
                Criado em
              </th>
              <th className="px-6 py-4 text-right font-medium text-muted-foreground">
                Ações
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {Posts.map((post) => (
              <tr key={post.id} className="transition-colors hover:bg-muted/30">
                <td className="px-6 py-4 font-medium">{post.title}</td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                      post.status === "Publicado"
                        ? "bg-blue-500/15 text-blue-600 dark:text-blue-400"
                        : "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400"
                    }`}
                  >
                    {post.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-muted-foreground">
                  {new Date(post.createAt).toLocaleDateString("pt-BR")}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="secondary">
                      Editar
                    </Button>
                    <DeletePostButton slug={post.slug} />
                  </div>
                </td>
              </tr>
            ))}

            {Posts.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-16 text-center">
                  <p className="text-sm text-muted-foreground">
                    Nenhum post encontrado.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
