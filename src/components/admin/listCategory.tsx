

import { GetCategories } from "@/actions/category";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { DeleteCategoryButton } from "./deleteCategory";

export const ListCategory = async () => {
    const categories = await GetCategories();

  return (
    <div className="w-full max-w-3xl bg-white dark:bg-blue-950 p-8 rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-bold">Categorias</h2>

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
              <TableCell>{cat.id}</TableCell>
              <TableCell className="font-medium">{cat.name}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm">
                  Editar
                </Button>

                <DeleteCategoryButton id={cat.id}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
