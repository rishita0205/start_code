import { NextResponse } from "next/server";

export async function GET(req){
   return NextResponse.redirect(`${req.nextUrl.origin}/login`)
} 