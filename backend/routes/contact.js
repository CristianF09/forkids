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

  // Respond immediately to avoid timeout
  res.status(200).json({ message: 'Mulțumim pentru mesaj! Vă vom contacta în curând.' });

  // Process email sending in background
  setImmediate(async () => {
    try {
      // Check if email credentials are configured
      if (!process.env.ZMAIL_USER || !process.env.ZMAIL_PASS) {
        console.log('❌ Email credentials not configured');
        console.log('📧 Development mode - Email would be sent to: contact@corcodusa.ro');
        console.log('📧 Email content:', { name, email, message });
        return;
      }

      console.log('📧 Attempting to send email to contact@corcodusa.ro');
      console.log('📧 From:', name, '<' + email + '>');
      console.log('📧 Message:', message);
      console.log('📧 Using Zoho credentials:', {
        user: process.env.ZMAIL_USER,
        pass: process.env.ZMAIL_PASS ? '***configured***' : '***missing***',
      });

      // Send the actual email directly without verification
      await sendContactEmail({ name, email, message });
      console.log('✅ Contact email sent successfully');

    } catch (error) {
      console.error('❌ Eroare la trimiterea emailului:', error.message);
      console.error('❌ Full error:', error);

      // Try to send a simple email as fallback
      try {
        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
          host: 'smtp.zoho.eu',
          port: 587,
          secure: false,
          requireTLS: true,
          auth: {
            user: process.env.ZMAIL_USER,
            pass: process.env.ZMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: `"CorcoDușa Contact Form" <${process.env.ZMAIL_USER}>`,
          to: 'contact@corcodusa.ro',
          subject: 'Mesaj nou din formularul de contact',
          text: `Mesaj de la: ${name} (${email})\n\n${message}`,
          html: `
            <h3>Ai primit un mesaj nou de la ${name} (${email})</h3>
            <p><strong>Mesaj:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><small>Acest mesaj a fost trimis din formularul de contact de pe site-ul CorcoDușa.</small></p>
          `,
          replyTo: email,
          envelope: {
            from: process.env.ZMAIL_USER,
            to: 'contact@corcodusa.ro'
          },
          headers: {
            'X-Corcodusa-Contact': 'true'
          }
        });

        console.log('✅ Fallback email sent successfully');

      } catch (fallbackError) {
        console.error('❌ Fallback email also failed:', fallbackError.message);
        console.error('❌ Fallback error details:', fallbackError);
      }
    }
  });
});

// Test route for email functionality
router.get('/test-email', async (req, res) => {
  try {
    console.log('🧪 Testing email configuration...');

    if (!process.env.ZMAIL_USER || !process.env.ZMAIL_PASS) {
      return res.json({
        success: false,
        message: 'Email credentials not configured',
        configured: false,
        user: process.env.ZMAIL_USER ? 'set' : 'missing',
        pass: process.env.ZMAIL_PASS ? 'set' : 'missing',
      });
    }

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

    // Verify connection
    await transporter.verify();
    console.log('✅ Email transporter verified successfully');

    // Send test email
    await transporter.sendMail({
      from: `"CorcoDușa Test" <${process.env.ZMAIL_USER}>`,
      to: 'contact@corcodusa.ro',
      subject: 'Test Email - Contact Form Configuration',
      html: `
        <h3>Test Email Configuration</h3>
        <p>This is a test email to verify that the contact form email configuration is working correctly.</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        <hr>
        <p><small>Test message from CorcoDușa server.</small></p>
      `,
    });

    console.log('✅ Test email sent successfully');
    res.json({
      success: true,
      message: 'Test email sent successfully',
      configured: true,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('❌ Email test failed:', error.message);
    res.json({
      success: false,
      message: 'Email test failed',
      error: error.message,
      configured: !!(process.env.ZMAIL_USER && process.env.ZMAIL_PASS),
    });
  }
});

module.exports = router;
