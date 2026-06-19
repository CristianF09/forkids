const mongoose = require('mongoose');

// Tracks Stripe webhook event IDs we've already fulfilled, so that Stripe's
// automatic retries (timeouts, transient 5xxs, etc.) don't trigger duplicate
// order fulfillment — i.e. the customer getting the PDF/ZIP and the order
// notification email more than once for the same purchase.
//
// The unique index on eventId is what actually enforces "only once": a
// second insert for the same Stripe event ID throws a duplicate-key error
// (code 11000), which webhook.js uses as the signal to skip fulfillment.
const processedWebhookEventSchema = new mongoose.Schema({
  eventId: { type: String, required: true, unique: true },
  // TTL index: documents auto-expire 30 days after creation so this
  // collection doesn't grow forever. Stripe doesn't retry events anywhere
  // near that long, so this window is generous.
  processedAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 * 30 },
});

module.exports = mongoose.models.ProcessedWebhookEvent
  || mongoose.model('ProcessedWebhookEvent', processedWebhookEventSchema);
