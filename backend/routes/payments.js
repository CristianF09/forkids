const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const { sendPDF } = require('../services/emailService'); // Calea către serviciul de email

// Stripe webhook endpoint - primește notificări de la Stripe
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Procesăm evenimentul la finalizarea plății
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const emailClient = session.customer_details.email;
    const product = session.metadata.product; // trebuie să setezi metadata.product când creezi sesiunea

    try {
      await sendPDF(emailClient, product);
      console.log(`PDF trimis către: ${emailClient}`);
    } catch (err) {
      console.error('Eroare la trimiterea PDF-ului:', err);
    }
  }

  res.json({ received: true });
});

// Creează Payment Intent pentru plăți directe
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // convertim la cenți
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Eroare la crearea Payment Intent:', error);
    res.status(500).json({ message: 'Eroare la crearea Payment Intent' });
  }
});

// Creează sesiunea Checkout (pentru checkout-ul Stripe)
router.post('/create-checkout-session', async (req, res) => {
  const { priceId, productId } = req.body;

  if (!priceId || !productId) {
    return res.status(400).json({ error: 'Price ID și Product ID sunt necesare.' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      metadata: { product: productId }, // aici trimitem productId ca metadata
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Eroare la crearea sesiunii Checkout:', err);
    res.status(500).json({ error: 'Eroare la crearea sesiunii de plată.' });
  }
});

// Endpoint dummy pentru success (poate fi extins)
router.post('/success', async (req, res) => {
  try {
    // aici poți verifica plata, salva în DB, etc.
    res.json({ message: 'Plată realizată cu succes' });
  } catch (error) {
    console.error('Eroare la procesarea plății:', error);
    res.status(500).json({ message: 'Eroare la procesarea plății' });
  }
});

module.exports = router;
