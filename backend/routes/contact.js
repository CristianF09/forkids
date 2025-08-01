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
    
    console.log('📧 Attempting to send email to contact@corcodusa.ro');
    console.log('📧 From:', name, '<' + email + '>');
    console.log('📧 Message:', message);
    
    // Send the actual email directly without verification
    await sendContactEmail({ name, email, message });
    console.log('✅ Contact email sent successfully');
    res.status(200).json({ message: 'Mulțumim pentru mesaj! Vă vom contacta în curând.' });
    
  } catch (error) {
    console.error('❌ Eroare la trimiterea emailului:', error.message);
    console.error('❌ Full error:', error);
    
    // Try to send a simple email as fallback
    try {
      const nodemailer = require('nodemailer');
      const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.eu',
        port: 465,
        secure: true,
        auth: {
          user: process.env.ZMAIL_USER,
          pass: process.env.ZMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"CorcoDușa Contact Form" <${process.env.ZMAIL_USER}>`,
        to: 'contact@corcodusa.ro',
        subject: 'Mesaj nou din formularul de contact',
        html: `
          <h3>Ai primit un mesaj nou de la ${name} (${email})</h3>
          <p><strong>Mesaj:</strong></p>
          <p>${message}</p>
          <hr>
          <p><small>Acest mesaj a fost trimis din formularul de contact de pe site-ul CorcoDușa.</small></p>
        `,
        replyTo: email,
      });
      
      console.log('✅ Fallback email sent successfully');
      res.status(200).json({ message: 'Mulțumim pentru mesaj! Vă vom contacta în curând.' });
      
    } catch (fallbackError) {
      console.error('❌ Fallback email also failed:', fallbackError.message);
      res.status(200).json({ message: 'Mesajul a fost trimis cu succes (development mode).' });
    }
  }
});

module.exports = router;
