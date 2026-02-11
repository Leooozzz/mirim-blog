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

export const Page = async () => {
  const admins = await ListAdmin();

  return (
    <main className="p-8 min-h-screen">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Administradores</CardTitle>
          <p className="text-sm text-muted-foreground">
            Gerencie os administradores do painel
          </p>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {admins.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Nenhum administrador encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                admins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell className="font-medium">
                      {admin.name}
                    </TableCell>

                    <TableCell>{admin.email}</TableCell>

                    <TableCell>
                      <Badge>
                        {admin.status}
                      </Badge>
                    </TableCell>

                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
};

export default Page;
