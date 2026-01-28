"use client";

import { CreateCategory } from "@/actions/createCategory";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategorySchema } from "@/schemas/categorySchema";
import { ChangeEvent, FormEvent, useState, useTransition } from "react";

type ErrorStructure = {
  name?: string;
  form?: string;
};
export default function CreateCategoryPage() {
  const [form, setForm] = useState({ name: "" });
  const [error, setError] = useState<ErrorStructure>({});
  const [pending, startTransition] = useTransition();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
    setError((error) => ({
      ...error,
      [e.target.name]: undefined,
      form: undefined,
    }));
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
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
      setForm({ name: "" })
    });
  };

  return (
    <main className="pt-10 flex justify-center items-center">
      <div className="w-full max-w-md bg-white dark:bg-blue-950 p-8 rounded-lg shadow-md space-y-6">
        <h2 className="text-2xl font-bold text-center">Criar Categoria</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <Button className="w-full" disabled={pending}>
            {pending ? "Salvando..." : "Salvar Categoria"}
          </Button>
        </form>
      </div>
    </main>
  );
}
