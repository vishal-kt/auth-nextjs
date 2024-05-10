import {connect} from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import  User  from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/utils/mailer";
connect()

export async function POST(request:NextRequest) {
 
    try {
        const reqBody = await request.json() // since reqBody is promise so we need to add await here 
        const {username,email,password} = reqBody
        console.log(reqBody);

        // check for the user 
        const user = await User.findOne({email})
        if (user) {
            return NextResponse.json({error:"User already exits"},{status:400})
        }

        
        const  salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt)
        
        // create new user 
        const newUser  = new User({
            username,
            email,
            password:hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);
        
        //send verification email 
         await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})

         return NextResponse.json({
            message:"User registered successfully ",
            success:true ,
            savedUser 
         })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{
            status :500})
    }
}