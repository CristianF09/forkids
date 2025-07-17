// backend/routes/contact.js

const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../emailService');

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!email || !message || !name) {
    return res.status(400).json({ error: 'Toate câmpurile sunt necesare.' });
  }

  try {
    await sendContactEmail(name, email, message);
    res.json({ success: true });
  } catch (err) {
    console.error('Eroare la trimiterea mesajului:', err);
    res.status(500).json({ error: 'Eroare la trimiterea mesajului.' });
  }
});

module.exports = router;
