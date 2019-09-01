const passport              = require("passport"),
      local                 = require("./localStrategy");
      google                = require("./googleStrategy"),
      facebook              = require("./facebookStrategy"),
      User                  = require("../../models/user"),
      expressSession        = require("express-session"),
      mongoose              = require("mongoose");

module.exports = app =>{
    app.use(expressSession({
        secret: "youKnowNothing",
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    //LOCAL STRATEGY CONFIGURATION
    // passport.use(new LocalStrategy(User.authenticate()));
    local(passport);

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
};
 