const express=require("express"),
      router=express.Router(),
      User=require("../models/user"),
      Blog=require("../models/blog");

// user profile
router.get("/:id", async function(req, res) {
    try {
      let user = await User.findById(req.params.id).exec();
      let blogs= await Blog.find().where("author").equals(user._id).exec();
      res.render("user/profile",{user,blogs});
    } 
    catch(err) {
      req.flash("error", err.message);
      return res.redirect("back");
    }
  });

module.exports=router;