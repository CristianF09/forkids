const fs = require('fs');
const path = require('path');

console.log('🔑 Stripe Keys Update Tool');
console.log('==========================');

console.log('\n📋 Current .env content:');
const envPath = path.join(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
console.log(envContent);

console.log('\n⚠️  IMPORTANT: Your Stripe keys are still placeholder values!');
console.log('You need to update them with real values from your Stripe Dashboard.');

console.log('\n🔧 To fix this:');
console.log('1. Go to https://dashboard.stripe.com/test/apikeys');
console.log('2. Copy your Secret key (starts with sk_test_)');
console.log('3. Go to https://dashboard.stripe.com/test/webhooks');
console.log('4. Copy your Webhook secret (starts with whsec_)');
console.log('5. Update your .env file with these real values');

console.log('\n📝 Example .env update:');
console.log('STRIPE_SECRET_KEY=sk_test_51RazoP2c4OeQrchOp4DFWgwNKE42YbQEDuG2z9d6yvohcARrIAkyHi8R1SxrpEIVnbmRRqPFbNCi8GpKqpg3ZzsL00peq0vPbL');
console.log('STRIPE_WEBHOOK_SECRET=whsec_VYcvGSVKyNE12FEylen2YyOemUv3G6qd');

console.log('\n🌐 Webhook URL Issue:');
console.log('Stripe cannot reach localhost. You need to:');
console.log('1. Use ngrok: ngrok http 10000');
console.log('2. Or deploy your server to a public URL');
console.log('3. Update webhook URL in Stripe Dashboard');

console.log('\n📋 Next Steps:');
console.log('1. Update .env with real Stripe keys');
console.log('2. Start server: node server.js');
console.log('3. Use ngrok: ngrok http 10000');
console.log('4. Update webhook URL in Stripe Dashboard');
console.log('5. Test payment again'); 