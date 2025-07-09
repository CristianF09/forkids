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
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: 'usd',
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

// Create Stripe Checkout session
router.post('/create-checkout-session', async (req, res) => {
  const { priceId } = req.body;
  if (!priceId) {
    return res.status(400).json({ error: 'Price ID is required.' });
  }
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });
    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Eroare la crearea sesiunii de plată.' });
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