const GoogleStrategy = require("passport-google-oauth20"),
      passport       = require("passport"),
      mongoose         = require("mongoose"),
      User           = require("../../models/user");


//PASSPORT GOOGLE CONFIGURATION
module.exports = passport => {
   passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
      profileFields: ['id', 'displayName', 'photos', 'email','name']
   },
   (accessToken, refreshToken, profile, done)=> {
      process.nextTick(function(){
            User.findOne({email: profile.emails[0].value },(err, user)=> {
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
                     displayName:profile.displayName,
                     email:profile.emails[0].value,
                     image:profile.photos[0].value
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
};