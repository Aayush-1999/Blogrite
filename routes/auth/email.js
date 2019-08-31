const nodemailer = require("nodemailer");

const smtpTransport = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
      user: process.env.GMAILID,
      pass: process.env.GMAILPW
    }
  });
  var mailOptions = {
    to: user.email,
    from: process.env.GMAILID,
    subject: 'Password Reset',
    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
      'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
      'http://' + req.headers.host + '/reset/' + token + '\n\n' +
      'If you did not request this, please ignore this email and your password will remain unchanged.\n'
  };
  smtpTransport.sendMail(mailOptions, (err)=> {
    console.log('mail sent');
    done(err, 'done');
  });