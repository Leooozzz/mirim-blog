import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { GetPostsSlugRelated } from "@/actions/getPostSlugRelated";

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

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="
              group overflow-hidden
              border border-gray-200 dark:border-gray-800
              bg-white dark:bg-gray-950
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-lg p-1
            "
          >
            <CardContent className="p-0 flex flex-col h-full">
          
              {post.cover && (
                <div className="relative overflow-hidden">
                  <img
                    src={post.cover}
                    alt={post.title}
                    loading="lazy"
                    className="
                      aspect-3/2 w-full object-cover
                      transition-transform duration-500
                      group-hover:scale-105 rounded-md
                    "
                  />
                </div>
              )}

        
              <div className="flex flex-col justify-between p-4 gap-3 flex-1">
                <div className="space-y-2">
                  <h3 className="text-base font-semibold leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {truncateText(post.body)}
                  </p>
                </div>

                <Link
                  href={`/posts/${post.slug}`}
                  className="
                    mt-2 inline-flex items-center gap-1
                    text-sm font-medium text-blue-600
                    hover:text-blue-700
                    dark:text-blue-400 dark:hover:text-blue-300
                  "
                >
                  Ler post
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
