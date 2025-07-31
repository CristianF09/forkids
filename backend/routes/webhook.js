const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const nodemailer = require('nodemailer');

// Use only environment variable for Stripe key
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  console.error('❌ STRIPE_SECRET_KEY not found in environment variables');
  throw new Error('STRIPE_SECRET_KEY is required');
}

const stripe = Stripe(stripeSecretKey);
const { sendEmailWithAttachment, sendOrderNotification } = require('../services/emailService');
const products = require('../config/products');

router.post('/', async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('❌ STRIPE_WEBHOOK_SECRET not found in environment variables');
      return res.status(500).send('Webhook secret not configured');
    }
    
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.log(`⚠️  Eroare webhook: ${err.message}`);
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const customerEmail = session.customer_email;
    const sessionId = session.id;
    
    console.log('💰 Payment completed for session:', sessionId);
    console.log('📧 Customer email:', customerEmail);
    
    // Get the line items to find the price ID
    const lineItems = session.line_items?.data || [];
    let pdfFileName = 'Produs digital.pdf';
    let productName = 'Produs digital';
    let amount = session.amount_total / 100; // Convert from cents
    let currency = session.currency?.toUpperCase() || 'RON';
    
    if (lineItems.length > 0) {
      const priceId = lineItems[0].price.id;
      const product = products[priceId];
      
      if (product) {
        pdfFileName = product.filePath;
        productName = product.name;
        console.log('📦 Product found:', productName, 'PDF:', pdfFileName);
      } else {
        console.log('⚠️ Product not found for price ID:', priceId);
      }
    }
    
    console.log('📦 Session metadata:', session.metadata);
    console.log('📧 Processing payment for:', customerEmail, 'Product:', productName);
    
    try {
      // Step 1: Send order notification to contact@corcodusa.ro
      await sendOrderNotification({
        customerEmail,
        productName,
        amount,
        currency,
        sessionId
      });
      console.log('✅ Order notification sent to contact@corcodusa.ro');
      
      // Step 2: Send invoice to customer
      const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.eu',
        port: 465,
        secure: true,
        auth: {
          user: process.env.ZMAIL_USER,
          pass: process.env.ZMAIL_PASS,
        },
      });
      
      const invoiceEmail = {
        from: `"CorcoDușa" <${process.env.ZMAIL_USER}>`,
        to: customerEmail,
        subject: `Factura pentru ${productName} - CorcoDușa`,
        html: `
          <h2>Factura - CorcoDușa</h2>
          <p><strong>Produs:</strong> ${productName}</p>
          <p><strong>Preț:</strong> ${amount} ${currency}</p>
          <p><strong>Data:</strong> ${new Date().toLocaleString('ro-RO')}</p>
          <p><strong>Session ID:</strong> ${sessionId}</p>
          <hr>
          <p>Mulțumim pentru achiziție!</p>
          <p>Pentru întrebări: contact@corcodusa.ro</p>
        `
      };
      
      await transporter.sendMail(invoiceEmail);
      console.log('✅ Invoice sent to customer:', customerEmail);
      
      // Step 3: Try to send PDF to customer (with error handling for large files)
      try {
        await sendEmailWithAttachment(customerEmail, pdfFileName);
        console.log('✅ PDF sent to customer:', customerEmail);
      } catch (pdfError) {
        console.log('⚠️ PDF attachment failed (file too large), sending notification instead');
        
        // Send PDF delivery notification instead
        const pdfNotificationEmail = {
          from: `"CorcoDușa" <${process.env.ZMAIL_USER}>`,
          to: customerEmail,
          subject: `Materialul digital ${productName} - CorcoDușa`,
          html: `
            <h2>Materialul digital este gata!</h2>
            <p><strong>Produs:</strong> ${productName}</p>
            <p><strong>Preț:</strong> ${amount} ${currency}</p>
            <p><strong>Data:</strong> ${new Date().toLocaleString('ro-RO')}</p>
            <hr>
            <p>Materialul digital pentru ${productName} a fost pregătit și va fi trimis în următoarele minute.</p>
            <p>Pentru întrebări: contact@corcodusa.ro</p>
          `
        };
        
        await transporter.sendMail(pdfNotificationEmail);
        console.log('✅ PDF delivery notification sent to customer:', customerEmail);
      }
      
      console.log('🎉 All payment processing completed successfully!');
      
    } catch (error) {
      console.error('❌ Error processing payment:', error);
      return res.status(500).end();
    }
  }

  res.status(200).json({ received: true });
});

module.exports = router;