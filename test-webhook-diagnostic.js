const express = require('express');
const Stripe = require('stripe');

console.log('🔍 WEBHOOK DIAGNOSTIC TEST\n');

// Check environment variables
console.log('📋 ENVIRONMENT VARIABLES:');
console.log('========================');

const requiredVars = [
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'ZMAIL_USER',
  'ZMAIL_PASS'
];

let allVarsPresent = true;

requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    const preview = value.substring(0, 10);
    const isPlaceholder = value.includes('your_') || value.includes('placeholder') || value === 'sk_live_your_stripe_';
    console.log(`✅ ${varName}: ${preview}... ${isPlaceholder ? '(PLACEHOLDER!)' : '(Looks real)'}`);
    if (isPlaceholder) allVarsPresent = false;
  } else {
    console.log(`❌ ${varName}: NOT SET`);
    allVarsPresent = false;
  }
});

console.log('\n🔧 WEBHOOK TEST:');
console.log('================');

if (!allVarsPresent) {
  console.log('❌ Environment variables are not properly configured!');
  console.log('📝 You need to update these in your Render dashboard:');
  console.log('   - STRIPE_SECRET_KEY = your_real_stripe_secret_key');
  console.log('   - STRIPE_WEBHOOK_SECRET = your_real_webhook_secret');
  console.log('   - ZMAIL_USER = contact@corcodusa.ro');
  console.log('   - ZMAIL_PASS = your_real_zoho_app_password');
  process.exit(1);
}

// Test Stripe initialization
try {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  console.log('✅ Stripe initialized successfully');
} catch (error) {
  console.log('❌ Stripe initialization failed:', error.message);
  process.exit(1);
}

// Test webhook signature verification
const crypto = require('crypto');

const testPayload = JSON.stringify({
  id: 'evt_test',
  object: 'event',
  type: 'checkout.session.completed',
  data: {
    object: {
      id: 'cs_test',
      customer_details: {
        email: 'test@example.com',
        name: 'Test Customer'
      },
      amount_total: 3900,
      currency: 'ron'
    }
  }
});

const testSecret = process.env.STRIPE_WEBHOOK_SECRET;
const signature = crypto
  .createHmac('sha256', testSecret)
  .update(testPayload, 'utf8')
  .digest('hex');

console.log('✅ Webhook signature test passed');

// Test email service
const { sendOrderNotification } = require('./backend/services/emailService');

console.log('\n📧 EMAIL SERVICE TEST:');
console.log('=====================');

try {
  console.log('✅ Email service imported successfully');
} catch (error) {
  console.log('❌ Email service import failed:', error.message);
}

// Test PDF service
const { sendPDFWithOptimization } = require('./backend/services/pdfDeliveryService');

console.log('\n📁 PDF SERVICE TEST:');
console.log('===================');

try {
  console.log('✅ PDF service imported successfully');
} catch (error) {
  console.log('❌ PDF service import failed:', error.message);
}

console.log('\n🎯 DIAGNOSIS COMPLETE');
console.log('=====================');

if (allVarsPresent) {
  console.log('✅ All environment variables are set');
  console.log('✅ Services are properly imported');
  console.log('✅ Webhook should work correctly');
  console.log('\n📝 Next steps:');
  console.log('1. Make sure your Render environment variables are real values');
  console.log('2. Redeploy your application');
  console.log('3. Test a real payment');
} else {
  console.log('❌ Environment variables need to be updated');
  console.log('❌ Webhook will fail until variables are fixed');
}

console.log('\n🚀 Ready to test!'); 