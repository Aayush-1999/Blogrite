const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title:String,
    image:String,
    imageId:String,
    body:String,
    createdAt:{
        type:Date,
        default:Date.now
    },
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        name:String
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
});

module.exports=mongoose.model("Blog",blogSchema);

