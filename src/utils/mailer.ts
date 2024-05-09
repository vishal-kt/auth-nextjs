import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import bcryptjs from "bcryptjs";

// thing that we need to take care of it is that we are using type script so we need keep check the types safety thats why they used any  here
export const sendEmail = async({email, emailType, userId}:any)=>{
 try {


    //configure mail for usage 


    const hashedToken = await bcryptjs.hash(userId.toString(),10)
    

    if(emailType==="VERIFY"){
        await User.findByIdAndUpdate(userId, {verifyToken:hashedToken,verifyTokenExpiry:Date.now()+3600000})
    }

    else if (emailType==="RESET"){ 
        await User.findByIdAndUpdate(userId, {forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry:Date.now()+3600000})
    }

    const  transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "a63117ba9efb54",
          pass: "7a203ee7e2342c"
        }
      });


    const mailOptions = {
        from:"vishalstar895@gmail.co" ,  //sender
        to:email ,//list of receivers 
        subject:emailType==='VERIFY'? "Verify your Email":"RESET your password ",//subject line 
        
        html:`<p>Click  <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}"> here </a> to ${emailType ==="VERIFY"?"verify your email":"reset your password"}
        or copy and paste the link below in your browser <br>${process.env.DOMAIN} / verifyemail?token=${hashedToken}</p>`,

    }
    
    const mailResponse = await transport.sendMail(mailOptions)

    return mailResponse
    
 } catch (error) {
    
 }
}