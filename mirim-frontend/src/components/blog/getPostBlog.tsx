"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GetPosts } from "@/actions/getPostHome";
import { Card } from "@/components/ui/card";
import { CalendarDays, TagIcon } from "lucide-react";

export const GetPostBlog = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await GetPosts();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const truncateText = (text: string, limit = 90) => {
    if (!text) return "";
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl p-0">
          <div className="h-60 w-full overflow-hidden">
            <img src={post.cover} alt={post.title} className="h-full w-full object-fill" />
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1 text-blue-500 font-medium">
                <TagIcon size={16} />
                {post.category}
              </span>

              <span className="flex items-center gap-1">
                <CalendarDays size={16} />
                {new Date(post.createdAt).toLocaleDateString("pt-BR")}
              </span>
            </div>

            <h2 className="text-xl font-semibold text-blue-600 hover:text-blue-700 transition">
              {post.title}
            </h2>

            <p className="text-gray-600 text-sm">{truncateText(post.body, 120)}</p>

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
  );
};