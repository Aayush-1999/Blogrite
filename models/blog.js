const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema([{
    title:{
        type:String,
        unique:true,
        required:true
    },
    image:String,
    imageId:String,
    body:String,
    createdAt:{
        type:Date,
        default:Date.now
    },
    author:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
}]);

module.exports=mongoose.model("Blog",blogSchema);

