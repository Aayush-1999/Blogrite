const express        = require("express"), 
      router         = express.Router({mergeParams:true}),
      Blog           = require("../models/blog"),
      Comment        = require("../models/comment"),
      methodoverride = require("method-override"),
      middleware     = require("../middleware/verify");

//COMMENT ADD ROUTE
router.post("/",middleware.isLoggedIn,(req,res)=>{
    Blog.findById(req.params.id,(err,blog)=>{
        if(err) console.log(err);
        else{
            Comment.create(req.body.comment,(err,comment)=>{
                if(err) console.log(err);
                else{
                    comment.author=req.user._id;
                    comment.save();
                    blog.comments.push(comment);
                    blog.save();
                    res.redirect("/blog/"+blog._id);
                }  
            });
        }
    });
})

 //DELETE COMMENT
 router.delete("/:comment_id",middleware.checkCommentOwnership,(req,res)=>{
     Blog.findById(req.params.id,(err,blog)=>{
        if(err) console.log(err);
        else{
            let index=blog.comments.indexOf(req.params.comment_id);
            blog.comments.splice(index,1);
            blog.save();
            Comment.findByIdAndRemove(req.params.comment_id,function(err){
                if(err) res.redirect("back");
                else    res.redirect("/blog/"+req.params.id);
             });        
        }
     })
 });


module.exports=router;