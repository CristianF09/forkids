const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Creează sesiune Stripe Checkout
router.post('/create-checkout-session', async (req, res) => {
  const { priceId, customerEmail, productName } = req.body;

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
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      metadata: {
        productName: productName || 'Unknown product',
      },
      customer_email: customerEmail || undefined, // dacă frontend-ul trimite emailul utilizatorului
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Eroare la crearea sesiunii Stripe:', err.message);
    res.status(500).json({ error: 'Eroare la crearea sesiunii de plată.' });
  }
});

module.exports = router;
