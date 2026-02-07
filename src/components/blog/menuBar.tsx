import { GetCategories } from "@/actions/getCategory";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const MenuBar = async () => {
  const categories = await GetCategories();

  
  const allCategories = [{ id: "all", name: "Todos" }, ...categories];

  return (
    <div className="w-full max-w-3xl mb-10 p-3 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
    
      <div className="flex flex-wrap gap-3 justify-center">
        {allCategories.map((cat) => (
          <Link key={cat.id} href={cat.id === "all" ? "/Blog" : `/Blog/${cat.name}`}>
            <Button variant="outline" className="whitespace-nowrap">
              {cat.name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};
