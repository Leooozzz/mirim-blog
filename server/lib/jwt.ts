import jwt from 'jsonwebtoken'

export const create_jsonwebtoken = (payload:any)=>{
    return jwt.sign(
        payload,
        process.env.JSONWEBTOKEN_SECRET as string
    )
}
export const read_jsonwebtoken = (hash:string) => {
    try{
        return jwt.verify(
            hash,
            process.env.JSONWEBTOKEN_SECRET as string
        )
    }catch(err){
        return false
    }
}