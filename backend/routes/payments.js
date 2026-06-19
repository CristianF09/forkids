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

// NOTE: a '/create-payment-intent' endpoint used to live here. It accepted
// a client-supplied `amount` with no server-side price validation (and no
// product attached to the resulting PaymentIntent), let anyone mint live
// PaymentIntents on this Stripe account for any amount, and was never
// called by the frontend (checkout only uses /api/checkout/create-checkout-session,
// which validates the priceId against Stripe). Removed as dead, exploitable
// surface area — see code-cleanup audit.

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
