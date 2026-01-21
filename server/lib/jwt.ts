import jwt from 'jsonwebtoken'

export const create_jsonwebtoken = (payload:any)=>{
    return jwt.sign(
        payload,
        process.env.JSONWEBTOKEN_SECRET as string
    )
}