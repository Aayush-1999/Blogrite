const express             = require("express"),
      router              = express.Router(),
      User                = require("../models/user"),
      Blog                = require("../models/blog"),
      Notification        = require("../models/notification"),
      {cloudinary,upload} = require("../utils/cloudinary"),
      middleware          = require("../middleware/verify");

// user profile
router.get("/:id", async function(req, res) {
  try {
    let user = await User.findById(req.params.id).exec();
    let blogs= await Blog.find().where("author").equals(user._id).exec();
    res.render("user/profile",{user,blogs});
  } 
  catch(err) {
    return res.redirect("back");
  }
});

//user profile photo
router.post("/:id",middleware.isLoggedIn,upload.single("image"),async function(req,res){
  try{
    let result= await cloudinary.uploader.upload(req.file.path);// can also add webpurifier to purify images uploaded on server (for more details see cloudinary addons)
    let user=await User.findById(req.params.id).exec();
    // add cloudinary url for the image to the user object under image property
    user.image = result.secure_url;
    // add image"s public url to the user object for identifying and deleting image on the cloudinary
    user.imageId = result.public_id;
    user.save();
    //redirect back to user page
    res.redirect("/user/"+req.params.id);
  } 
  catch(err) {
    res.redirect("back");
  }
});

// follow user
router.get("/follow/:id", middleware.isLoggedIn, async function(req, res) {
  try {
    let followUser = await User.findById(req.params.id);
    let followingUser = await User.findById(req.user._id);
    followUser.followers.push(req.user._id);
    followingUser.following.push(req.params.id);
    let newNotification = {
      username: req.user.displayName,
      userId  : req.user._id
    };
  let notification = await Notification.create(newNotification);
  followUser.notifications.push(notification);
    followUser.save();
    followingUser.save();
    res.redirect("/user/" + req.params.id);
  } catch(err) {
    req.flash("error", err.message);
    res.redirect("back");
  }
});

// unfollow user
router.get("/unfollow/:id", middleware.isLoggedIn, async function(req, res) {
  try {
    let followUser = await User.findById(req.params.id);
    let followingUser = await User.findById(req.user._id);
    followUser.followers.splice(followUser.followers.indexOf(req.user._id),1);
    followingUser.following.splice(followingUser.following.indexOf(req.params.id),1);
    followUser.save();
    followingUser.save();
    res.redirect("/user/" + req.params.id);
  } catch(err) {
    req.flash("error", err.message);
    res.redirect("back");
  }
});

module.exports=router;