import { GetPostBySlugUser } from "@/actions/getPostBySlug";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RelatedPostsBySlug } from "@/components/blog/getPostRelated";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = await GetPostBySlugUser(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-100 to-gray-200 py-12">
      <div className="mx-auto max-w-4xl px-4">
        <Card className="overflow-hidden border-gray-200  shadow-sm">
          <CardHeader className="space-y-6">
            <div className="flex items-center justify-between">
              <Badge
                variant={post.status === "Publicado" ? "default" : "secondary"}
                className="text-xs"
              >
                {post.status}
              </Badge>

              <Link href="/Blog">
                <Button variant="ghost" size="sm">
                  ← Voltar
                </Button>
              </Link>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span>
                  {new Date(post.createdAt).toLocaleDateString("pt-BR")}
                </span>

                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  {post.category}
                </span>

                {post.authorName && (
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback>
                        {post.authorName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-foreground">
                      {post.authorName}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>

          {post.cover && (
            <div className="px-6 mt-4 flex justify-center">
              <div className="relative w-full max-w-2xl overflow-hidden rounded-xl border">
                <img
                  src={post.cover}
                  alt={post.title}
                  className="aspect-3/4 w-full object-cover"
                />
              </div>
            </div>
          )}

          <CardContent className="pt-10">
            <article className="prose prose-gray dark:prose-invert max-w-none">
              {post.body}
            </article>
          </CardContent>
        </Card>

        <div className="mt-14">
          <RelatedPostsBySlug slug={slug} />
        </div>
      </div>
    </div>
  );
}
