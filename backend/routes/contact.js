const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../services/emailService');

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Toate câmpurile sunt obligatorii.' });
  }

  try {
    await sendContactEmail({ name, email, message });
    res.json({ success: true, message: 'Mesaj trimis cu succes!' });
  } catch (err) {
    console.error('Eroare la trimiterea emailului de contact:', err);
    res.status(500).json({ error: 'Eroare la trimiterea mesajului.' });
  }
});

module.exports = router;
