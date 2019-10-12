const mongoose   = require("mongoose");

const UserSchema=new mongoose.Schema({
    id:String,
    displayName:{
        type:String,
        default:null
    },
    firstName:{
        type:String,
        default:null
    },
    lastName:{
        type:String,
        default:null
    },
    email:{
        type:String,
        unique:true,
        required:true
        },
    password:String,
    image:String,
    imageId:{
        type:String,
        default:null
    },
    resetPasswordToken:String,
    resetPasswordExpires:Date,
    isAdmin:{
        type:Boolean,
        default:false
    },
    accessToken:String,
    provider:{
        type:String,
        required:true,
        default:"local"
    }    
})

module.exports=mongoose.model("User",UserSchema);