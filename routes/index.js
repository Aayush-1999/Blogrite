const express      = require("express"),
      router       = express.Router(),
      passport     = require("passport"),
      bcrypt       = require("bcrypt"),
      User         = require("../models/user"),
    //   email        = require("./auth/email"),
      googleAuth   = require("./auth/google"),
      facebookAuth = require("./auth/facebook");
      

router.get("/",(req,res)=>{
    res.send("Landing"); 
});

//SHOW REGISTER FORM
router.get("/register",(req,res)=>{
    res.render("register");
});

//REGISTER LOGIC ROUTE
router.post("/register",(req,res)=>{
    let saltRounds=10;
    
    bcrypt.hash(req.body.password, saltRounds, (err,hash)=> {
        if(err){
            res.redirect("/register");
        }
        User.create({
            firstName:req.body.firstname,
            lastName:req.body.lastname,
            email:req.body.email,
            password:hash
        }).then((err,user)=>{
            if(err){
                console.log(err);
                // req.flash("error",err.message);
                return res.render("register");
            }   
            else{
                if(req.body.email==="aayushaggarwal2007@gmail.com")
                {
                    user.isAdmin=true;
                    user.save();   
                }
                console.log(user);
                res.redirect("/");
            }
        });
        // res.redirect("/");
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