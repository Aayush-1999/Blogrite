const express = require("express"),
      router  = express.Router(),
      Blog    = require("../models/blog"),
      User    = require("../model/user"),
      methodOverride=require("method-override"),
      middleware=require("../middleware");

router.get("/create",(req,res)=>{
    res.render("blog/create");
});

router.post("/create",(req,res)=>{

});