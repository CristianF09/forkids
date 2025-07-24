const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const { sendEmailWithAttachment } = require('../services/emailService');

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
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
    
    // Trimite emailul cu fișierul PDF
    await sendEmailWithAttachment(customerEmail, productName);
  }

  res.status(200).json({ received: true });
});

module.exports = router;