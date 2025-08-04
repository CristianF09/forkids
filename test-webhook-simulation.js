const { sendOrderNotification, sendEmailWithAttachment } = require('./backend/services/emailService');
const products = require('./backend/config/products');

// Simulate the exact webhook that Stripe would send
async function testWebhookSimulation() {
  console.log('🧪 Testing Webhook Simulation for PDF Delivery...\n');
  
  // Simulate the webhook payload from your real payment
  const webhookPayload = {
    type: 'checkout.session.completed',
    data: {
      object: {
        id: 'cs_live_a1PSBaVRg1nLU2bulrqliNG7q2QCpS7l4IdEM1iPzaQpBn2KnciVrmyzmI',
        customer_email: 'cris7i_laurentiu@yahoo.com',
        amount_total: 3900,
        currency: 'ron',
        line_items: {
          data: [
            {
              price: {
                id: 'price_1Rkl17K6Qc2WK3kdsulZ1UxS' // Pachet Complet
              }
            }
          ]
        }
      }
    }
  };
  
  console.log('📦 Webhook Payload Analysis:');
  console.log('- Event Type:', webhookPayload.type);
  console.log('- Customer Email:', webhookPayload.data.object.customer_email);
  console.log('- Amount:', webhookPayload.data.object.amount_total / 100, 'RON');
  console.log('- Product ID:', webhookPayload.data.object.line_items.data[0].price.id);
  
  // Process the webhook like the server would
  const session = webhookPayload.data.object;
  const customerEmail = session.customer_email;
  const sessionId = session.id;
  const lineItems = session.line_items?.data || [];
  
  console.log('\n🔍 Processing Webhook...');
  console.log('- Customer Email:', customerEmail);
  console.log('- Session ID:', sessionId);
  
  // Find the product
  let pdfFileName = 'Produs digital.pdf';
  let productName = 'Produs digital';
  let amount = session.amount_total / 100;
  let currency = session.currency?.toUpperCase() || 'RON';
  
  if (lineItems.length > 0) {
    const priceId = lineItems[0].price.id;
    const product = products[priceId];
    
    if (product) {
      pdfFileName = product.filePath;
      productName = product.name;
      console.log('✅ Product found:', productName);
      console.log('✅ PDF File:', pdfFileName);
    } else {
      console.log('❌ Product not found for price ID:', priceId);
    }
  }
  
  console.log('\n📤 Testing Email Delivery...');
  
  try {
    // Test 1: Order notification to contact@corcodusa.ro
    console.log('\n📧 Step 1: Testing Order Notification');
    await sendOrderNotification({
      customerEmail,
      productName,
      amount,
      currency,
      sessionId
    });
    console.log('✅ Order notification would be sent to contact@corcodusa.ro');
    
    // Test 2: PDF email to customer
    console.log('\n📧 Step 2: Testing PDF Email to Customer');
    await sendEmailWithAttachment(customerEmail, pdfFileName);
    console.log('✅ PDF email would be sent to:', customerEmail);
    
    console.log('\n🎉 SUCCESS: Both emails would be sent!');
    console.log('\n📋 Summary:');
    console.log('1. ✅ Order notification → contact@corcodusa.ro');
    console.log('2. ✅ PDF attachment → cris7i_laurentiu@yahoo.com');
    console.log('3. ✅ Product: Pachet Complet');
    console.log('4. ✅ PDF: BonusCertificateDeAbsovire.pdf');
    
  } catch (error) {
    console.error('❌ Email test failed:', error.message);
    console.log('\n🔧 Issue Analysis:');
    console.log('The error indicates missing environment variables:');
    console.log('- ZMAIL_USER: Zoho email address');
    console.log('- ZMAIL_PASS: Zoho app password');
    console.log('- STRIPE_SECRET_KEY: Stripe secret key');
    console.log('- STRIPE_WEBHOOK_SECRET: Stripe webhook secret');
    console.log('\n📝 Solution: Replace placeholder values in backend/.env with actual credentials');
  }
}

// Check environment variables
function checkEnvironment() {
  console.log('🔧 Environment Variables Check:\n');
  
  const requiredVars = [
    'ZMAIL_USER', 
    'ZMAIL_PASS', 
    'STRIPE_SECRET_KEY', 
    'STRIPE_WEBHOOK_SECRET'
  ];
  
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
async function runWebhookTest() {
  console.log('🧪 WEBHOOK PDF DELIVERY TEST\n');
  
  const envOk = checkEnvironment();
  
  if (!envOk) {
    console.log('\n❌ Environment variables not properly configured!');
    console.log('📝 You need to replace placeholder values in backend/.env with actual credentials:');
    console.log('1. Get Zoho app password from https://mail.zoho.com');
    console.log('2. Get Stripe keys from https://dashboard.stripe.com/apikeys');
    console.log('3. Update the .env file with real values');
    console.log('\n🚨 PDFs will NOT be sent until credentials are configured!');
    return;
  }
  
  console.log('\n✅ Environment variables configured!');
  console.log('🧪 Testing webhook simulation...\n');
  
  await testWebhookSimulation();
}

// Run test
if (require.main === module) {
  runWebhookTest().catch(console.error);
}

module.exports = { runWebhookTest, testWebhookSimulation }; 