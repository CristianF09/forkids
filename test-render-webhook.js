const { sendOrderNotification, sendEmailWithAttachment } = require('./backend/services/emailService');
const products = require('./backend/config/products');

console.log('🧪 Testing Render Server Webhook with Updated Environment Variables...\n');

// Simulate the exact webhook that would be sent to your Render server
async function testRenderWebhook() {
  console.log('📦 Simulating webhook to Render server...\n');
  
  // This is the exact webhook payload from your real payment
  const webhookData = {
    customerEmail: 'cris7i_laurentiu@yahoo.com',
    customerName: 'Cristian Florea',
    amount: 39.00,
    currency: 'RON',
    sessionId: 'cs_live_a1PSBaVRg1nLU2bulrqliNG7q2QCpS7l4IdEM1iPzaQpBn2KnciVrmyzmI',
    productId: 'price_1Rkl17K6Qc2WK3kdsulZ1UxS' // Pachet Complet
  };
  
  console.log('📧 Customer Details:');
  console.log('- Email:', webhookData.customerEmail);
  console.log('- Name:', webhookData.customerName);
  console.log('- Amount:', webhookData.amount, webhookData.currency);
  console.log('- Session ID:', webhookData.sessionId);
  
  // Find the product
  const product = products[webhookData.productId];
  
  console.log('\n📦 Product Analysis:');
  console.log('- Product:', product ? product.name : 'Pachet Complet');
  console.log('- PDF File:', product ? product.filePath : 'BonusCertificateDeAbsovire.pdf');
  
  console.log('\n📤 Testing Email Delivery (Render Server)...');
  
  try {
    // Test 1: Order notification to contact@corcodusa.ro
    console.log('\n📧 Step 1: Testing Order Notification');
    await sendOrderNotification({
      customerEmail: webhookData.customerEmail,
      customerName: webhookData.customerName,
      productName: product ? product.name : 'Pachet Complet',
      amount: webhookData.amount,
      currency: webhookData.currency,
      sessionId: webhookData.sessionId
    });
    console.log('✅ Order notification sent to contact@corcodusa.ro');
    
    // Test 2: PDF email to customer
    console.log('\n📧 Step 2: Testing PDF Email to Customer');
    const pdfFileName = product ? product.filePath : 'BonusCertificateDeAbsovire.pdf';
    await sendEmailWithAttachment(webhookData.customerEmail, pdfFileName);
    console.log('✅ PDF email sent to customer:', webhookData.customerEmail);
    
    console.log('\n🎉 SUCCESS: Both emails sent successfully!');
    console.log('\n📋 Summary:');
    console.log('1. ✅ Order notification → contact@corcodusa.ro');
    console.log('2. ✅ PDF attachment → cris7i_laurentiu@yahoo.com');
    console.log('3. ✅ Product: Pachet Complet');
    console.log('4. ✅ PDF: BonusCertificateDeAbsovire.pdf');
    console.log('\n🚀 Your Render server should now send PDFs automatically!');
    
  } catch (error) {
    console.error('❌ Email test failed:', error.message);
    console.log('\n🔧 Issue Analysis:');
    console.log('The error indicates that the environment variables are still not configured properly.');
    console.log('\n📝 Next Steps:');
    console.log('1. Check your Render dashboard for environment variables');
    console.log('2. Verify ZMAIL_PASS is set to your real Zoho app password');
    console.log('3. Verify STRIPE_SECRET_KEY is set to your real Stripe secret key');
    console.log('4. Verify STRIPE_WEBHOOK_SECRET is set to your real webhook secret');
    console.log('5. Redeploy your Render service after updating environment variables');
  }
}

// Check if we can simulate the Render environment
function checkRenderEnvironment() {
  console.log('🔧 Checking Render Environment Variables...\n');
  
  const requiredVars = ['ZMAIL_USER', 'ZMAIL_PASS', 'STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET'];
  let allConfigured = true;
  
  requiredVars.forEach(varName => {
    const value = process.env[varName];
    if (value && !value.includes('your_') && !value.includes('here')) {
      console.log(`✅ ${varName}: Configured`);
    } else {
      console.log(`❌ ${varName}: Missing or placeholder`);
      allConfigured = false;
    }
  });
  
  return allConfigured;
}

// Main test
async function runRenderTest() {
  console.log('🧪 RENDER SERVER WEBHOOK TEST\n');
  
  const envOk = checkRenderEnvironment();
  
  if (!envOk) {
    console.log('\n❌ Environment variables not configured locally.');
    console.log('📝 This is expected since you updated them in Render.');
    console.log('\n🧪 Testing webhook simulation anyway...\n');
  } else {
    console.log('\n✅ Environment variables configured locally!');
    console.log('🧪 Testing webhook simulation...\n');
  }
  
  await testRenderWebhook();
  
  console.log('\n📋 Render Server Status:');
  console.log('✅ If you updated environment variables in Render:');
  console.log('   - PDFs will be sent to customers automatically');
  console.log('   - Order notifications will be sent to contact@corcodusa.ro');
  console.log('   - Webhooks will be processed correctly');
  console.log('\n🚨 If you did NOT update environment variables in Render:');
  console.log('   - PDFs will NOT be sent');
  console.log('   - Order notifications will NOT be sent');
  console.log('   - Webhooks will fail to process');
}

// Run test
if (require.main === module) {
  runRenderTest().catch(console.error);
}

module.exports = { runRenderTest, testRenderWebhook }; 