import Link from "next/link"
import { GetPostHome } from "@/actions/getPostHome"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const PostHomePage = async () => {
  const posts = await GetPostHome()

  const truncateText = (text: string, limit = 50) => {
    if (!text) return ""
    return text.length > limit ? text.slice(0, limit) + "..." : text
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="relative overflow-hidden bg-gray-800 border-gray-700 dark:bg-white dark:border-gray-200"
        >
      
          <div className="relative h-48 w-full">
            <img
              src={post.cover}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>

          <CardHeader className="space-y-2">
            <Badge variant="secondary" className="w-fit">
              {post.category}
            </Badge>

            <h2 className="text-lg font-semibold leading-snug text-white dark:text-gray-900 line-clamp-2">
              {post.title}
            </h2>
          </CardHeader>

       
          <CardContent>
            <p className="text-sm text-gray-300 dark:text-gray-600">
              {truncateText(post.body, 50)}{" "}
              <span className="text-blue-500 font-medium">Leia mais</span>
            </p>
          </CardContent>

          <CardFooter className="flex items-center justify-between text-sm text-gray-400 dark:text-gray-500">
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
  )
}
