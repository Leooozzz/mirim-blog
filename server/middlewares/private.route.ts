import { NextFunction, Request, Response } from "express";
import { verify_request } from "../services/auth.service";
import { extended_request } from "../types/extends.request";

export const private_route = async (req:extended_request,res:Response,next:NextFunction) =>{
    const user = await verify_request(req);
    if(!user){
        return res.status(401).json({errot: "Acess denied"})
    }
    req.user = user;

    next();
}