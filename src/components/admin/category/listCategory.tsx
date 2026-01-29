import { GetCategories } from "@/actions/getCategory";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteCategoryButton } from "./deleteCategory";

export const ListCategory = async () => {
  const categories = await GetCategories();

  return (
    <div className="w-full max-w-3xl space-y-6 rounded-xl border bg-card p-6 shadow-sm">
      <header className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">
          Categorias
        </h2>
        <p className="text-sm text-muted-foreground">
          Gerencie as categorias do blog
        </p>
      </header>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories.map((cat) => (
            <TableRow key={cat.id}>
              <TableCell className="text-muted-foreground">
                {cat.id}
              </TableCell>

              <TableCell className="font-medium">
                {cat.name}
              </TableCell>

              <TableCell>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>

                  <DeleteCategoryButton id={cat.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}

          {categories.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={3}
                className="py-10 text-center text-sm text-muted-foreground"
              >
                Nenhuma categoria cadastrada.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};