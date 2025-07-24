const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../services/emailService'); // ajustează calea dacă e nevoie

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Toate câmpurile sunt necesare.' });
  }

  try {
    await sendContactEmail({ name, email, message });
    res.status(200).json({ message: 'Mesajul a fost trimis cu succes.' });
  } catch (error) {
    console.error('Eroare la trimiterea emailului:', error.message);
    res.status(500).json({ error: 'Eroare la trimiterea emailului. Încearcă din nou mai târziu.' });
  }
});

module.exports = router;
