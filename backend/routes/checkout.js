const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {
  const { productId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: productId, // acesta e ID-ul prețului din Stripe (ex: price_1OnPziHdK... )
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://corcodusa.ro/success',
      cancel_url: 'https://corcodusa.ro/cancel',
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ error: 'Stripe session error' });
  }
});

module.exports = router; 