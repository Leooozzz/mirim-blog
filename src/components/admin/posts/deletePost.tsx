"use client";

import { deletePost } from "@/actions/deletePost";
import { Button } from "../../ui/button";
import { useTransition } from "react";

type Props = {
  slug: string;
};

export function DeletePostButton({ slug }: Props) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      await deletePost({ slug });
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
