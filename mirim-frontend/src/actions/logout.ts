"use server"


import { clearServerAuthToken } from "@/lib/server.cookie"
import { redirect } from "next/navigation"

export const logout = async()=>{
    await clearServerAuthToken()
    redirect('/')
}