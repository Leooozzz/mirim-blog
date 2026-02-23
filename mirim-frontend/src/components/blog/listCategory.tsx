import { GetCategories } from "@/actions/getCategory";
import Link from "next/link";
import { HoverMotion } from "../animate/hoverMotion";

export const ListCategoryBlog = async () => {
  const categories = await GetCategories();
  const allCategories = [{ id: "all", name: "Todos" }, ...categories];

  return (
    <div className="flex flex-wrap gap-3 mt-2 mb-2 flex-end max-w-7xl mx-auto items-center">
      {allCategories.map((cat) => (
        <Link
          key={cat.id}
          href={cat.id === "all" ? "/Blog" : `/Blog/${cat.id}`}
          className="
            px-5 py-2
            rounded-full
            bg-gray-100
            text-gray-700
            text-sm
            font-medium
            hover:bg-gray-200
            transition
          "
        >
          <HoverMotion>
          {cat.name}
          </HoverMotion>
        </Link>
      ))}

      {allCategories.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Nenhuma categoria encontrada.
        </p>
      )}
    </div>
  );
};
