"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GetCategories } from "@/actions/getCategory";
import { HoverMotion } from "../animate/hoverMotion";

export const ListCategoryBlog = () => {
  const [categories, setCategories] = useState<{ id: number | string; name: string }[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await GetCategories();
      setCategories([{ id: "all", name: "Todos" }, ...data]);
    };
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-wrap gap-3 mt-2 mb-2 max-w-7xl mx-auto items-center">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={cat.id === "all" ? "/Blog" : `/Blog/${cat.id}`}
          className="px-5 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition"
        >
          <HoverMotion>{cat.name}</HoverMotion>
        </Link>
      ))}

      {categories.length === 0 && (
        <p className="text-sm text-muted-foreground">Nenhuma categoria encontrada.</p>
      )}
    </div>
  );
};