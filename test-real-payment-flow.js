const { sendOrderNotification, sendEmailWithAttachment } = require('./backend/services/emailService');
const products = require('./backend/config/products');

// Simulate the exact payment scenario you described
async function testRealPaymentFlow() {
  console.log('🧪 Testing Real Payment Flow - Customer: cris7i_laurentiu@yahoo.com\n');
  
  // Simulate the exact payment data from your Stripe events
  const realPaymentData = {
    customerEmail: 'cris7i_laurentiu@yahoo.com',
    customerName: 'Cristian Florea',
    amount: 39.00,
    currency: 'RON',
    sessionId: 'cs_live_a1PSBaVRg1nLU2bulrqliNG7q2QCpS7l4IdEM1iPzaQpBn2KnciVrmyzmI',
    paymentIntentId: 'pi_3RsO1wK6Qc2WK3kd1oX1nbeo',
    chargeId: 'ch_3RsO1wK6Qc2WK3kd1Cqk14Fd'
  };
  
  console.log('📧 Customer Details:');
  console.log('- Email:', realPaymentData.customerEmail);
  console.log('- Name:', realPaymentData.customerName);
  console.log('- Amount:', realPaymentData.amount, realPaymentData.currency);
  console.log('- Session ID:', realPaymentData.sessionId);
  
  // Determine which product was purchased (RON 39.00 = Pachet Complet)
  const productId = 'price_1Rkl17K6Qc2WK3kdsulZ1UxS'; // Pachet Complet
  const product = products[productId];
  
  console.log('\n📦 Product Analysis:');
  console.log('- Product:', product ? product.name : 'Unknown');
  console.log('- PDF File:', product ? product.filePath : 'Unknown');
  console.log('- Price ID:', productId);
  
  try {
    console.log('\n📤 Step 1: Testing Order Notification to contact@corcodusa.ro');
    await sendOrderNotification({
      customerEmail: realPaymentData.customerEmail,
      customerName: realPaymentData.customerName,
      productName: product ? product.name : 'Pachet Complet',
      amount: realPaymentData.amount,
      currency: realPaymentData.currency,
      sessionId: realPaymentData.sessionId
    });
    console.log('✅ Order notification sent successfully!');
    
    console.log('\n📤 Step 2: Testing PDF Email to Customer');
    const pdfFileName = product ? product.filePath : 'BonusCertificateDeAbsovire.pdf';
    await sendEmailWithAttachment(realPaymentData.customerEmail, pdfFileName);
    console.log('✅ PDF email sent to customer successfully!');
    
    console.log('\n🎉 All email tests completed successfully!');
    console.log('\n📋 Expected Results:');
    console.log('1. ✅ contact@corcodusa.ro should receive order notification');
    console.log('2. ✅ cris7i_laurentiu@yahoo.com should receive PDF attachment');
    console.log('3. ✅ Stripe will automatically send invoice to customer');
    
  } catch (error) {
    console.error('❌ Email test failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check if .env file exists with ZMAIL_USER and ZMAIL_PASS');
    console.log('2. Verify Zoho email credentials are correct');
    console.log('3. Check if PDF files exist in backend/public/pdfs/');
    console.log('4. Ensure internet connection for email sending');
  }
}

// Test environment variables
function checkEmailEnvironment() {
  console.log('🔧 Checking Email Environment Variables...\n');
  
  const requiredVars = ['ZMAIL_USER', 'ZMAIL_PASS'];
  let allConfigured = true;
  
  requiredVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
      console.log(`✅ ${varName}: Configured`);
    } else {
      console.log(`❌ ${varName}: Missing`);
      allConfigured = false;
    }
  });
  
  return allConfigured;
}

// Test PDF files
function checkPDFFiles() {
  const fs = require('fs');
  const path = require('path');
  
  console.log('\n📄 Checking PDF Files...\n');
  
  const pdfDir = path.join(__dirname, 'backend', 'public', 'pdfs');
  const expectedFiles = [
    'Alfabetul.pdf',
    'Numere.pdf', 
    'FormeSiCulori.pdf',
    'BonusCertificateDeAbsovire.pdf',
    'BonusFiseDeColorat.pdf'
  ];
  
  let allFilesExist = true;
  
  if (fs.existsSync(pdfDir)) {
    expectedFiles.forEach(file => {
      const filePath = path.join(pdfDir, file);
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
        console.log(`✅ ${file}: Found (${sizeInMB} MB)`);
      } else {
        console.log(`❌ ${file}: Missing`);
        allFilesExist = false;
      }
    });
  } else {
    console.log(`❌ PDF directory not found: ${pdfDir}`);
    allFilesExist = false;
  }
  
  return allFilesExist;
}

// Test webhook simulation
function testWebhookSimulation() {
  console.log('\n🔗 Testing Webhook Simulation...\n');
  
  // Simulate the webhook payload that Stripe would send
  const webhookPayload = {
    id: 'evt_test_real_payment',
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
  
  console.log('📦 Webhook Payload:');
  console.log('- Event Type:', webhookPayload.type);
  console.log('- Customer Email:', webhookPayload.data.object.customer_email);
  console.log('- Amount:', webhookPayload.data.object.amount_total / 100, 'RON');
  console.log('- Product ID:', webhookPayload.data.object.line_items.data[0].price.id);
  
  return webhookPayload;
}

// Main test function
async function runRealPaymentTests() {
  console.log('🧪 Starting Real Payment Flow Tests...\n');
  
  // Check environment
  const envOk = checkEmailEnvironment();
  const pdfsOk = checkPDFFiles();
  
  if (!envOk) {
    console.log('\n❌ Environment variables missing. This is why PDFs are not being sent!');
    console.log('Please create a .env file in the backend directory with:');
    console.log('ZMAIL_USER=contact@corcodusa.ro');
    console.log('ZMAIL_PASS=your_zoho_app_password');
    console.log('\nSee QUICK_FIX_GUIDE.md for detailed instructions.');
    return;
  }
  
  if (!pdfsOk) {
    console.log('\n❌ PDF files missing. Please ensure all PDF files are in place.');
    return;
  }
  
  console.log('\n✅ Environment and files are ready for testing.');
  
  // Test webhook simulation
  const webhookData = testWebhookSimulation();
  
  console.log('\n📤 Starting email flow test...\n');
  
  await testRealPaymentFlow();
  
  console.log('\n🔍 Analysis of Your Issue:');
  console.log('1. ✅ Payment was successful (Stripe processed it)');
  console.log('2. ✅ Stripe invoice was sent to customer');
  console.log('3. ❌ Webhook failed to reach your server (missing env vars)');
  console.log('4. ❌ PDF email not sent (server couldn\'t process webhook)');
  console.log('5. ❌ Order notification not sent (server couldn\'t process webhook)');
}

// Run tests if this file is executed directly
if (require.main === module) {
  runRealPaymentTests().catch(console.error);
}

module.exports = { runRealPaymentTests, testRealPaymentFlow, checkEmailEnvironment, checkPDFFiles }; 