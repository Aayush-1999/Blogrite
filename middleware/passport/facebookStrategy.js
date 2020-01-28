const FacebookStrategy = require("passport-facebook"),
      mongoose         = require("mongoose"),
      User             = require("../../models/user");

//PASSPORT-FACEBOOK CONFIGURATION
module.exports=passport=>{
   passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_APP_ID ,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: `${process.env.HOST}/auth/facebook/callback`,
      profileFields: ["id", "displayName", "picture.type(large)", "email","name"]
      },
      (accessToken, refreshToken, profile, done) =>{
         process.nextTick(function(){
            User.findOne({ email: profile.emails[0].value },(err, user) =>{
               if(err) {
                  return done(err);
               }
               else if(user && user.provider==="facebook"){
                  return done(null, user);
               } 
               else if(!user){
                  let newUser = new User({
                     id:profile.id,
                     token:accessToken,
                     firstName:profile.name.givenName,
                     lastName:profile.name.familyName,
                     displayName:profile.name.givenName + " " + profile.name.familyName, 
                     email:profile.emails[0].value,
                     image:profile.photos[0].value,
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
               else{
                  return done(null,false,{ message: `This email id is already registered with ${user.provider}`});
               }
            });
         });
      }
   ));
};