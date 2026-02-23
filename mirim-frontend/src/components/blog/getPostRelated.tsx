import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { GetPostsSlugRelated } from "@/actions/getPostSlugRelated";

import { CalendarDays, TagIcon } from "lucide-react";

type Props = {
  slug: string;
};

export const RelatedPostsBySlug = async ({ slug }: Props) => {
  const posts = await GetPostsSlugRelated(slug,3);
  if (!posts || posts.length === 0) return null;

  const truncateText = (text: string, limit = 80) => {
    if (!text) return "";
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div className="max-w-2xl">
          <h2 className="mt-3 text-3xl md:text-4xl font-bold leading-tight">
            Posts relacionados
          </h2>
          <p className="mt-4 text-gray-600">
            Descubra mais conteúdos semelhantes
          </p>
          <div className="w-16 h-1 bg-blue-600 rounded-full mt-6" />
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl p-0">
            <div className="h-60 w-full overflow-hidden">
              <img
                src={post.cover}
                alt={post.title}
                className="h-full w-full object-fill"
              />
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1 text-blue-500 font-medium">
                  <TagIcon size={16} />
                  {post.category.name}
                </span>
                <span className="flex items-center gap-1">
                  <CalendarDays size={16} />
                  {new Date(post.createdAt).toLocaleDateString("pt-BR")}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-blue-600 hover:text-blue-700 transition">
                {post.title}
              </h2>
              <p className="text-gray-600 text-sm">
                {truncateText(post.body, 120)}
              </p>
              <Link
                href={`/posts/${post.slug}`}
                className="inline-flex items-center gap-2 text-blue-600 font-medium hover:gap-3 transition-all"
              >
                Ler mais →
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
