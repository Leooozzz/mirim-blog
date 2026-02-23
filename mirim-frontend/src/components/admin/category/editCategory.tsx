"use client"

import { EditCategory } from "@/actions/editCategory";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

import { ErrorStructure } from "@/schemas/categorySchema";
import { EditCategoryFormData } from "@/types/category";
import { useEffect, useState, useTransition } from "react";
import { GetCategory } from "@/actions/getCategoryById";
import { redirect } from "next/navigation";

type Props = {
  id: number;
};

const INITIAL_FORM: EditCategoryFormData = {
  name: "",
};

export const EditCategoryComponent = ({ id }: Props) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState<ErrorStructure>({});
  const [pending, startTransition] = useTransition();

 useEffect(() => {
  if (!id) return;

  const fetchCategory = async () => {
    try {
      const data = await GetCategory(id);

      setForm({
        name: data.name,
      });
    } catch (error) {
      console.error(error);
    }
  };

  fetchCategory();
}, [id]);

  const handleSubmit = async () => {
    startTransition(async () => {
      const result = await EditCategory({
        id,
        name: form.name,
      });

      if (result.error) {
        alert(result.error);
      } else {
        redirect('/admin/listar-categorias')
      }
    });
  };

 return (
  <div className="flex items-center justify-center min-h-[60vh] px-4">
    <div className="w-full max-w-md bg-card border rounded-xl shadow-sm p-6 space-y-6">
      
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">
          Editar Categoria
        </h2>
        <p className="text-sm text-muted-foreground">
          Atualize o nome da categoria abaixo.
        </p>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="space-y-4"
      >
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Nome da categoria
          </label>

          <Input
            type="text"
            placeholder="Digite o novo nome"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="h-10"
          />

          {errors.name && (
            <span className="text-red-500 text-xs">
              {errors.name}
            </span>
          )}
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              className="w-full mt-2"
              disabled={pending}
            >
              Editar Categoria
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Confirmar edição?
              </AlertDialogTitle>
              <AlertDialogDescription>
                A categoria será atualizada imediatamente.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel disabled={pending}>
                Cancelar
              </AlertDialogCancel>

              <AlertDialogAction
                type="button"
                disabled={pending}
                onClick={handleSubmit}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {pending ? "Editando..." : "Confirmar edição"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </div>
  </div>
);

};
