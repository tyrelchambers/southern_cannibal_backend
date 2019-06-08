import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
require('dotenv').config()

const Email = require('email-templates');
 
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const port = process.env.PORT || 3001;
const email = new Email({
  message: {
    from: 'SouthernCannibal.com <no-replay@southerncannibal.com>'
  },
  // uncomment below to send emails in development/test env:
  send: true,
  transport: nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
           user: process.env.GMAIL_ACCOUNT,
           pass: process.env.GMAIL_PASSWORD
       }
   })
});

app.post('/submit', (req, res) => {
  const body = req.body;
  email
  .send({
    template: 'mars',
    message: {
      to: 'tychambers3@gmail.com'
    },
    locals: {
      name: body.name,
      email: body.email,
      text: body.story,
      shared: body.shared
    }
  })
  .then()
  .catch(console.error);

  res.status(200).json({message: "Your story has been sent, thank you!"});
});

app.listen(port, () => console.log("App running on " + port));