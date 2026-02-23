"use server"

import { api } from "@/lib/api"
import { LoginData} from "@/types/login"

export const login=async({email,password}:LoginData):Promise<{error:string|null,token?:string,role?:string}>=>{
    try{
        const response=await api.post('/auth/singin',{email,password})
        if(response.status === 200 && response.data.token){
            return{
                error:null,
                role:response.data.role,
                token:response.data.token 
            }
        }
    }catch{

    }
    return{error:"Erro ao efetuar login"}

}