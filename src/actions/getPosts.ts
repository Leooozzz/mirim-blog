"use server"
import { api } from "@/lib/api";
import { get_post_type } from "@/types/get.posts";

export const get_published_post = async(token:string):Promise<get_post_type[]> => {
    try{
        const response = await api.get('/admin/post',{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        if(response.status === 200){
            return response.data as get_post_type []
        }
    }catch(err){
        console.error("Erro ao buscar posts:", err);
    }
    return []
}