const express = require('express');
const router = express.Router();
const Stripe = require('stripe');

// Use only environment variable for Stripe key
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  console.error('❌ STRIPE_SECRET_KEY not found in environment variables');
  throw new Error('STRIPE_SECRET_KEY is required');
}

const stripe = Stripe(stripeSecretKey);

// Creează Payment Intent pentru plăți directe
router.post('/create-payment-intent', async (req, res) => {
  const { amount, currency = 'ron' } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe folosește cenți
      currency: currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Eroare la crearea Payment Intent:', error);
    res.status(500).json({ error: 'Eroare la procesarea plății.' });
  }
});

// Returnează configurația Stripe pentru frontend
router.get('/config', (req, res) => {
  const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
  if (!publishableKey) {
    console.error('❌ STRIPE_PUBLISHABLE_KEY not found in environment variables');
    return res.status(500).json({ error: 'Stripe configuration not found' });
  }
  
  res.json({
    publishableKey: publishableKey,
  });
});

module.exports = router;
