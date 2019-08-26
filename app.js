const express               = require("express");
      app                   = express();
      bodyParser            = require("body-parser");
      mongoose              = require("mongoose");
      passport              = require("passport");
      localStrategy         = require("passport-local");
      facebookStrategy      = require("passport-facebook");
      googleStrategy        = require("passport-google-oauth20");
      passportLocalMongoose = require("passport-local-mongoose");
      methodOverride        = require("method-override");
      expressSession        = require("express-session");

require("dotenv").config();

mongoose.connect(process.env.DATABASEURL,{useNewUrlParser:true});
mongoose.set("useFindAndModify",false);
mongoose.set("useCreateIndex",true);

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");
app.use(methodOverride("_method"));

app.get("/",(req,res)=>{
    console.log("everything okay");
})

app.listen(process.env.PORT||3000)
{
    console.log("Server has started");
}