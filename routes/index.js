const express      = require("express"),
      router       = express.Router(),
      passport     = require("passport"),
      User         = require("../models/user"),
    //   email        = require("./auth/email"),
      googleAuth   = require("./auth/google"),
      facebookAuth = require("./auth/facebook");
      

router.get("/",(req,res)=>{
    res.render("landing"); 
});

//SHOW REGISTER FORM
router.get("/register",(req,res)=>{
    res.render("register");
});

//REGISTER LOGIC ROUTE
router.post("/register",(req,res)=>{
    let newUser=new User({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email
    });
    if(req.body.email==="aayushaggarwal2007@gmail.com")
    {
        newUser.isAdmin=true;   
    }
    User.register(newUser,req.body.password,(err,user)=>{
        if(err){
            req.flash("error",err.message);
            return res.render("register");
       }
       passport.authenticate("local")(req,res,function(){
       res.redirect("/");
       });
    });
});

//SHOW LOGIN FORM
router.get("/login",(req,res)=>{
    res.render("login");
});

//LOCAL LOGIN LOGIC ROUTE
router.post("/login",passport.authenticate("local",
    {
       successRedirect:"/",
       failureRedirect:"/login"
    }),(req,res)=>{
});
 
//LOGOUT ROUTE
router.get("/logout",(req,res)=>{
    req.logOut();
    res.redirect("/login");
});

googleAuth(router);
facebookAuth(router);

//FORGOT PASSWORD
router.get('/forgot',(req, res)=> {
    res.render("forgot");
});

module.exports=router;