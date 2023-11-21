require('dotenv').config()
const nodemailer = require('nodemailer');
const ejs = require('ejs')

var transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: "confluence23.aisg46@outlook.com",
    pass: "bhavitisgay1234"
  }
});

async function sendMail(to, subject, text, html) {
  console.log("sendMail Function Initialized")
  var mailOptions = {
    from: "confluence23.aisg46@outlook.com",
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
    console.log(err)
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