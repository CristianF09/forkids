const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Toate câmpurile sunt obligatorii.' });
  }
  // Optionally: validate email format here

  try {
    // Use your Zoho transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.eu",
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_USER,
        pass: process.env.ZOHO_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Contact Form" <${process.env.ZOHO_USER}>`,
      to: process.env.ZOHO_USER, // send to yourself
      subject: `Mesaj nou de la ${name}`,
      text: `Email: ${email}\n\nMesaj:\n${message}`,
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Eroare la trimiterea mesajului:', err);
    res.status(500).json({ error: 'Eroare la trimiterea mesajului.' });
  }
});

module.exports = router; 