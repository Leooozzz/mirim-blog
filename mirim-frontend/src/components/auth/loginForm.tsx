"use client";

import { ChangeEvent, FormEvent, useState, useTransition } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { login_schema } from "@/schemas/loginSchema";
import { login } from "@/actions/login";
import { setAuthCookies } from "@/actions/setAuthCookie";
import { useAuthStore } from "@/app/store/auth";
import { redirect } from "next/navigation";


type ErrorStructure = {
  email?: string;
  password?: string;
  form?: string;
};
export const LoginForm = () => {
    const [form,setForm]=useState({email:'',password:''})
    const [error,setError]=useState<ErrorStructure>({});
    const [pending,startTransition]=useTransition()
    const authStore=useAuthStore(state=>state)



    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
        setForm(form=>({...form,[e.target.name]:e.target.value}))
        setError(error=>({...error,[e.target.name]:undefined,form:undefined}))
    }

    const handleSubmit=(e:FormEvent)=>{
        e.preventDefault()
        const result=login_schema.safeParse(form)
        if(!result.success){
            const fieldError:any={}
            result.error.issues.forEach(err=>{
                if(err.path[0]){
                        
                }
            })
            setError(fieldError)
            return
        }
        setError({})
        startTransition(async()=>{
            const res= await login(form)
            if(res.error){
                setError({form: res.error})

            }else if(res.token){
                await setAuthCookies(res.token)
                authStore.setToken(res.token)
                redirect('/admin')
            }
        })
    }
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-blue-950 p-8 rounded-lg shadow-md w-full max-w-md mb-28 mt-28 "
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Login
      </h2>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block mb-1 text-gray-700 dark:text-gray-200"
        >
          E-mail
        </label>
        <Input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          autoFocus
          placeholder="Digite seu e-mail"
          className="w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={pending}
        />
        {error.email && (
          <div className="text-red-500 text-sm mt-1">{error.email}</div>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="password"
          className="block mb-1 text-gray-700 dark:text-gray-200"
        >
          Senha
        </label>
        <Input
          id="password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Digite sua senha"
          className="w-full p-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={pending}
        />
        {error.password && (
          <div className="text-red-500 text-sm mt-1">{error.password}</div>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition"
        disabled={pending}
      >
        {pending ? "Entrando..." : "Entrar"}
      </Button>
      {error.form && (
        <div className="text-red-500 text-sm mt-1">{error.form}</div>
      )}
    </form>
  );
};
