const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { sendPDF } = require('../emailService'); // Adjust path as needed

// Stripe webhook endpoint
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const emailClient = session.customer_details.email;
    const product = session.metadata.product; // You must set this metadata when creating the session

    try {
      await sendPDF(emailClient, product);
      console.log('PDF sent to', emailClient);
    } catch (err) {
      console.error('Error sending PDF:', err);
    }
  }

  res.json({ received: true });
});

// Create payment intent
router.post('/create-payment-intent', async (req, res) => {
  const { priceId } = req.body;

  try {
    const price = await stripe.prices.retrieve(priceId);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: price.unit_amount,
      currency: price.currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating payment intent' });
  }
});


// Handle successful payment
router.post('/success', async (req, res) => {
  try {
    const { paymentIntentId, pdfId } = req.body;
    
    // Here you would typically:
    // 1. Verify the payment with Stripe
    // 2. Record the purchase in your database
    // 3. Generate a download link for the PDF
    
    res.json({ message: 'Payment successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error processing payment' });
  }
});

module.exports = router; 