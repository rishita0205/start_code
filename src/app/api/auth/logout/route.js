import { NextResponse } from "next/server";

export async function GET(req) {
   try{
      const response = NextResponse.json({
       message:"Logout Successflly",
       success:true
      })


      response.cookies.set("token","",{
       httpOnly:true,
       expires:new Date(0)
      })

      return response;

   }catch(err){
    return NextResponse.json({
        message:err.message,
        statusCode:500
    })
   }


}