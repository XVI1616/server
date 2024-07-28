const { error } = require("console");
const http = require("http");
const nodemailer = require("nodemailer");

const server = http.createServer((req, res) => {
  const visitorIP =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  sendEmail(visitorIP);
  res.end("Thx, ip adress is saved and sended in ***** email!");
});
server.listen(3000, () => {
  console.log("port 3000");
});
require("dotenv").config();
function sendEmail(ip) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "New visitor on my site)",
    text: `Ip adress: ${ip}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("check Email" + info.response);
    }
  });
}
