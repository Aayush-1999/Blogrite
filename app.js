const express               = require("express"),
      app                   = express(),
      bodyParser            = require("body-parser"),
      mongoose              = require("mongoose"),
      flash                 = require("connect-flash"),
      methodOverride        = require("method-override"),
      middleware            = require("./middleware/index");

require("dotenv").config();

//ROUTES

const indexRoute   = require("./routes/index"),
      blogRoute    = require("./routes/blog"),
      commentRoute = require("./routes/comment");

mongoose.connect(process.env.DATABASEURL,{ useUnifiedTopology: true ,useNewUrlParser:true});
mongoose.set("useFindAndModify",false);
mongoose.set("useCreateIndex",true);

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(flash());

middleware(app);

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.error  =  req.flash("error");
    res.locals.success  =  req.flash("success");
    next();
 });

app.use("/",indexRoute);
app.use("/blog",blogRoute);
app.use("/blog/:id/comment",commentRoute);

app.listen(process.env.PORT||3000)
{
    console.log("Server has started");
}