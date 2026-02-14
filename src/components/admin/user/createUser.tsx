"use client"

import { CreateUser } from "@/actions/createUser"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CreateUserSchema, ErrorStructure } from "@/schemas/createUserSchema"
import { redirect } from "next/navigation"
import { ChangeEvent, useState, useTransition } from "react"

export const CreateUserForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [error, setError] = useState<ErrorStructure>({})
  const [pending, startTransition] = useTransition()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))

    setError((prev) => ({
      ...prev,
      [e.target.name]: undefined,
      form: undefined,
    }))
  }

  const handleSubmit = async () => {
    const result = CreateUserSchema.safeParse(form)

    if (!result.success) {
      const fieldError: any = {}
      result.error.issues.forEach((err) => {
        const field = err.path[0] as string
        if (field) fieldError[field] = err.message
      })
      setError(fieldError)
      return
    }

    setError({})

    startTransition(async () => {
      const res = await CreateUser(form)
      if (res?.error) {
        setError({ form: res.error })
      } else {
        redirect("/admin/administradores")
      }
    })
  }

  return (
    <div className="p-8 border border-gray-200 rounded-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Criar novo Usuário
      </h2>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block">Nome</label>
          <Input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled={pending}
          />
          {error.name && (
            <div className="text-red-500 text-sm mt-1">{error.name}</div>
          )}
        </div>

        <div>
          <label className="mb-1 block">E-mail</label>
          <Input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            disabled={pending}
          />
          {error.email && (
            <div className="text-red-500 text-sm mt-1">{error.email}</div>
          )}
        </div>

        <div>
          <label className="mb-1 block">Senha</label>
          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            disabled={pending}
          />
          {error.password && (
            <div className="text-red-500 text-sm mt-1">{error.password}</div>
          )}
        </div>

        <div>
          <label className="mb-1 block">Confirmar senha</label>
          <Input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            disabled={pending}
          />
          {error.confirmPassword && (
            <div className="text-red-500 text-sm mt-1">
              {error.confirmPassword}
            </div>
          )}
        </div>

        {error.form && (
          <div className="text-red-500 text-sm mb-3">{error.form}</div>
        )}
      </div>

      
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="w-full mt-6" disabled={pending}>
            {pending ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar criação</AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a criar um novo Editor. Deseja continuar?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={pending}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSubmit}
              disabled={pending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {pending ? "Criando..." : "Confirmar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}