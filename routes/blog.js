const express        = require("express"),
      router         = express.Router(),
      Blog           = require("../models/blog"),
      User           = require("../models/user"),
      methodOverride = require("method-override"),
      middleware     =require("../middleware"),
      multer         = require('multer');

const storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
const imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFilter})

const cloudinary = require("cloudinary").v2;
cloudinary.config({ 
  cloud_name: 'image-storage', 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

//SHOW FORM FOR CREATING NEW BLOG
router.get("/create",(req,res)=>{
    res.render("blog/create");
});

//CREATING NEW BLOG
router.post("/",upload.single('image'),async function(req,res){
    try{
        let result= await cloudinary.uploader.upload(req.file.path)// can also add webpurifier to purify images uploaded on server (for more details see cloudinary addons)
        // add cloudinary url for the image to the campground object under image property
        req.body.blog.image = result.secure_url;
        // add image's public url to the campground object for identifying and deleting image on the cloudinary
        req.body.blog.imageId = result.public_id;
        // add author to campground
        // req.body.blog.author = {
        //     id: req.user._id,
        //     name: req.user.displayName
        // }
        let blog=await Blog.create(req.body.blog);
        // let user = await User.findById(req.user._id).populate('followers').exec();
        // let newNotification = {
        //     username: req.user.username,
        //     campgroundId: campground.id
        // }
        // for(const follower of user.followers) {
        //     let notification = await Notification.create(newNotification);
        //     follower.notifications.push(notification);
        //     follower.save();
        // }
        //redirect back to blogs page
        console.log("Blog created");
        res.redirect("/blog/${blog.id}");
    } catch(err) {
        console.log("Blog not created");
        console.log(err);
        // req.flash('error', err.message);
        res.redirect('back');
    }
});

//SHOW ALL BLOGS ON INDEX PAGE
router.get("/",(req,res)=>{
    Blog.find({},(err,blogs)=>{
        if(err) {
            console.log(err);
            res.redirect("back");
        }
        else res.render("index",{blogs});
    });
})

//SHOW SINGLE BLOG
router.get("/:id",(req,res)=>{
    Blog.findById(req.params.id,(err,blog)=>{
        if(err) console.log(err);
        else res.render("blog/show",{blog});
    });
})

module.exports=router;