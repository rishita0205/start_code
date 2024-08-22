import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server';
export const getDataFromToken =(req)=>{
    try{
        const token =req.cookies.get("token")?.value||"";
        const decodedToken=jwt.verify(token,process.env.JWT_SECRET_KEY)

        return decodedToken.id;
    }
    catch(err){
        throw new Error(err.message)
    }
}