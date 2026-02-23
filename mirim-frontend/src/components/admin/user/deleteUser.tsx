"use client";

import { deleteCategory } from "@/actions/deleteCategory";
import { Button } from "../../ui/button";
import { useTransition } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { deleteUser } from "@/actions/deleteUser";

type Props = {
  id: number;
};

export function DeleteUserButton({ id }: Props) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(() => {
      deleteUser({ id }).catch(console.error);
      if(!deleteUser){
        
      }
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="destructive">
          Excluir
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir usuario</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. A usuario será removido
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            Cancelar
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isPending ? "Excluindo..." : "Confirmar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
