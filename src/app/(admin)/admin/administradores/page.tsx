import { ListAdmin } from "@/actions/listAdmin";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";

export const Page = async () => {
  const admins = await ListAdmin();

  return (
    <main className="min-h-screen bg-muted/40 p-6">
      <div className="max-w-6xl mx-auto">
        <Card className="shadow-lg border border-muted">
          <CardHeader className="flex flex-col gap-2 border-b pb-6">
            <CardTitle className="text-3xl font-bold">
              Administradores
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Gerencie os administradores do painel
            </p>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Criado em</TableHead>
                    <TableHead>Cargo</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {admins.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-10 text-muted-foreground"
                      >
                        Nenhum administrador encontrado.
                      </TableCell>
                    </TableRow>
                  ) : (
                    admins.map((admin) => (
                      <TableRow
                        key={admin.id}
                        className="hover:bg-muted/40 transition-colors"
                      >
                        <TableCell className="font-medium">
                          {admin.name}
                        </TableCell>

                        <TableCell className="text-muted-foreground">
                          {admin.email}
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant={admin.status ? "default" : "destructive"}
                          >
                            {admin.status ? "Ativo" : "Inativo"}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          {new Date(admin.createdAt).toLocaleDateString(
                            "pt-BR"
                          )}
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant={
                              admin.role === "ADMIN"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {admin.role}
                          </Badge>
                        </TableCell>

                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="secondary"
                              className="flex items-center gap-1"
                            >
                              <Pencil size={16} />
                              Editar
                            </Button>

                            <Button
                              size="sm"
                              variant="destructive"
                              className="flex items-center gap-1"
                            >
                              <Trash2 size={16} />
                              Excluir
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Page;
