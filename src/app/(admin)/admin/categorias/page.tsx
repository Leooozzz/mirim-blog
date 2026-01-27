"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CreateCategoryPage() {
  return (
    <main className="pt-10 flex justify-center items-center">
      <div className="w-full max-w-md bg-white dark:bg-blue-950 p-8 rounded-lg shadow-md space-y-6">

        <h2 className="text-2xl font-bold text-center">
          Criar Categoria
        </h2>

        <form className="space-y-4">
          
          <div>
            <label className="block mb-1 font-medium">
              Nome da categoria
            </label>
            <Input placeholder="Ex: Tecnologia" />
          </div>

          {/* Botão */}
          <Button className="w-full">
            Salvar Categoria
          </Button>
        </form>
      </div>
    </main>
  )
}