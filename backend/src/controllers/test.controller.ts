import { Request,Response,NextFunction } from "express";

export const send=async(req:Request,res:Response)=>{
    const data=[
        {
            name:'iPhone 17 Pro',
            price:1070,
            store:'Amazon'
        },
        {
            name:'iPhone 17 Pro',
            price:1070,
            store:'MediaMarket'
        }
    ]
    res.json(data)
}