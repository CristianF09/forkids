require('dotenv').config();

console.log('🧪 Order Process Test');
console.log('=====================');

console.log('\n📋 Step-by-step troubleshooting:');

console.log('\n1️⃣ Check if servers are running:');
console.log('   Frontend: http://localhost:3000');
console.log('   Backend: http://localhost:10000');
console.log('   Products API: http://localhost:10000/api/products');

console.log('\n2️⃣ Check Stripe configuration:');
console.log('   STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? '✅ Set' : '❌ Not set');
console.log('   STRIPE_PUBLISHABLE_KEY:', process.env.STRIPE_PUBLISHABLE_KEY ? '✅ Set' : '❌ Not set');

console.log('\n3️⃣ Check payment links:');
const products = require('./config/products');
Object.entries(products).forEach(([priceId, product]) => {
  console.log(`   ${product.name}: ${product.paymentLink}`);
});

console.log('\n4️⃣ Test payment link directly:');
console.log('   Try clicking this link: https://buy.stripe.com/28E3cwc3ceav0OD5hWeZ203');
console.log('   This should open Stripe checkout for Pachet Complet');

console.log('\n5️⃣ Common issues and solutions:');

console.log('\n❌ Issue: "Cannot find module \'./en\'"');
console.log('   ✅ Solution: This is a non-critical Stripe UI error');
console.log('   ✅ The payment will still work despite this error');

console.log('\n❌ Issue: Payment completes but no emails');
console.log('   ✅ Solution: Check if webhook URL is configured in Stripe Dashboard');
console.log('   ✅ Use ngrok URL: https://YOUR_NGROK_URL/api/webhook');

console.log('\n❌ Issue: Payment link doesn\'t work');
console.log('   ✅ Solution: Check if Stripe keys are correct');
console.log('   ✅ Make sure you\'re using test keys, not live keys');

console.log('\n❌ Issue: "Invalid API Key"');
console.log('   ✅ Solution: Restart your backend server after updating .env');

console.log('\n🧪 Test Instructions:');
console.log('1. Go to http://localhost:3000');
console.log('2. Click on any product to buy');
console.log('3. Complete the payment with test card: 4242 4242 4242 4242');
console.log('4. Check your email for order notifications');
console.log('5. Check ngrok dashboard at http://localhost:4040 for webhook requests');

console.log('\n📞 Need help?');
console.log('   - Check browser console for errors');
console.log('   - Check backend console for logs');
console.log('   - Check ngrok dashboard for webhook requests'); 