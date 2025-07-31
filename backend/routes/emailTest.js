const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Test email endpoint
router.post('/test-email', async (req, res) => {
  try {
    console.log('🧪 Testing email configuration...');
    console.log('📧 ZMAIL_USER:', process.env.ZMAIL_USER ? '✅ Set' : '❌ Not set');
    console.log('🔑 ZMAIL_PASS:', process.env.ZMAIL_PASS ? '✅ Set' : '❌ Not set');

    // Check if credentials are configured
    if (!process.env.ZMAIL_USER || !process.env.ZMAIL_PASS) {
      console.error('❌ Email credentials not configured');
      return res.status(500).json({ 
        error: 'Email credentials not configured',
        message: 'Please set ZMAIL_USER and ZMAIL_PASS in your .env file'
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.eu',
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZMAIL_USER,
        pass: process.env.ZMAIL_PASS,
      },
    });

    // Test email
    const info = await transporter.sendMail({
      from: '"Corcodușa" <contact@corcodusa.ro>',
      to: 'contact@corcodusa.ro',
      subject: 'Test Email - Corcodușa',
      text: 'Acesta este un email de test pentru verificarea configurației SMTP.',
      html: `
        <h3>Test Email - Corcodușa</h3>
        <p>Acesta este un email de test pentru verificarea configurației SMTP.</p>
        <p><strong>Data:</strong> ${new Date().toLocaleString('ro-RO')}</p>
        <p><strong>Server:</strong> ${process.env.NODE_ENV || 'development'}</p>
        <hr>
        <p><small>Email de test automat generat de sistemul Corcodușa.</small></p>
      `,
    });

    console.log('✅ Test email sent successfully:', info.messageId);
    res.json({ 
      success: true, 
      messageId: info.messageId,
      message: 'Email de test trimis cu succes!'
    });
  } catch (err) {
    console.error('❌ Email test failed:', err.message);
    console.error('Full error:', err);
    res.status(500).json({ 
      success: false, 
      error: err.message,
      details: 'Verifică configurația SMTP și credențialele Zoho'
    });
  }
});

module.exports = router;