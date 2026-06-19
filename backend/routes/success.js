const express = require('express');
const router = express.Router();

// DISABLED — this route used to live at GET /api/success and send a
// product PDF by email based on a client-supplied session_id, with two
// serious problems found during a security audit:
//
//   1. It never checked session.payment_status, so it could be triggered
//      for any retrievable Stripe session regardless of whether it was
//      actually paid.
//   2. It passed session.metadata.productName — a free-text field set
//      from the original /create-checkout-session request body — straight
//      into a file path (services/emailService.js's sendEmailWithAttachment),
//      which is a path-traversal / arbitrary-file-read vector.
//
// It was also unused: the frontend's success page (frontend/src/pages/Success.js)
// only shows a static "thank you" message and never calls this endpoint.
// All real order fulfillment goes through the Stripe webhook
// (routes/webhook.js), which independently verifies payment_status and the
// PaymentIntent before sending anything. This file, and its require/mount
// in server.js, are intentionally left disconnected. Not deleted outright
// because file deletion is unavailable on this checkout (see audit notes);
// kept as an inert stub so the history of why it's gone is documented here.

module.exports = router;
