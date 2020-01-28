const express        = require("express"), 
      router         = express.Router({mergeParams:true}),
      Blog           = require("../models/blog"),
      Comment        = require("../models/comment"),
      Notification   = require("../models/notification"),
      User           = require("../models/user"),
      methodoverride = require("method-override"),
      middleware     = require("../middleware/verify");

//COMMENT ADD ROUTE
router.post("/",middleware.isLoggedIn,async function(req,res){
    try{
        let blog= await Blog.findById(req.params.id);
        let comment= await Comment.create(req.body.comment);
        comment.author=req.user._id;
        comment.save();
        blog.comments.push(comment);
        blog.save();
        let newNotification = {
            username: req.user.displayName,
            blog: blog.title,
            blogId:blog.id
        }
        let notification = await Notification.create(newNotification);
        let author=await User.findById(blog.author);
        author.notifications.push(notification);
        author.save();
        res.redirect("/blog/"+blog._id);
    }
    catch(err){
        res.redirect("back");
    }
})

 //DELETE COMMENT
 router.delete("/:comment_id",middleware.checkCommentOwnership,(req,res)=>{
     Blog.findById(req.params.id,(err,blog)=>{
        if(err) return("back");
        else{
            let index=blog.comments.indexOf(req.params.comment_id);
            blog.comments.splice(index,1);
            blog.save();
            Comment.findByIdAndRemove(req.params.comment_id,function(err){
                if(err) res.redirect("back");
                else    res.redirect("/blog/"+req.params.id);
             });        
        }
     });
 });


module.exports=router;