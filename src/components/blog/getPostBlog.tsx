import Link from "next/link";
import { GetPosts } from "@/actions/getPostHome";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const GetPostBlog = async () => {
  const posts = await GetPosts();

  const truncateText = (text: string, limit = 90) => {
    if (!text) return "";
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  return (
       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="relative overflow-hidden bg-white border border-gray-200 
                     dark:bg-gray-950 dark:border-gray-800
                     hover:shadow-lg transition-shadow"
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
              {post.category}
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
  );
};
