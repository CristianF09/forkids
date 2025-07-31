require('dotenv').config();
const crypto = require('crypto');
const Stripe = require('stripe');

console.log('🧪 Manual Webhook Test');
console.log('======================');

// Create a test webhook event
const testEvent = {
  id: 'evt_test_manual',
  object: 'event',
  type: 'checkout.session.completed',
  data: {
    object: {
      id: 'cs_test_manual',
      object: 'checkout.session',
      customer_email: 'cris7i_laurentiu@yahoo.com',
      amount_total: 8999, // 89.99 RON in cents
      currency: 'ron',
      line_items: {
        data: [{
          price: {
            id: 'price_1Rkl17K6Qc2WK3kdsulZ1UxS' // Pachet Complet price ID
          }
        }]
      },
      metadata: {}
    }
  }
};

// Create webhook signature
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
if (!webhookSecret) {
  console.log('❌ STRIPE_WEBHOOK_SECRET not set');
  process.exit(1);
}

const timestamp = Math.floor(Date.now() / 1000);
const payload = JSON.stringify(testEvent);
const signedPayload = `${timestamp}.${payload}`;
const signature = crypto.createHmac('sha256', webhookSecret).update(signedPayload, 'utf8').digest('hex');
const stripeSignature = `t=${timestamp},v1=${signature}`;

console.log('📦 Test event created');
console.log('📧 Customer email:', testEvent.data.object.customer_email);
console.log('💰 Amount:', testEvent.data.object.amount_total / 100, 'RON');
console.log('🔐 Signature created');

// Send to local webhook endpoint
async function testWebhook() {
  try {
    console.log('\n📡 Sending test webhook to local server...');
    
    const response = await fetch('http://localhost:10000/api/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'stripe-signature': stripeSignature
      },
      body: payload
    });
    
    console.log('📊 Response status:', response.status);
    const responseText = await response.text();
    console.log('📄 Response:', responseText);
    
    if (response.status === 200) {
      console.log('✅ Webhook test successful!');
      console.log('📧 Check your email for:');
      console.log('   - Order notification to contact@corcodusa.ro');
      console.log('   - Invoice to cris7i_laurentiu@yahoo.com');
      console.log('   - PDF files to cris7i_laurentiu@yahoo.com');
    } else {
      console.log('❌ Webhook test failed');
    }
    
  } catch (error) {
    console.log('❌ Error testing webhook:', error.message);
  }
}

testWebhook(); 