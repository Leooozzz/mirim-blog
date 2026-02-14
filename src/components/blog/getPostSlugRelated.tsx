import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { GetPostsSlugRelated } from "@/actions/getPostSlugRelated";
import { Badge } from "../ui/badge";

type Props = {
  slug: string;
};

export const RelatedPostsBySlug = async ({ slug }: Props) => {
  const posts = await GetPostsSlugRelated(slug);
  if (!posts || posts.length === 0) return null;

  const truncateText = (text: string, limit = 80) => {
    if (!text) return "";
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">
        Posts relacionados
      </h2>

       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="relative overflow-hidden bg-white border border-gray-200 
                     dark:bg-gray-950 dark:border-gray-800
                     hover:shadow-lg transition-shadow p-0"
        >
        
          <div className="relative h-48 w-full">
            <img
              src={post.cover}
              alt={post.title}
              className="h-full w-full object-fill"
            />
          </div>

       
          <CardHeader className="space-y-2">
            <Badge
              variant="secondary"
              className="w-fit bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
            >
              {post.category.name}
            </Badge>

            <h2 className="text-lg font-semibold leading-snug line-clamp-2 text-gray-900 dark:text-gray-100">
              {post.title}
            </h2>
          </CardHeader>

  
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {truncateText(post.body, 80)}{" "}
              <span className="text-blue-600 dark:text-blue-500 font-medium">
                Leia mais
              </span>
            </p>
          </CardContent>

         
          <CardFooter className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
            <span>{post.authorName}</span>
            <span>
              {new Date(post.createdAt).toLocaleDateString("pt-BR")}
            </span>
          </CardFooter>

         
          <Link
            href={`/posts/${post.slug}`}
            className="absolute inset-0"
            aria-label={`Ler post ${post.title}`}
          />
        </Card>
      ))}
    </div>
    </section>
  );
};
