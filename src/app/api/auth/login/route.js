import { NextResponse } from "next/server";
import { createJWT,compareString } from "@/Utils";
import User from "@/models/userModel";
import dbConnection from "@/dbConfig/dbConfig";

dbConnection();
export async function POST(req) {
    const reqBody =await req.json();
    const { email, password } = reqBody;

    try{
        if(!email){
            return NextResponse.json({
            message:"provide an email"
            })
        }
        if(!password){
            return NextResponse.json({
            message:"enter password"
            }) 
        }

         // find user by email
        const user = await User.findOne({ email }).select("+password")
        if(!user){
            return NextResponse.json({
                message:"Register user first"
            })
        }

        if(!user.isVerified){
            return NextResponse.json({
                message:"User email is not verified. Check your email account and verify your email"
            })
        }


         // compare password
        const isMatch = await compareString(password, user?.password);

        if (!isMatch) {
            return NextResponse.json({
                message:"Invalid password"
            })
        return;
        }


        delete(user.password);
        const tokenData={
            id:user?._id,
            name:user?.name,
            email:user?.email
        }
        const token = createJWT(tokenData);

        const response= NextResponse.json({
            success: true,
            message: "Login successfully",
           
        })

        response.cookies.set("token",token,{
            httpOnly:true
        })

        return response;

    }
    catch(err){
        console.log(err);
        return NextResponse.json({
            message:err.message
        })
    }


}