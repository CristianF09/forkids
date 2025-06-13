const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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