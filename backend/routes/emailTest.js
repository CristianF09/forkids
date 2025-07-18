const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.get('/', async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.eu',
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZMAIL_USER,
        pass: process.env.ZMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Test Corcodușa" <${process.env.ZMAIL_USER}>`,
      to: process.env.ZMAIL_USER,
      subject: 'Test email Corcodușa',
      text: 'Acesta este un email de test de pe corcodusa.ro',
    });

    res.json({ success: true, messageId: info.messageId });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
