import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { GetPostsSlugRelated } from "@/actions/getPostSlugRelated";

type Props = {
  slug: string;
};

export const RelatedPostsBySlug = async ({ slug }: Props) => {
  const posts = await GetPostsSlugRelated(slug);

  if (!posts || posts.length === 0) return null;
  const truncateText = (text: string, limit = 50) => {
    if (!text) return "";
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };


  return (
    <div>
    <h1 className="text-3xl mb-5 mt-5">Posts relacionados</h1>
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="
            group overflow-hidden border
            transition-all duration-300
            hover:-translate-y-1 hover:shadow-lg
            dark:border-gray-800 dark:bg-gray-950
          "
        >
          <CardContent className="p-0">
       
            {post.cover && (
              <div className="overflow-hidden">
                <img
                  src={post.cover}
                  alt={post.title}
                  loading="lazy"
                  className="
                    h-40 w-full object-cover
                    transition-transform duration-300
                    group-hover:scale-105
                  "
                />
              </div>
            )}

            <div className="p-4 space-y-3">
              <h3 className="text-base font-semibold leading-snug line-clamp-2 text-foreground">
                {post.title}
              </h3>
              <p className="text-gray-500">{truncateText(post.body, 40)}{" "}
              <span className="text-blue-600 dark:text-blue-500 font-medium">
               <Link href={`/posts/${post.slug}`}>Leia mais</Link> 
              </span>
              </p>
              <Link
                href={`/posts/${post.slug}`}
                className="
                  inline-flex items-center gap-1
                  text-sm font-medium text-blue-600
                  hover:text-blue-700 hover:underline
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
    </div>
  );
};
