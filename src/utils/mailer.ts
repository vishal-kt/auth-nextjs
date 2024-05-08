import nodemailer from 'nodemailer'

// thing that we need to take care of it is that we are using type script so we need keep check the types safety thats why they used any  here
export const sendEmail = async({email, emailType, userId}:any)=>{
 try {

    const transporter = nodemailer.createTransport({
        host:"smtp.forwardemail.net",
        port:465,
        secure:true,
        auth:{
            user:"REPLACE_WITH _YOUR ALIAS@DOMAIN.COM",
            pass:"REPLACE_WITH_YOUR_PASSWORD",
        },
    });

    const mailOptions = {
        from:"vishalstar895@gmail.co" ,  //sender
        to:email ,//list of receivers 
        subject:emailType==='VERIFY'? "Verify your Email":"RESET your password ",//subject line 
        text:"",//plain text
        html:"<b>Hello World ? </b>" // html body

    }
    
    const mailResponse = await transporter.sendMail(mailOptions)

    return mailResponse
    
 } catch (error) {
    
 }
}