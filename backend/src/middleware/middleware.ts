import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken'

const JWT_SECRET=process.env.JWT_SECRET

export const middleware=(req:Request,res:Response,next:NextFunction)=>{
    try{
        const authHeader=req.headers.authorization
        const token=authHeader?.split(' ')[1]

        if(!token)return res.status(401).json({error:'требуется авторизация'})

        const decoded=jwt.verify(token,JWT_SECRET as string) as {id:string,email:string}; (req as any).user=decoded
        next()
    }catch(error){
        return res.status(401).json({error:'неверный пароль'})
        console.error(error)
    }
}