const passport              = require("passport"),
      LocalStrategy         = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose"),
      google                = require("./googleStrategy"),
      facebook              = require("./facebookStrategy"),
      User                  = require("../../models/user"),
      expressSession        = require("express-session"),
      mongoose         = require("mongoose");


app.use(expressSession({
    secret: "youKnowNothing",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//LOCAL STRATEGY CONFIGURATION
passport.use(new LocalStrategy(User.authenticate()));

google(passport);

facebook(passport);

passport.serializeUser((user, done)=> {
    done(null, user._id);
});

passport.deserializeUser((id, done)=> {
    User.findById(id, (err, user)=>{
       done(err, user);   
    });
});
 