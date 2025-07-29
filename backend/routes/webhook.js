const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const { sendEmailWithAttachment } = require('../services/emailService');
const products = require('../config/products');

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
    
    // Get the line items to find the price ID
    const lineItems = session.line_items?.data || [];
    let pdfFileName = 'Produs digital.pdf';
    
    if (lineItems.length > 0) {
      const priceId = lineItems[0].price.id;
      const product = products[priceId];
      
      if (product) {
        pdfFileName = product.filePath;
        console.log('📦 Product found:', product.name, 'PDF:', pdfFileName);
      } else {
        console.log('⚠️ Product not found for price ID:', priceId);
      }
    }
    
    console.log('📦 Session metadata:', session.metadata);
    console.log('📧 Trimitem către:', customerEmail, 'PDF:', pdfFileName);
    
    try {
      await sendEmailWithAttachment(customerEmail, pdfFileName);
      console.log('✅ Email trimis către:', customerEmail);
    } catch (error) {
      console.error('❌ Eroare trimitere email:', error);
      return res.status(500).end();
    }
  }

  res.status(200).json({ received: true });
});

module.exports = router;