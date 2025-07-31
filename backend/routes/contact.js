const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../services/emailService');

router.post('/', async (req, res) => {
  console.log('📧 Contact form submission received:', req.body);
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    console.log('❌ Missing required fields');
    return res.status(400).json({ error: 'Toate câmpurile sunt necesare.' });
  }

  try {
    // Check if email credentials are configured
    if (!process.env.ZMAIL_USER || !process.env.ZMAIL_PASS) {
      console.log('❌ Email credentials not configured');
      console.log('📧 Development mode - Email would be sent to: contact@corcodusa.ro');
      console.log('📧 Email content:', { name, email, message });
      return res.status(200).json({ message: 'Mesajul a fost trimis cu succes (development mode).' });
    }
    
    // Send the actual email
    await sendContactEmail({ name, email, message });
    console.log('✅ Contact email sent successfully');
    res.status(200).json({ message: 'Mulțumim pentru mesaj! Vă vom contacta în curând.' });
  } catch (error) {
    console.error('❌ Eroare la trimiterea emailului:', error.message);
    res.status(500).json({ error: 'Eroare la trimiterea emailului. Încearcă din nou mai târziu.' });
  }
});

module.exports = router;
