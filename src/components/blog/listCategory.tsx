import { GetCategories } from "@/actions/getCategory";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";


export const ListCategoryBlog = async () => {
  const categories = await GetCategories();

  return (
    <div className="w-full max-w-3xl space-y-6 rounded-xl border  p-6 shadow-sm mb-10 bg-white dark:bg-gray-900">
      <header className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">
          Categorias
        </h2>
      </header>
      <Table>
        <TableBody>
          {categories.map((cat) => (
            <TableRow key={cat.id}>
              <TableCell className="font-medium">
                <Link href={`/posts/category/${cat.name}`}>
                    {cat.name}
                </Link>
              </TableCell>
            </TableRow>
          ))}

          {categories.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={3}
                className="py-10 text-center text-sm text-muted-foreground"
              >
                Nenhuma categoria encontrada.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};