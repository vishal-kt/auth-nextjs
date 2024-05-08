import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest) {
    try {
       const reqBody = request.json()
       const {username,email, password} = reqBody
       //validation 
       console.log(reqBody); 

       //this is to check if user exist with that particular email 
    const user  = await User.findOne({email})     
    if(user){
        return NextResponse.json({error:"User already exist"},{status:400})
    }
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}