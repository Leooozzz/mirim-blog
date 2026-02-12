"use client";
import { CreateCategory } from "@/actions/createCategory";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategorySchema } from "@/schemas/categorySchema";
import { ChangeEvent, FormEvent, useState, useTransition } from "react";

type ErrorStructure = {
  name?: string;
  form?: string;
};
export const CreateCategoryForm = () => {
  const [form, setForm] = useState({ name: "" });
  const [error, setError] = useState<ErrorStructure>({});
  const [pending, startTransition] = useTransition();
  const [open,setOpen] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
    setError((error) => ({
      ...error,
      [e.target.name]: undefined,
      form: undefined,
    }));
  };
  const handleSubmit = () => {
    const result = CategorySchema.safeParse(form);
    if (!result.success) {
      const fieldError: any = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
        }
      });
      setError(fieldError);
      return;
    }
    setError({});
    startTransition(async () => {
      const res = await CreateCategory(form);
      if (res.error) {
        setError({ form: res.error });
      }
      setForm({ name: "" });
    });
  };
  return (
    <div className="w-full mx-auto max-w-2xl rounded-xl border bg-background p-6 shadow-sm mt-10 mb-10">
      <h2 className="text-2xl font-bold text-center">Criar Categoria</h2>

      <form className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Nome da categoria</label>

          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Ex: Tecnologia"
          />

          {error.name && <p className="text-sm text-red-500">{error.name}</p>}
        </div>

        {error.form && (
          <p className="text-sm text-red-500 text-center">{error.form}</p>
        )}

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              className="w-full gap-2 text-base cursor-pointer"
              disabled={pending}
            >
              Criar categoria
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Criar categoria?</AlertDialogTitle>
              <AlertDialogDescription>
                Quando criar um post a categoria ja estara disponivel.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel disabled={pending}>Cancelar</AlertDialogCancel>

              <AlertDialogAction
                type="submit"
                disabled={pending}
                onClick={() => {
                  setOpen(false);
                  handleSubmit();
                }}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {pending ? "Salvando..." : "Salvar categoria"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </div>
  );
};
