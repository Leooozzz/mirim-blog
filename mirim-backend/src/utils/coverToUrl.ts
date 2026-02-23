export const CoverToUrl =(CoverName:string)=>{
    return CoverName ? `${process.env.BASE_URL}/images/covers/${CoverName}` : ''
}