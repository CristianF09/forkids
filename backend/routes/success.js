const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const { sendEmailWithAttachment } = require('../services/emailService');

router.get('/success', async (req, res) => {
  const sessionId = req.query.session_id;

  if (!sessionId) {
    return res.status(400).send('Lipsește session_id.');
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const customerEmail = session.customer_email;
    const productName = session.metadata.productName;

    // Trimite emailul cu PDF-ul aferent produsului
    await sendEmailWithAttachment(customerEmail, productName);

    res.status(200).send('Plata confirmată și email trimis!');
  } catch (error) {
    console.error('Eroare la trimiterea emailului după plată:', error.message);
    res.status(500).send('Eroare la procesarea plății.');
  }
});

module.exports = router; 