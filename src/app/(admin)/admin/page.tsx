import { requireAdmin } from "@/actions/auth.admin";
import {
  get_post_count_draft,
  get_posts_count,
} from "@/actions/get.quantity.posts";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Page = async () => {
  await requireAdmin();

  const totalPosts = await get_posts_count();
  const total_post_draft = await get_post_count_draft();

  return (
    <main className="p-8 min-h-screen bg-background text-foreground">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Painel do Blog</h1>
        <p className="text-muted-foreground">Resumo das atividades do blog</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card text-card-foreground p-6 rounded-lg border shadow-sm">
          <h2 className="text-sm text-muted-foreground">Posts publicados</h2>
          <p className="text-2xl font-bold">{totalPosts ?? 0}</p>
        </div>

        <div className="bg-card text-card-foreground p-6 rounded-lg border shadow-sm">
          <h2 className="text-sm text-muted-foreground">Rascunhos</h2>
          <p className="text-2xl font-bold">{total_post_draft ?? 0}</p>
        </div>

        <div className="bg-card text-card-foreground p-6 rounded-lg border shadow-sm">
          <h2 className="text-sm text-muted-foreground">Visualizações</h2>
          <p className="text-2xl font-bold">3.456</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Posts recentes</h2>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Ações rápidas</h2>

        <div className="flex gap-4 flex-wrap">
          <Button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            <Link href={"/admin/criar-post"}>
              Criar novo post 
            </Link>
          </Button>
          <Button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
            Gerenciar categorias
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Page;
