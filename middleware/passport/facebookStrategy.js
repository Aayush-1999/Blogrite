const FacebookStrategy = require("passport-facebook"),
      mongoose         = require("mongoose"),
      User             = require("../../models/user");

//PASSPORT-FACEBOOK CONFIGURATION
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID ,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'picture.type(large)', 'email','name']
   },
    (accessToken, refreshToken, profile, done)=> {
       process.nextTick(function(){
          User.findOne({ email: profile.emails[0].value },(err, user)=> {
             if(err) {
                return done(err);
             }
             if(user){
                return done(null, user);
             } 
             else{
                var newUser = new User({
                   id:profile.id,
                   token:accessToken,
                   firstname:profile.name.givenName,
                   lastname:profile.name.familyName,
                   email:profile.emails[0].value,
                   avatar:profile.photos[0].value,
                   provider:"facebook"
                });
                newUser.save(function(err) {
                   if(err) {
                      return done(err);
                   } 
                   else {
                      done(null, newUser);
                   }
                });
             }
          });
       });
    }
 ));