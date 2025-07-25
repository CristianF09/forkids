const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const { sendEmailWithAttachment } = require('../services/emailService');
const axios = require('axios'); // for downloading invoice PDF

router.post('/', async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log(`⚠️  Eroare webhook: ${err.message}`);
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const customerEmail = session.customer_email;
    const productName = session.metadata?.productName || 'Produs digital';
    try {
      await sendEmailWithAttachment(customerEmail, productName);
      console.log('✅ Email trimis către:', customerEmail);
    } catch (error) {
      console.error('❌ Eroare trimitere email:', error);
      return res.status(500).end();
    }

    // Send invoice if available
    if (session.invoice) {
      try {
        const invoice = await stripe.invoices.retrieve(session.invoice);
        if (invoice && invoice.invoice_pdf) {
          const response = await axios.get(invoice.invoice_pdf, { responseType: 'arraybuffer' });
          const invoiceBuffer = Buffer.from(response.data, 'binary');

          // Use nodemailer directly for invoice
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
            from: `"Corcodușa" <${process.env.ZMAIL_USER}>`,
            to: customerEmail,
            subject: 'Factura ta de la Corcodușa',
            text: 'Atașat găsești factura pentru achiziția ta. Mulțumim!',
            attachments: [
              {
                filename: 'Factura-Corcodusa.pdf',
                content: invoiceBuffer,
              },
            ],
          });
          console.log('✅ Factura trimisă către:', customerEmail);
        }
      } catch (error) {
        console.error('❌ Eroare trimitere factură:', error);
      }
    }
  }

  res.status(200).json({ received: true });
});

module.exports = router;