// // var nodemailer = require('nodemailer');
// // import * as nodemailer from 'nodemailer';

// function emailWorker() {
//     var nodemailer = require('nodemailer');
//     var transporter = nodemailer.createTransport({
//         host: 'smtp.ethereal.email',
//         port: 587,
//         auth: {
//             user: 'mellie93@ethereal.email',
//             pass: 'MjqyJWCYaTZ7BaysWs'
//         }
//     });

//     var mailOptions = {
//         from: 'youremail@gmail.com',
//         to: 'myfriend@yahoo.com',
//         subject: 'Sending Email using Node.js',
//         text: 'That was easy!'
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log('Email sent: ' + info.response);
//         }
//     });
// }