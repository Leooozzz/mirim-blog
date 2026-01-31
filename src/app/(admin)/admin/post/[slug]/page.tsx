import { GetPostBySlug } from "@/actions/getPostBySlug";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = await GetPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-muted/40 py-10">
      <div className="mx-auto max-w-5xl px-4">
        <Card>
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge
                variant={post.status === "Publicado" ? "default" : "secondary"}
              >
                {post.status}
              </Badge>
             
           
           <div>
            <Link href="/admin/listar-post">
                <Button variant="ghost" size="sm">
                  ← Voltar
                </Button>
             </Link>   
           </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>
                {new Date(post.createdAt).toLocaleDateString("pt-BR")}
              </span>
              <span className="font-medium text-blue-500">
                {post.category}
              </span>
              {post.authorName && (
                <>
                  <Separator orientation="vertical" className="h-4" />
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>
                        {post.authorName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-foreground">
                      {post.authorName}
                    </span>
                  </div>
                </>
              )}
            </div>
          </CardHeader>

          <Separator />

          {post.cover && (
            <div className="px-6 pt-6">
              <div className="overflow-hidden rounded-xl border">
                <img
                  src={post.cover}
                  alt={post.title}
                  className="h-105 w-full object-cover"
                />
              </div>
            </div>
          )}

          <CardContent className="pt-8">
            <article className="flex flex-col gap-5">
              <h1 className="text-3xl font-bold tracking-tight">
                {post.title}
              </h1>
              {post.body}
            </article>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
