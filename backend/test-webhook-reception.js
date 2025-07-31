require('dotenv').config();
const express = require('express');
const app = express();

console.log('🧪 Testing Webhook Reception');
console.log('============================');

// Create a simple test server to check webhook reception
const testPort = 10001;
const testApp = express();

// Add raw body parsing for webhook
testApp.use('/test-webhook', express.raw({ type: 'application/json' }));

testApp.post('/test-webhook', (req, res) => {
  console.log('📥 Webhook received!');
  console.log('📋 Headers:', req.headers);
  console.log('📦 Body length:', req.body.length);
  console.log('📄 Body preview:', req.body.toString().substring(0, 200) + '...');
  
  res.status(200).json({ received: true });
});

testApp.listen(testPort, () => {
  console.log(`🚀 Test webhook server running on port ${testPort}`);
  console.log(`📡 Webhook URL: http://localhost:${testPort}/test-webhook`);
  console.log('\n📋 Instructions:');
  console.log('1. Go to your Stripe Dashboard');
  console.log('2. Navigate to Developers > Webhooks');
  console.log('3. Add endpoint: http://localhost:10001/test-webhook');
  console.log('4. Select event: checkout.session.completed');
  console.log('5. Make a test payment');
  console.log('6. Check this console for webhook reception');
});

// Also test the main webhook endpoint
const mainWebhookUrl = 'http://localhost:10000/api/webhook';
console.log(`\n🔗 Main webhook URL: ${mainWebhookUrl}`);
console.log('📋 Make sure this URL is configured in Stripe Dashboard'); 