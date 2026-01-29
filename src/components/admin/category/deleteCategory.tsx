"use client";


import { deleteCategory } from "@/actions/deleteCategory";
import { Button } from "../../ui/button";
import { useTransition } from "react";

type Props = {
  id: Number;
};

export function DeleteCategoryButton({ id }: Props) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      await deleteCategory({ id });
    });
  }

  return (
    <Button
      size="sm"
      variant="destructive"
      onClick={handleDelete}
      disabled={isPending}
    >
      {isPending ? "Excluindo..." : "Excluir"}
    </Button>
  );
}
