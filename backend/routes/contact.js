const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../services/emailService');

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (s) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[s]);
}

router.post('/', async (req, res) => {
  console.log('📧 Contact form submission received:', req.body);
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    console.log('❌ Missing required fields');
    return res.status(400).json({ error: 'Toate câmpurile sunt necesare.' });
  }

  // Respond immediately to avoid timeout
  res.status(200).json({ message: 'Mulțumim pentru mesaj! Vă vom contacta în curând.' });

  // Process email sending in background
  setImmediate(async () => {
    try {
      // Check if any email provider is configured
      if (!process.env.RESEND_API_KEY && (!process.env.ZMAIL_USER || !process.env.ZMAIL_PASS)) {
        console.log('❌ No email provider configured (RESEND_API_KEY or ZMAIL_USER/PASS required)');
        console.log('📧 Email content:', { name, email, message });
        return;
      }

      console.log('📧 Attempting to send email to contact@corcodusa.ro');
      console.log('📧 From:', name, '<' + email + '>');
      console.log('📧 Provider:', process.env.RESEND_API_KEY ? 'Resend' : 'Zoho');

      await sendContactEmail({ name, email, message });
      console.log('✅ Contact email sent successfully');

    } catch (error) {
      console.error('❌ Eroare la trimiterea emailului:', error.message);
    }
  });
});

// Test route for email functionality
router.get('/test-email', async (req, res) => {
  if (!process.env.RESEND_API_KEY && (!process.env.ZMAIL_USER || !process.env.ZMAIL_PASS)) {
    return res.json({
      success: false,
      message: 'No email provider configured',
      configured: false,
      user: process.env.ZMAIL_USER ? 'set' : 'missing',
      pass: process.env.ZMAIL_PASS ? 'set' : 'missing',
    });
  }

  const nodemailer = require('nodemailer');
  const useResend = !!process.env.RESEND_API_KEY;

  const transporter = useResend
    ? nodemailer.createTransport({
        host: 'smtp.resend.com',
        port: 465,
        secure: true,
        auth: { user: 'resend', pass: process.env.RESEND_API_KEY },
      })
    : nodemailer.createTransport({
        host: process.env.ZMAIL_HOST || 'smtp.zoho.eu',
        port: parseInt(process.env.ZMAIL_PORT || '587'),
        secure: process.env.ZMAIL_SECURE === 'true',
        requireTLS: process.env.ZMAIL_SECURE !== 'true',
        auth: { user: process.env.ZMAIL_USER, pass: process.env.ZMAIL_PASS },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000,
      });

  try {
    await transporter.verify();
    const from = useResend
      ? `"CorcoDușa Test" <contact@corcodusa.ro>`
      : `"CorcoDușa Test" <${process.env.ZMAIL_USER}>`;
    await transporter.sendMail({
      from,
      to: 'contact@corcodusa.ro',
      subject: `Test SMTP - ${useResend ? 'Resend' : 'Zoho'} - ${new Date().toISOString()}`,
      text: `SMTP test successful via ${useResend ? 'Resend' : 'Zoho'}`,
    });
    res.json({ success: true, message: `Email sent via ${useResend ? 'Resend' : 'Zoho'}`, provider: useResend ? 'resend' : 'zoho' });
  } catch (err) {
    res.json({ success: false, message: 'SMTP failed', error: err.message, provider: useResend ? 'resend' : 'zoho' });
  }
});

module.exports = router;
