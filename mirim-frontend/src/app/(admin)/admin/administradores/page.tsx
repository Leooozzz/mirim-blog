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
import { BadgePlus, Pencil, Trash2 } from "lucide-react";
import { DeleteUserButton } from "@/components/admin/user/deleteUser";
import { requireAdmin } from "@/actions/authAdmin";
import Link from "next/link";

export const Page = async () => {
  const userLog = await requireAdmin();
  const user = await ListAdmin();

  return (
    <main className="min-h-screen bg-muted/40 p-6">
      <div className="max-w-6xl mx-auto">
        <Card className="shadow-lg border border-muted">
          <CardHeader className="border-b pb-6">
            <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-between">
              <div className="text-center md:text-left">
                <CardTitle className="text-3xl font-bold">
                  Administradores
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Gerencie os administradores do painel
                </p>
              </div>
              {userLog.role !== "EDITOR" && (
                <Link href={`/admin/adicionar-usuario/`}>
              <Button className="cursor-pointer"><BadgePlus/> Adicionar Usuário</Button>
              </Link>
              )}
            </div>
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
                    {userLog.role !== "EDITOR" && (
                      <TableHead className="text-right">Ação</TableHead>
                    )}
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {user.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-10 text-muted-foreground"
                      >
                        Nenhum administrador encontrado.
                      </TableCell>
                    </TableRow>
                  ) : (
                    user.map((user) => (
                      <TableRow
                        key={user.id}
                        className="hover:bg-muted/40 transition-colors"
                      >
                        <TableCell className="font-medium">
                          {user.name}
                        </TableCell>

                        <TableCell className="text-muted-foreground">
                          {user.email}
                        </TableCell>

                        <TableCell>
                          <Badge variant={user.status ? "default" : "ghost"}>
                            {user.status ? "Ativo" : "Inativo"}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant={
                              user.role === "ADMIN" ? "default" : "secondary"
                            }
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                        {userLog.role !== "EDITOR" && (
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <DeleteUserButton id={user.id} />
                            </div>
                          </TableCell>
                        )}
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
