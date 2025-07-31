const express = require('express');
const router = express.Router();
const Stripe = require('stripe');

// Use only environment variable for Stripe key
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  console.error('❌ STRIPE_SECRET_KEY not found in environment variables');
  throw new Error('STRIPE_SECRET_KEY is required');
}

console.log('🔑 Using Stripe key:', stripeSecretKey.substring(0, 20) + '...');

// Initialize Stripe with the secret key
const stripe = Stripe(stripeSecretKey);

const products = require('../config/products');

// Creează sesiune Stripe Checkout
router.post('/create-checkout-session', async (req, res) => {
  const { priceId, customerEmail, productName } = req.body;

  console.log('📦 Checkout request received:', { priceId, customerEmail, productName });

  if (!priceId) {
    console.log('❌ Price ID is missing');
    return res.status(400).json({ error: 'Price ID is required.' });
  }

  try {
    console.log('🔧 Creating Stripe session with price ID:', priceId);
    
    // First, let's verify the price exists
    try {
      const price = await stripe.prices.retrieve(priceId);
      console.log('✅ Price found:', price.id, price.unit_amount, price.currency);
    } catch (priceError) {
      console.error('❌ Price not found:', priceId, priceError.message);
      return res.status(400).json({ 
        error: 'Price ID not found in Stripe.',
        details: priceError.message 
      });
    }
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL || 'http://localhost:3000'}/cancel`,
      metadata: {
        productName: productName || 'Unknown product',
      },
      customer_email: customerEmail || undefined, // dacă frontend-ul trimite emailul utilizatorului
    });

    console.log('✅ Stripe session created successfully:', session.url);
    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('❌ Eroare la crearea sesiunii Stripe:', err.message);
    console.error('❌ Stripe error details:', err);
    res.status(500).json({ 
      error: 'Eroare la crearea sesiunii de plată.',
      details: err.message 
    });
  }
});

module.exports = router;
