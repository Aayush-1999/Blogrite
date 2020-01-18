# BlogRite

<a><img alt="Code Quality" src="https://img.shields.io/badge/code%20quality-A-brightgreen"></a>
<a><img alt="Dependanices upto date" src="https://img.shields.io/david/Aayush-1999/Blogrite?label=dependencies"></a>
<a><img alt="GNU-v3" src="https://img.shields.io/badge/License-GPLv3-blue.svg"></a>
<a><img alt="Code Size" src="https://img.shields.io/badge/code%20size-110%20kB-orange"></a>
<a><img alt="Website Up" src="https://img.shields.io/website-up-down-green-red/http/shields.io.svg"></a>

This is a **PWA** enabled **Web App** which provides complete Authentication and Registeration of all users with:
- Google
- Facebook
- Local Email

and where a user can:
- Read blogs
- Write blogs
- Update blogs
- Comment on blogs
- Search a blog
- Follow/Unfollow others

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
- `Animate.css` and `Hover.css` for animations

### SECURITY

Many security precautions have been taken:
- ***bcrypt***: For secure password saving in the database.
- ***csurf***: For protection against CSRF attack on Forms and fetch requests.
- ***helmet***: For protection against common Security Vulnerabilities inExpress framework.
- ***Content Security Policy***: For Secure Content Delivery from the server.
- ***limiter***: For Limiting the access to data from a particular client (150 requests per hour).

### AUTHENTICATION

`Passport.js` has been integrated into the application for Secure Authentication of User Credentials over OAuth 2.0 from Google, Facebook, and Local Email Verification.

### MISC

`nodemailer` has been used for sending emails (Reset Password Link) to the users.
<br/>
`multer` has been used for uploading images and `cloudinary` for storing images.

### Response Compression

The response object is gzip compressed using [compression](https://www.npmjs.com/package/compression). To request for an uncompressed response use **x-no-compression** in the request header.

### NPM Commands

- **npm install** - installs all the dependencies
- **npm start** - lints the server and client script, starts eslint on watch mode on server scripts and starts the project at localhost:1998 in debug mode.
- **npm run start-w** - Restarts the server(using nodemon) on every save and lints the server and client side scripts on each save.
- **Use npm run** --silent <your-script> to hide the internal logs from your terminal window.


### To-Do

- Use cookies securely
- Add proper Logging (Bunyan or Winston)
