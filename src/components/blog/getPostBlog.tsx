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

  const truncateText = (text: string, limit = 80) => {
    if (!text) return "";
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Card key={post.id} className="relative dark:bg-gray-950">
          <div className="h-48 w-full">
            <img
              src={post.cover}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>

          <CardHeader>
            <Badge variant="secondary">{post.category}</Badge>
            <h2 className="text-lg font-semibold line-clamp-2">
              {post.title}
            </h2>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-gray-600">
              {truncateText(post.body)}
              <span className="text-blue-600 font-medium"> Leia mais</span>
            </p>
          </CardContent>

          <CardFooter className="flex justify-between text-sm text-gray-500">
            <span>{post.authorName}</span>
            <span>
              {new Date(post.createdAt).toLocaleDateString("pt-BR")}
            </span>
          </CardFooter>

          <Link href={`/posts/${post.slug}`} className="absolute inset-0" />
        </Card>
      ))}
    </div>
  );
};
