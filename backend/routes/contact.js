const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/create-checkout-session', async (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ error: 'Product ID is required.' });
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

    // 1. Trimite email către tine (admin)
    await transporter.sendMail({
      from: process.env.ZOHO_USER,
      to: process.env.ZOHO_USER,
      subject: `Mesaj nou de la ${name}`,
      text: `Email: ${email}\n\nMesaj: ${message}`,
    });

    // 2. Trimite email de confirmare către client
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