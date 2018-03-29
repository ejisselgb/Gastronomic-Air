var express = require('express'), 
      mailer=require('express-mailer');
const sendEmail = express();


module.exports = {
  getSendEmail: getSendEmail,
};


mailer.extend(sendEmail, {
  from: 'no-reply@gmail.com',
  host: 'smtp.gmail.com', // hostname 
  secureConnection: true, // use SSL 
  port: 465, // port for secure SMTP 
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts 
  auth: {
    user: 'omega.academy.usb@gmail.com',
    pass: 'Omega.Academy*321@'
  }
});

function getSendEmail(req, res, next) {

  var email = req.params.email;
  var numberTemplate = req.params.path;
  var subject = req.params.subject

  sendEmail.set('views', __dirname + '\\views\\'+numberTemplate);
  sendEmail.set('view engine', 'jade');

  sendEmail.mailer.send('email', {
    to: email, // REQUIRED. This can be a comma delimited string just like a normal email to field.  
    subject: subject, // REQUIRED.  
  }, function (err) {
    if (err) {
      // handle error 
      console.log(err);
      res.send('There was an error sending the email');
      return;
    }
    res.send('Email Sent');
  });
}


