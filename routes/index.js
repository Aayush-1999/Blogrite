const express      = require("express"),
      router       = express.Router(),
      passport     = require("passport"),
      bcrypt       = require("bcrypt"),
      User         = require("../models/user"),
    //   email        = require("./auth/email"),
      googleAuth   = require("./auth/google"),
      facebookAuth = require("./auth/facebook");
      

router.get("/",(req,res)=>{
    res.render("index"); 
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
            email:req.body.email,
            password:hashcode
        }); 
         
        if(user.email==="aayushaggarwal2007@gmail.com")
        {
            user.isAdmin=true;
            user.save();   
        }
        console.log(user);
        res.redirect("/");                    
    }
    catch(err){
        console.log(err);
        res.redirect("/register");
    }    
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