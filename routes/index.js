const express      = require("express"),
      router       = express.Router(),
      passport     = require("passport"),
      bcrypt       = require("bcrypt"),
      User         = require("../models/user"),
      googleAuth   = require("./auth/google"),
      facebookAuth = require("./auth/facebook");
      

router.get("/",(req,res)=>{
    res.redirect("/blog"); 
});

//SHOW REGISTER FORM
router.get("/register",(req,res)=>{
    res.render("register");
});

//REGISTER LOGIC ROUTE
router.post("/register",async function(req,res){
    try{
        let saltRounds=10,hashcode;    
        await bcrypt.hash(req.body.password, saltRounds, function(err,hash) {
            hashcode=hash;
        });

        let user = await User.create({
            firstName:req.body.firstname,
            lastName:req.body.lastname,
            displayName:req.body.firstname + " " + req.body.lastname,
            email:req.body.email,
            password:hashcode
        }); 
        if(user.email==="aayushaggarwal2007@gmail.com"){
            user.isAdmin=true;   
            user.save();
        }
        req.logIn(user,function(err){  
            res.redirect("/");
        });                   
    }
    catch(err){
        req.flash("error","This Email is already registered");
        res.redirect("/register");
    }    
});

//SHOW LOGIN FORM
router.get("/login",(req,res)=>{
    res.render("login");
});

//LOCAL LOGIN LOGIC ROUTE
router.post("/login",passport.authenticate("local",{ 
        failureRedirect:"/login",
        failureFlash:"Invalid email or password"
    }),(req,res)=>{
        res.redirect("/");
});
 
//LOGOUT ROUTE
router.get("/logout",(req,res)=>{
    req.logOut();
    res.redirect("/login");
});

googleAuth(router);
facebookAuth(router);

module.exports=router;