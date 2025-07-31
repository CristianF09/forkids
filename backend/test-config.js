require('dotenv').config();
const products = require('./config/products');

console.log('🔧 Testing CorcoDușa Configuration');
console.log('==================================\n');

// Test environment variables
console.log('📧 Email Configuration:');
console.log('ZMAIL_USER:', process.env.ZMAIL_USER ? '✅ Set' : '❌ Not set');
console.log('ZMAIL_PASS:', process.env.ZMAIL_PASS ? '✅ Set' : '❌ Not set');

console.log('\n💳 Stripe Configuration:');
console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? '✅ Set' : '❌ Using default');
console.log('STRIPE_PUBLISHABLE_KEY:', process.env.STRIPE_PUBLISHABLE_KEY ? '✅ Set' : '❌ Using default');
console.log('STRIPE_WEBHOOK_SECRET:', process.env.STRIPE_WEBHOOK_SECRET ? '✅ Set' : '❌ Using default');

console.log('\n📦 Products Configuration:');
Object.entries(products).forEach(([priceId, product]) => {
  console.log(`✅ ${product.name}:`);
  console.log(`   Price ID: ${priceId}`);
  console.log(`   Product ID: ${product.productId}`);
  console.log(`   PDF: ${product.filePath}`);
  console.log(`   Payment Link: ${product.paymentLink}`);
  console.log('');
});

console.log('🎯 Server Configuration:');
console.log('Port: 10000');
console.log('Frontend: localhost:3000');
console.log('API Base: http://localhost:10000/api');

console.log('\n📋 Available API Endpoints:');
console.log('GET  /api/health - Health check');
console.log('GET  /api/products - All products');
console.log('GET  /api/products/:priceId - Specific product');
console.log('POST /api/contact - Contact form');
console.log('POST /api/checkout/create-checkout-session - Create payment session');
console.log('POST /api/test-email - Test email sending');
console.log('POST /api/webhook - Stripe webhook');

console.log('\n✅ Configuration test completed!'); 