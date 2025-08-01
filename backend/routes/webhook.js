const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const nodemailer = require('nodemailer');

// Initialize Stripe lazily (only when webhook is called)
let stripe = null;
function getStripe() {
  if (!stripe) {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      console.error('❌ STRIPE_SECRET_KEY not found in environment variables');
      throw new Error('STRIPE_SECRET_KEY is required');
    }
    stripe = Stripe(stripeSecretKey);
  }
  return stripe;
}
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
    
    event = getStripe().webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.log(`⚠️  Eroare webhook: ${err.message}`);
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  // Handle checkout.session.completed (your current logic)
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
      
      // Step 2: Send PDF to customer (Stripe will handle the invoice automatically)
      try {
        await sendEmailWithAttachment(customerEmail, pdfFileName);
        console.log('✅ PDF sent to customer:', customerEmail);
      } catch (pdfError) {
        console.log('⚠️ PDF attachment failed (file too large), sending notification instead');
        
        // Send PDF delivery notification instead
        const transporter = nodemailer.createTransport({
          host: 'smtp.zoho.eu',
          port: 465,
          secure: true,
          auth: {
            user: process.env.ZMAIL_USER,
            pass: process.env.ZMAIL_PASS,
          },
        });
        
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

  // Handle Stripe's automated invoice events
  if (event.type === 'invoice.payment_succeeded') {
    const invoice = event.data.object;
    const customerEmail = invoice.customer_email;
    const invoiceId = invoice.id;
    const amount = invoice.amount_paid / 100;
    const currency = invoice.currency?.toUpperCase() || 'RON';
    
    console.log('📄 Stripe invoice payment succeeded:', invoiceId);
    console.log('📧 Customer email:', customerEmail);
    console.log('💰 Amount:', amount, currency);
    
    // Extract product information from invoice
    let productName = 'Produs digital';
    let pdfFileName = 'Produs digital.pdf';
    
    if (invoice.lines && invoice.lines.data.length > 0) {
      const lineItem = invoice.lines.data[0];
      const priceId = lineItem.price?.id;
      
      if (priceId) {
        const product = products[priceId];
        if (product) {
          productName = product.name;
          pdfFileName = product.filePath;
          console.log('📦 Product found from invoice:', productName, 'PDF:', pdfFileName);
        }
      }
    }
    
    try {
      // Send PDF to customer (invoice is already sent by Stripe)
      try {
        await sendEmailWithAttachment(customerEmail, pdfFileName);
        console.log('✅ PDF sent to customer after invoice:', customerEmail);
      } catch (pdfError) {
        console.log('⚠️ PDF attachment failed (file too large), sending notification instead');
        
        const transporter = nodemailer.createTransport({
          host: 'smtp.zoho.eu',
          port: 465,
          secure: true,
          auth: {
            user: process.env.ZMAIL_USER,
            pass: process.env.ZMAIL_PASS,
          },
        });
        
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
      
      console.log('🎉 Invoice processing completed successfully!');
      
    } catch (error) {
      console.error('❌ Error processing invoice:', error);
      return res.status(500).end();
    }
  }

  res.status(200).json({ received: true });
});

module.exports = router;