import { Request,Response } from "express";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../prisma'

const JWT_SECRET=process.env.JWT_SECRET||''

export const register=async(req:Request,res:Response)=>{
    try{
        const {email,name,password}=req.body

        if(!email||!password||!name)return res.status(400).json({error:'email name and password required'})

        const existing=await prisma.user.findUnique({where:{email}})
        if(existing)return res.status(400).json({error:'user already exists'})
        
        const hashedPassword=await bcrypt.hash(password,10)
        const user=await prisma.user.create({
            data:{
                email,password:hashedPassword,name:name
            }
        })

        const token=jwt.sign(
            {id:user.id,email:user.email},JWT_SECRET,{expiresIn:'7d'}
        )

        res.status(201).json({
            user:{
                id:user.id,
                name:user.name,
                email:user.email
            },
            token
        })
    }catch(error){
        console.log(error)
        res.status(500).json({error:'ошибка регистрации'})
    }
}

export const login=async(req:Request,res:Response)=>{
    try{
        const {email,password}=req.body

        if(!email||!password)return res.status(400).json({error:'email and password required'})
        
        const user=await prisma.user.findUnique({where:{email}})
        if(!user)return res.status(400).json({error:'email and password invalid'})

        const isValid=await bcrypt.compare(password,user.password)
        if(!isValid)return res.status(400).json({error:'password is incorrect'})

        const token=jwt.sign(
            {id:user.id,email:user.email},JWT_SECRET,{expiresIn:'7d'}
        )
        res.json({
            user:{
                id:user.id,
                email:user.email,
                name:user.name
            },token
        })
    }catch(error){
        console.log(error)
        res.status(500).json({error:'ошибка регистрации'})
    }
}