const mongoose              = require("mongoose");
      passportLocalMongoose = require("passport-local-mongoose");

const UserSchema=new mongoose.Schema({
    id:String,
    displayName:String,
    firstName:String,
    lastName:String,
    email:{
        type:String,
        unique:true,
        required:true
        },
    password:String,
    avatar:String,
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

UserSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",UserSchema);