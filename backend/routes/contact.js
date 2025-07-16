// backend/routes/contact.js

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!email || !message || !name) {
    return res.status(400).json({ error: 'Toate câmpurile sunt necesare.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.eu',
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_USER,
        pass: process.env.ZOHO_PASS,
      },
    });

    // 1. Trimite email către admin
    await transporter.sendMail({
      from: process.env.ZOHO_USER,
      to: process.env.ZOHO_USER,
      subject: `Mesaj nou de la ${name}`,
      text: `Email: ${email}\n\nMesaj: ${message}`,
    });

    // 2. Confirmare către client
    await transporter.sendMail({
      from: process.env.ZOHO_USER,
      to: email,
      subject: `Am primit mesajul tău!`,
      text: `Salut ${name},\n\nMulțumim că ne-ai scris! Mesajul tău a fost primit și îți vom răspunde în cel mai scurt timp.\n\nEchipa Corcodușa`,
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Eroare la trimiterea mesajului:', err);
    res.status(500).json({ error: 'Eroare la trimiterea mesajului.' });
  }
});

module.exports = router;
