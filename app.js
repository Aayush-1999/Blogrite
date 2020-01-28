const express               = require("express"),
      app                   = express(),
      bodyParser            = require("body-parser"),
      mongoose              = require("mongoose"),
      methodOverride        = require("method-override"),
      middleware            = require("./middleware/index");

require("dotenv").config();

//ROUTES
const indexRoute         = require("./routes/index"),
      blogRoute          = require("./routes/blog"),
      commentRoute       = require("./routes/comment"),
      resetPasswordRoute = require("./routes/resetPass"),
      userRoute          = require("./routes/user"),
      notificationRoute  = require("./routes/notification");

mongoose.connect(process.env.DATABASEURL,{ useUnifiedTopology: true ,useNewUrlParser:true});
mongoose.set("useFindAndModify",false);
mongoose.set("useCreateIndex",true);

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(methodOverride("_method"));

middleware(app);

app.use("/",indexRoute);
app.use("/",resetPasswordRoute);
app.use("/blog",blogRoute);
app.use("/blog/:id/comment",commentRoute);
app.use("/user",userRoute);
app.use("/notification",notificationRoute);

app.listen(process.env.PORT||3000)
{
    console.log("Server has started");
};