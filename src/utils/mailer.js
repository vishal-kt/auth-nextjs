import { nodemailer } from "nodemailer";


export const sendEmail = async({email,emailType,userId}) =>{
    try {

        const transporter = nodemailer.createTransport({
            host:"smtp.forwardemail.net",
            port:465,
            auth:{
                user:"",
                pass:""
            },
           
        });

        const mailOptions = {
            from:'vishal.27794@gmail.com', // sender address 
            to:email,
            subject:emailType==='VERIFY'?"Verify your email":"Reset your password",
         
            html:"<br>Hello World </br>",   
        }
        //send email with transport mail option object
       const mailResponse =  await transporter.sendEmail(mailOptions)
       return mailResponse
    } catch (error) {

        throw new Error(error.message)
        
    }
}