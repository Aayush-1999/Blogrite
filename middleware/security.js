const csrf   = require("csurf"),
      helmet = require("helmet"),
      RateLimiter = require("limiter").RateLimiter;

const limiter = new RateLimiter(150, "hour");
 
module.exports=app=>{
    app.use(helmet());
    
    // Content Security policy
    // app.use(helmet.contentSecurityPolicy({
    //     directives: {
    //     defaultSrc: [""self""],
    //     styleSrc: [""self"", "fonts.googleapis.com/", "use.fontawesome.com/", ""unsafe-inline""],
    //     fontSrc: [""self"", "fonts.gstatic.com/", "use.fontawesome.com/"],
    //     scriptSrc: [""self"", "use.fontawesome.com/"],
    //     imgSrc: [""self"", "lh6.googleusercontent.com/", "media.licdn.com", "avatars0.githubusercontent.com", "platform-lookaside.fbsbx.com"],
    //     },
    // }));    
    
    app.use(csrf({
        ignoreMethods:["GET"]
    }));

    limiter.removeTokens(1,(err,remainingRequests)=> {
        if (remainingRequests < 1) {
          response.writeHead(429, {"Content-Type": "text/plain;charset=UTF-8"});
          response.end("429 Too Many Requests - your IP is being rate limited");
        }
    });
};