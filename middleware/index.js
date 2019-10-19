const express       = require("express");
      path          = require("path"),
      passportSetup = require("./passport/setup");

module.exports = app => {
    app.use(express.static(path.join(__dirname,"../public")));
    app.use(express.static(path.join(__dirname,"../node_modules/materialize-css/dist")));
    app.use(express.static(path.join(__dirname,"../node_modules/animate.css")));
    app.use(express.static(path.join(__dirname,"../node_modules/@ckeditor/ckeditor5-build-classic/build")));

    passportSetup(app);
};
    