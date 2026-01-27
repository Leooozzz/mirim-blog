import { NextFunction, Request, Response } from "express";
import { verify_request } from "../services/authservice";
import { ExtendedRequest } from "../types/extendsRequest";


export const PrivateRoute = async (req:ExtendedRequest,res:Response,next:NextFunction) =>{
    const user = await verify_request(req);
    if(!user){
        return res.status(401).json({errot: "Acess denied"})
    }
    req.user = user;

    next();
}