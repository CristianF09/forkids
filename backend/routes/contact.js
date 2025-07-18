const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../emailService');

console.log("POST /api/contact", req.body);

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Toate câmpurile sunt obligatorii.' });
  }

  try {
    console.log('🟢 Trimit email din formular:', req.body); // Log de test
    await sendContactEmail({ name, email, message });
    res.status(200).json({ message: 'Email trimis cu succes' });
  } catch (error) {
    console.error('🔴 Eroare la trimiterea emailului:', error);
    res.status(500).json({ message: 'A apărut o eroare la trimiterea emailului' });
  }
});

module.exports = router;
