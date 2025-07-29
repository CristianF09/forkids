const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../services/emailService'); // ajustează calea dacă e nevoie

router.post('/', async (req, res) => {
  console.log('📧 Contact form submission received:', req.body);
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    console.log('❌ Missing required fields');
    return res.status(400).json({ error: 'Toate câmpurile sunt necesare.' });
  }

  try {
    // For development, just log the email instead of sending it
    console.log('📧 Contact form submission:', { name, email, message });
    console.log('📧 Development mode - Email would be sent to: contact@corcodusa.ro');
    
    // Always return success for now (development mode)
    return res.status(200).json({ message: 'Mulțumim pentru mesaj! Vă vom contacta în curând.' });
    
    // Uncomment below when email is configured
    // if (!process.env.ZMAIL_USER || !process.env.ZMAIL_PASS) {
    //   console.log('📧 Development mode - Email would be sent to:', process.env.ZMAIL_USER || 'contact@corcodusa.ro');
    //   console.log('📧 Email content:', { name, email, message });
    //   return res.status(200).json({ message: 'Mesajul a fost trimis cu succes (development mode).' });
    // }
    
    // await sendContactEmail({ name, email, message });
    // res.status(200).json({ message: 'Mesajul a fost trimis cu succes.' });
  } catch (error) {
    console.error('❌ Eroare la trimiterea emailului:', error.message);
    res.status(500).json({ error: 'Eroare la trimiterea emailului. Încearcă din nou mai târziu.' });
  }
});

module.exports = router;
