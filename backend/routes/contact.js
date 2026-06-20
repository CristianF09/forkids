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
  const useResend = !!process.env.RESEND_API_KEY;

  if (!useResend && (!process.env.ZMAIL_USER || !process.env.ZMAIL_PASS)) {
    return res.json({ success: false, message: 'No email provider configured', configured: false });
  }

  try {
    const { sendContactEmail } = require('../services/emailService');
    await sendContactEmail({
      name: 'Test',
      email: 'test@corcodusa.ro',
      message: `Email test via ${useResend ? 'Resend HTTP API' : 'Zoho SMTP'} - ${new Date().toISOString()}`,
    });
    res.json({ success: true, message: `Email sent via ${useResend ? 'Resend' : 'Zoho'}`, provider: useResend ? 'resend' : 'zoho' });
  } catch (err) {
    res.json({ success: false, message: 'Email failed', error: err.message, provider: useResend ? 'resend' : 'zoho' });
  }
});

module.exports = router;
