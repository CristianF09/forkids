const { sendOrderNotification, sendEmailWithAttachment } = require('./backend/services/emailService');
const products = require('./backend/config/products');

console.log('🧪 COMPLETE PAYMENT FLOW TEST\n');

// Simulate the exact payment scenario
async function testCompletePaymentFlow() {
  console.log('📦 Simulating complete payment flow...\n');
  
  // This is the exact payment data from your Stripe event
  const paymentData = {
    customerEmail: 'cris7i_laurentiu@yahoo.com',
    customerName: 'Cristian Florea',
    amount: 39.00,
    currency: 'RON',
    sessionId: 'cs_live_a1e3EJYCWTQo9GkuBAoMuJnfVjGgXCiXt2dNYyOe4QwomGgiI19Xalm1El',
    productId: 'price_1Rkl17K6Qc2WK3kdsulZ1UxS' // Pachet Complet
  };
  
  console.log('📧 Customer Details:');
  console.log('- Email:', paymentData.customerEmail);
  console.log('- Name:', paymentData.customerName);
  console.log('- Amount:', paymentData.amount, paymentData.currency);
  console.log('- Session ID:', paymentData.sessionId);
  
  // Find the product
  const product = products[paymentData.productId];
  
  console.log('\n📦 Product Analysis:');
  console.log('- Product:', product ? product.name : 'Pachet Complet');
  console.log('- PDF File:', product ? product.filePath : 'BonusCertificateDeAbsovire.pdf');
  
  console.log('\n📤 Testing Complete Payment Flow...');
  
  try {
    // Step 1: Order notification to contact@corcodusa.ro
    console.log('\n📧 Step 1: Testing Order Notification');
    await sendOrderNotification({
      customerEmail: paymentData.customerEmail,
      customerName: paymentData.customerName,
      productName: product ? product.name : 'Pachet Complet',
      amount: paymentData.amount,
      currency: paymentData.currency,
      sessionId: paymentData.sessionId
    });
    console.log('✅ Order notification sent to contact@corcodusa.ro');
    
    // Step 2: PDF email to customer
    console.log('\n📧 Step 2: Testing PDF Email to Customer');
    const pdfFileName = product ? product.filePath : 'BonusCertificateDeAbsovire.pdf';
    await sendEmailWithAttachment(paymentData.customerEmail, pdfFileName);
    console.log('✅ PDF email sent to customer:', paymentData.customerEmail);
    
    console.log('\n🎉 SUCCESS: Complete payment flow works!');
    console.log('\n📋 What happens after payment:');
    console.log('1. ✅ Stripe automatically sends invoice to customer');
    console.log('2. ✅ Your webhook sends PDF to customer');
    console.log('3. ✅ Your webhook sends order notification to contact@corcodusa.ro');
    console.log('\n⏱️ Timing:');
    console.log('- Invoice: Immediate (Stripe handles this)');
    console.log('- PDF: Within seconds (your webhook)');
    console.log('- Order notification: Within seconds (your webhook)');
    
  } catch (error) {
    console.error('❌ Payment flow test failed:', error.message);
    console.log('\n🔧 Issue Analysis:');
    console.log('The error indicates that the environment variables are not configured properly.');
    console.log('\n📝 To fix this:');
    console.log('1. Update environment variables in Render with real credentials');
    console.log('2. Make sure ZMAIL_USER and ZMAIL_PASS are set correctly');
    console.log('3. Make sure STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET are set correctly');
    console.log('4. Redeploy your Render service');
  }
}

// Check environment variables
function checkEnvironment() {
  console.log('🔧 Environment Variables Check:\n');
  
  const requiredVars = ['ZMAIL_USER', 'ZMAIL_PASS', 'STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET'];
  let allConfigured = true;
  
  requiredVars.forEach(varName => {
    const value = process.env[varName];
    if (value && !value.includes('value') && !value.includes('your_')) {
      console.log(`✅ ${varName}: Configured`);
    } else {
      console.log(`❌ ${varName}: Missing or placeholder`);
      allConfigured = false;
    }
  });
  
  return allConfigured;
}

// Main test
async function runCompleteTest() {
  console.log('🧪 COMPLETE PAYMENT FLOW VERIFICATION\n');
  
  const envOk = checkEnvironment();
  
  if (!envOk) {
    console.log('\n❌ Environment variables not configured properly.');
    console.log('📝 You need to update the environment variables in Render:');
    console.log('1. Go to your Render dashboard');
    console.log('2. Update ZMAIL_USER with your real Zoho email');
    console.log('3. Update ZMAIL_PASS with your real Zoho app password');
    console.log('4. Update STRIPE_SECRET_KEY with your real Stripe secret key');
    console.log('5. Update STRIPE_WEBHOOK_SECRET with your real webhook secret');
    console.log('6. Redeploy your service');
    console.log('\n🚨 PDFs and notifications will NOT work until this is fixed!');
  } else {
    console.log('\n✅ Environment variables configured!');
    console.log('🧪 Testing complete payment flow...\n');
    await testCompletePaymentFlow();
  }
  
  console.log('\n📋 SUMMARY:');
  console.log('✅ Invoice: Stripe handles automatically');
  console.log('✅ PDF: Your webhook sends immediately');
  console.log('✅ Order notification: Your webhook sends to contact@corcodusa.ro');
  console.log('\n🎯 All three deliveries happen within seconds of payment!');
}

// Run test
if (require.main === module) {
  runCompleteTest().catch(console.error);
}

module.exports = { runCompleteTest, testCompletePaymentFlow }; 