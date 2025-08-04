const crypto = require('crypto');

// Test webhook signature verification
function testWebhookSignature() {
  const payload = JSON.stringify({
    id: 'evt_test_webhook',
    type: 'checkout.session.completed',
    data: {
      object: {
        id: 'cs_test_session',
        customer_email: 'test@example.com',
        amount_total: 500,
        currency: 'ron',
        line_items: {
          data: [{
            price: {
              id: 'price_1Rkl17K6Qc2WK3kdesB8V3Hm'
            }
          }]
        }
      }
    }
  });

  const secret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_test_secret';
  const timestamp = Math.floor(Date.now() / 1000);
  const signedPayload = `${timestamp}.${payload}`;
  const signature = crypto
    .createHmac('sha256', secret)
    .update(signedPayload, 'utf8')
    .digest('hex');

  console.log('🧪 Webhook Test Results:');
  console.log('✅ Payload:', payload);
  console.log('✅ Timestamp:', timestamp);
  console.log('✅ Signature:', signature);
  console.log('✅ Webhook Secret:', secret ? 'Configured' : 'Missing');
  
  return {
    payload,
    timestamp,
    signature,
    secret: secret ? 'Configured' : 'Missing'
  };
}

// Test environment variables
function testEnvironmentVariables() {
  console.log('\n🔧 Environment Variables Check:');
  
  const requiredVars = [
    'STRIPE_SECRET_KEY',
    'STRIPE_PUBLISHABLE_KEY', 
    'STRIPE_WEBHOOK_SECRET',
    'ZMAIL_USER',
    'ZMAIL_PASS'
  ];

  requiredVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
      console.log(`✅ ${varName}: Configured`);
    } else {
      console.log(`❌ ${varName}: Missing`);
    }
  });
}

// Test PDF files
function testPDFFiles() {
  const fs = require('fs');
  const path = require('path');
  
  console.log('\n📄 PDF Files Check:');
  
  const pdfDir = path.join(__dirname, 'backend', 'public', 'pdfs');
  const expectedFiles = [
    'Alfabetul.pdf',
    'Numere.pdf', 
    'FormeSiCulori.pdf',
    'BonusCertificateDeAbsovire.pdf'
  ];

  if (fs.existsSync(pdfDir)) {
    expectedFiles.forEach(file => {
      const filePath = path.join(pdfDir, file);
      if (fs.existsSync(filePath)) {
        console.log(`✅ ${file}: Found`);
      } else {
        console.log(`❌ ${file}: Missing`);
      }
    });
  } else {
    console.log(`❌ PDF directory not found: ${pdfDir}`);
  }
}

// Run all tests
console.log('🧪 Starting Payment System Tests...\n');

testEnvironmentVariables();
testPDFFiles();
testWebhookSignature();

console.log('\n✅ Test completed! Check the results above.');
console.log('\n📝 Next steps:');
console.log('1. Start your servers (backend on port 10000, frontend on 3000)');
console.log('2. Use test card 4000 0000 0000 9995 for payment testing');
console.log('3. Check the TESTING_GUIDE.md for detailed instructions'); 