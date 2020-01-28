const passport=require("passport");

//FACEBOOK LOGIN ROUTE
module.exports=router=>{
    router.get("/auth/facebook", passport.authenticate("facebook",{scope:["email"]}));

    router.get("/auth/facebook/callback",passport.authenticate("facebook", 
        { 
            successRedirect: "/",
            failureRedirect: "/login",
            failureFlash:true    
        })
    );
}
