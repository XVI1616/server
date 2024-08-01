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
    host: "smtp.yandex.ru",
    port: 465,
    secure: true,
    auth: {
      user: "zqwe821@yandex.ru",
      pass: "Sasha21102007",
    },
  });

  const mailOptions = {
    from: "zqwe821@yandex.ru",
    to: "zqwe821@yandex.ru",
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
