# BlogRite

<img alt="David" src="https://img.shields.io/david/Aayush-1999/Blogrite?label=dependencies">
<img alt="Code Quality" src="https://img.shields.io/badge/code%20quality-A-brightgreen">

This is a **Blogging Web App** where you can:
- Read blogs
- Write blogs
- Like and Share blogs
- Follow bloggers

### SERVER

The Server is made on `Node.js (v10.15.3)`
<br/>
`Express.js` is used as the server framework (v4.17.1)

### DATABASE

The database used is `MongoDB` and is hosted on a `MongoDB Atlas Cluster`.
<br/>
`Mongoose.js` is used as an ODM (v5.6.11)

### FRONT-END

- The Front-end is made with `HTML, CSS and JS`.
- `Materialize.css` is used for better styling of the project.
- `Font Awesome` for icons
- `Animate.css` for animations

### SECURITY

Many security precautions have been taken:
- ***bcrypt***: For secure password saving in the database.
- ***csurf***: For protection against CSRF attack on Forms and fetch requests.
- ***helmet***: For protection against common Security Vulnerabilities inExpress framework.
<!-- - ***jsonwebtoken(JWT)***: For Secure Email Verification Links. -->
- ***Content Security Policy***: For Secure Content Delivery from the server.
- ***limiter***: For Limiting the access to data from a particular client (150 requests per hour).

### AUTHENTICATION

`Passport.js` has been integrated into the application for Secure Authentication of User Credentials over OAuth 2.0 from Google, Facebook, and Local Email Verification.

### MISC

`nodemailer` has been used for sending emails(verification emails) to the users.

### For Developers

Config Object

The file ./bin/config/config exports the config object which is a cover over the .env file for better protections and encapsulation (Create a .env file first in bin folder). the ./bin/config directory also have the development.js, production.js and testing.js files for fine tuning the config object in the respective NODE_ENV for more info open these files and go through the comments.

### Express Security

For security `Helmet` is used with its defaults and additionally `Content Security Policy`.

Additionally other mechanisms are also used:-

- **csurf** - CSRF protection is applied to the entire project. If CSRF is to be enabled only on some routes then go to ./middlewares/security/globalSecurity.js and disable it and import ./middlewares/security/csurfSetup.js to the file where it is required. for more details refer csurf.

- **limiter** - to block a user from accessing a route more than a given no. of time in a set duration(eg 150 requests per hour). For more details refer limiter. How to use:-
require the limiterSetup file: ./middlewares/security/limiterSetup.js
this will return an express middleware which can be used on any route, router or on app.

### NPM Commands
- **npm install** - installs all the dependencies
- **npm start** - lints the server and client script, starts eslint on watch mode on server scripts and starts the project at localhost:1998 in debug mode.
- **npm run start-w** - Restarts the server(using nodemon) on every save and lints the server and client side scripts on each save.
- **npm run start-w-lite** - Simply restarts the server(using nodemon) on every save.
- **npm run lint-server** - lints the server scripts (all scripts except that in node_module and public directory) once.
- **npm run lint-client** - lints the client scripts (all scripts in the public directory) once.
- **npm run lint-w** - starts the linter in watch mode. When called from root directory it watches the server scripts and when called in public directory it watches the client scripts.
- **npm run localTunnel** - exposes localhost:1998 to the world wide web
- **npm run lt** - runs npm start and npm run localTunnel in parallel
- **Use npm run** --silent <your-script> to hide the internal logs from your terminal window.
eg: npm run --silent start-w or npm run --silent start-w-lite

### To-Do

- Use cookies securely
- Add proper Logging (Bunyan or Winston)
- Use CORS according to your project.
  - CORS allows other servers and domains to access/request your content. It is restricted by default
  - A possible use case could a public API project which is used by others to use your content.
  - you could use cors library to implement it.