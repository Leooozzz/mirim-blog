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
import { requireAdmin } from "@/actions/authAdmin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Pencil } from "lucide-react";



export const ListCategory = async () => {
  const userLog = await requireAdmin()
  const categories = await GetCategories();

  return (
    <div className="min-h-screen bg-muted/40 p-6">
      <div className="mx-auto max-w-6xl">
        <Card className="shadow-lg border border-muted">
        <CardHeader className="flex flex-col gap-2 border-b pb-6">
            <CardTitle className="text-3xl font-bold">
              Categorias do blog
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Gerencie as categorias do blog
            </p>
          </CardHeader>

        <CardContent className="pt-6">
         <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Título</TableHead>
                <TableHead>Criado em</TableHead>
                <TableHead>Autor</TableHead>
                
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {categories.map((cat) => (
                <TableRow
                  key={cat.id}
                  className="hover:bg-muted/40 transition-colors"
                >
                  <TableCell>
                    <div className="font-medium hover:underline line-clamp-1">
                        {cat.name}
                    </div>
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {new Date(cat.createdAt).toLocaleDateString("pt-BR")}
                  </TableCell>

                  <TableCell>
                    <span className="font-medium">{cat.author.name}</span>
                  </TableCell>

                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/categorias/edit/${cat.id}`}>
                        <Button
                         size="sm"
                          variant="secondary"
                          className="flex items-center gap-1 cursor-pointer"
                        >
                           <Pencil size={16} />
                          Editar
                        </Button>
                      </Link>
                      {userLog.role !== "EDITOR" && (
                      <DeleteCategoryButton id={cat.id} />
                      )} 
                      </div>
                  </TableCell>
                </TableRow>
              ))}

              {categories.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-20 text-center text-sm text-muted-foreground"
                  >
                    Nenhuma categoria encontrada.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          </div>
        </CardContent>
        </Card>
      </div>
    </div>
  );
};