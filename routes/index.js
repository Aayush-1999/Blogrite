const express = require("express");
      router  = express.Router();
      passport= require("passport");
      User    = require("../models/user");

//SHOW REGISTER FORM
router.get("/register",(req,res)=>{
    res.render("register");
});

//HANDLE REGISTER LOGIC
router.post("/register",(req,res)=>{ 
})

//SHOW LOGIN FORM
router.get("/login",(req,res)=>{
    res.render("login");
});

router.post("")

module.exports=router;