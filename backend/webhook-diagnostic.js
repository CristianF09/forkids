require('dotenv').config();
const express = require('express');
const Stripe = require('stripe');

console.log('🔍 Webhook Diagnostic Tool');
console.log('==========================');

// Check environment variables
console.log('\n📋 Environment Variables:');
console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? '✅ Set' : '❌ Not set');
console.log('STRIPE_WEBHOOK_SECRET:', process.env.STRIPE_WEBHOOK_SECRET ? '✅ Set' : '❌ Not set');
console.log('ZMAIL_USER:', process.env.ZMAIL_USER ? '✅ Set' : '❌ Not set');
console.log('ZMAIL_PASS:', process.env.ZMAIL_PASS ? '✅ Set' : '❌ Not set');

// Test Stripe connection
const stripe = Stripe(process.env.STRIPE_SECRET_KEY || 'sk_live_placeholder');

async function testStripeConnection() {
  try {
    console.log('\n🔗 Testing Stripe Connection...');
    const account = await stripe.accounts.retrieve();
    console.log('✅ Stripe connection successful');
    console.log('📧 Account email:', account.email);
  } catch (error) {
    console.log('❌ Stripe connection failed:', error.message);
  }
}

// Test webhook endpoint
async function testWebhookEndpoint() {
  console.log('\n🌐 Testing Webhook Endpoint...');
  
  try {
    const response = await fetch('http://localhost:10000/api/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'stripe-signature': 'test-signature'
      },
      body: JSON.stringify({ test: true })
    });
    
    console.log('📡 Webhook endpoint response status:', response.status);
    const text = await response.text();
    console.log('📄 Response:', text.substring(0, 200));
  } catch (error) {
    console.log('❌ Webhook endpoint test failed:', error.message);
  }
}

// Test webhook signature construction
function testWebhookSignature() {
  console.log('\n🔐 Testing Webhook Signature...');
  
  const testEvent = {
    id: 'evt_test',
    object: 'event',
    type: 'checkout.session.completed',
    data: {
      object: {
        id: 'cs_test',
        customer_email: 'test@example.com',
        amount_total: 3900,
        currency: 'ron'
      }
    }
  };
  
  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.log('❌ STRIPE_WEBHOOK_SECRET not set');
      return;
    }
    
    // Create a test signature
    const crypto = require('crypto');
    const timestamp = Math.floor(Date.now() / 1000);
    const payload = JSON.stringify(testEvent);
    const signedPayload = `${timestamp}.${payload}`;
    const signature = crypto.createHmac('sha256', webhookSecret).update(signedPayload, 'utf8').digest('hex');
    const stripeSignature = `t=${timestamp},v1=${signature}`;
    
    console.log('✅ Webhook signature construction successful');
    console.log('📝 Test signature:', stripeSignature.substring(0, 50) + '...');
  } catch (error) {
    console.log('❌ Webhook signature test failed:', error.message);
  }
}

async function main() {
  await testStripeConnection();
  await testWebhookEndpoint();
  testWebhookSignature();
  
  console.log('\n📋 Next Steps:');
  console.log('1. Check if your Stripe Dashboard has webhook configured');
  console.log('2. Webhook URL should be: http://localhost:10000/api/webhook');
  console.log('3. Event type should be: checkout.session.completed');
  console.log('4. For local testing, you might need ngrok: ngrok http 10000');
}

main().catch(console.error); 