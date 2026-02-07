"use server"

import { setServerAuthToken } from "@/lib/server.cookie"



export const setAuthCookies=async(token:string)=>{
    await setServerAuthToken (token)
}