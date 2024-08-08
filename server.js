const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const port = process.env.port || 5000;

app.use(bodyParser.json());
app.use(cors());

app.post('/send', (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ekundayomayor@gmail.com',
      pass: 'cvpf dcoc moyp jojf', // Use your App Password here
    },
  });

  const mailOptions = {
    from: email,
    to: 'ekundayomayor@gmail.com',
    subject: `Contact form submission from ${name}`,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
