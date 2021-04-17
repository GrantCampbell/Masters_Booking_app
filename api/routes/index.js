var express = require('express');
var router = express.Router();
const ObjectID = require('mongodb').ObjectID;
var nodemailer = require('nodemailer');

router.get('/appointments', (req, res, next) => {
  req.collection.find({})
    .toArray()
    .then(results => res.json(results))
    .catch(error => res.send(error));
});

router.post('/appointments', async (req, res, next) => {
  const { appointmentDate, name, email, notes } = req.body;
  if (!appointmentDate || !name || !email || !notes) {
    return res.status(400).json({
      message: 'Appointment Date, Name, email, and notes are required',
    });
  }

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'jakayla.rath@ethereal.email',
      pass: 'TDaJMrgsg3B8Dap9G1'
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: "You have an Appointment on " + appointmentDate, // Subject line
    text: "You have an Appointment on " + appointmentDate, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  const payload = { appointmentDate, name, email, notes };
  req.collection.insertOne(payload)
    .then(result => res.json(result.ops[0]))
    .catch(error => res.send(error));
});

router.delete('/appointments/:id', (req, res, next) => {
  const { id } = req.params;
  const _id = ObjectID(id);
  req.collection.deleteOne({ _id })
    .then(result => res.json(result))
    .catch(error => res.send(error));
});

module.exports = router;