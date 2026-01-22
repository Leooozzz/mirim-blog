export const cover_to_url =(cover_name:string)=>{
    return cover_name ? `${process.env.BASE_URL}/images/covers/${cover_name}` : ''
}