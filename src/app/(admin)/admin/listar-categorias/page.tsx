"use client"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function ListCategoriesPage() {
  // dados fake só para layout
  const categories = [
    { id: 1, name: "Tecnologia" },
    { id: 2, name: "Design" },
    { id: 3, name: "Programação" },
  ]

  return (
    <main className="flex justify-center items-start pt-20">
      <div className="w-full max-w-3xl bg-white dark:bg-blue-950 p-8 rounded-lg shadow-md space-y-6">

        <h2 className="text-2xl font-bold">
          Categorias
        </h2>

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
                <TableCell className="font-medium">
                  {cat.name}
                </TableCell>
                <TableCell className="text-right space-x-2">

                  {/* Botões de ação */}
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>

                  <Button variant="destructive" size="sm">
                    Excluir
                  </Button>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </div>
    </main>
  )
}