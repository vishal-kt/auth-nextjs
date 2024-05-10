import mongoose from "mongoose";

// here we have made data base model 

const userSchema = new mongoose.Schema({
        username:{
            type:String,
            required:[true,"please provide a username"],
            unique :true
        },
        email:{
            type:String,
            required:[true,"please provide a username"],
            unique :true
        },
        password:{
            type:String,
            required:[true,"please provide a username"],
            
        },
        isVerified :{
            type:Boolean,
            default:false
        },
        isAdmin:{
            type:Boolean,
            default:false
        },
        forgotPasswordToken:String,
        forgotPasswordTokenExpiry:Date,
        verifyToken:String,
        verifyTokenExpiry:Date
         
})

const User = mongoose.models.users  ||  mongoose.model("users",userSchema)

export default User