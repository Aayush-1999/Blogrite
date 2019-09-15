const express        = require("express"),
      router         = express.Router(),
      Blog           = require("../models/blog"),
      User           = require("../models/user"),
      methodOverride = require("method-override"),
      middleware     =require("../middleware"),
      multer         = require('multer');

// const storage = multer.diskStorage({
//   filename: function(req, file, callback) {
//     callback(null, Date.now() + file.originalname);
//   }
// });
// const imageFilter = function (req, file, cb) {
//     // accept image files only
//     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
//         return cb(new Error('Only image files are allowed!'), false);
//     }
//     cb(null, true);
// };
// const upload = multer({ storage: storage, fileFilter: imageFilter})

// const cloudinary = require("cloudinary").v2;
// cloudinary.config({ 
//   cloud_name: 'image-storage', 
//   api_key: process.env.CLOUDINARY_API_KEY, 
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });


router.get("/create",(req,res)=>{
    res.render("blog/create");
});

router.post("/create",(req,res)=>{

});

module.exports=router;