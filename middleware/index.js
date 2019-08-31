const express       = require("express");
      passportSetup = require("./passport/setup");

module.exports = app => {
    passportSetup(app);
};
    