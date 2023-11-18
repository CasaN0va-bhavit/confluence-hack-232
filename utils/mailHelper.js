require('dotenv').config()
const nodemailer = require('nodemailer');
const ejs = require('ejs')

var transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: process.env.FROM_EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

async function sendMail(to, subject, text, html) {
  var mailOptions = {
    from: process.env.FROM_EMAIL,
    to: to,
    subject: subject,
    text: text,
    html: html
  };
  let x;
  try {
    x = await transporter.sendMail(mailOptions);
  } catch (err) {
    x = err;
  }
  return x;
}

const renderFile = (file, data) => {
  return new Promise((resolve) => {
    ejs.renderFile(file, data, (err, result) => {
      if (err) {
        console.log(err);
        return err;
      }
      resolve(result);
    });
  });
};


module.exports = { sendMail, renderFile };