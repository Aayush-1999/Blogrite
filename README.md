# BlogRite

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9b4e442c5ebb46df86ea3cd6fb65bb1a)](https://app.codacy.com/manual/aayushaggarwal2007/Blogrite?utm_source=github.com&utm_medium=referral&utm_content=Aayush-1999/Blogrite&utm_campaign=Badge_Grade_Dashboard)
![code size](https://img.shields.io/badge/code%20size-110%20kB-orange)
![licence](https://img.shields.io/github/license/Aayush-1999/Blogrite)
![npm](https://img.shields.io/badge/npm-v6.13.0-blue)
![Website](https://img.shields.io/website?up_color=light%20green&up_message=up&url=https%3A%2F%2Fgithub.com%2FAayush-1999%2FBlogrite)
![dependencies](https://img.shields.io/david/Aayush-1999/Blogrite?label=dependencies)

This is a **PWA** enabled **Web App** which provides complete Authentication and Registeration of all users with Google, Facebook and Local Email. On Blogrite a user can:

- Read & Write blogs
- Update & Delete blogs
- Comment on blogs
- Delete comments
- Search blogs
- See notifications
- Follow/Unfollow others
- Manage user profile

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

### Contributing

Feel free to contribute :-)