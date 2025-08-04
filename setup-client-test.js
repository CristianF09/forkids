const fs = require('fs');
const path = require('path');

// Setup script for client testing
function setupClientTest() {
  console.log('🧪 Setting up Client Test: cris7i_laurentiu@yahoo.com\n');
  
  // Check if .env file exists
  const envPath = path.join(__dirname, 'backend', '.env');
  const envExists = fs.existsSync(envPath);
  
  console.log('📋 Current Status:');
  console.log(`Environment file: ${envExists ? '✅ Found' : '❌ Missing'}`);
  
  if (!envExists) {
    console.log('\n🔧 Creating .env file template...');
    
    const envTemplate = `# Node Environment
NODE_ENV=production

# Stripe Configuration (LIVE KEYS)
STRIPE_SECRET_KEY=sk_live_your_actual_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_live_your_actual_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_actual_webhook_secret_here

# Email Configuration
ZMAIL_USER=contact@corcodusa.ro
ZMAIL_PASS=your_actual_app_password_here

# Frontend URLs
REACT_APP_API_URL=https://your-domain.com
CLIENT_URL=https://your-domain.com

# Server Port
PORT=10000
`;
    
    fs.writeFileSync(envPath, envTemplate);
    console.log('✅ .env file created in backend directory');
    console.log('📝 Please update with your actual Live Stripe keys');
  }
  
  // Check PDF files
  console.log('\n📄 Checking PDF Files:');
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
        const stats = fs.statSync(filePath);
        const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
        console.log(`✅ ${file}: Found (${sizeInMB} MB)`);
      } else {
        console.log(`❌ ${file}: Missing`);
      }
    });
  } else {
    console.log(`❌ PDF directory not found: ${pdfDir}`);
  }
  
  console.log('\n📋 Next Steps:');
  console.log('1. Update .env file with your Live Stripe keys');
  console.log('2. Configure webhook in Stripe Dashboard');
  console.log('3. Test configuration: node check-stripe-settings.js');
  console.log('4. Start servers and make test payment');
  console.log('5. Monitor results for cris7i_laurentiu@yahoo.com');
  
  console.log('\n🧪 Test Details:');
  console.log('- Client Email: cris7i_laurentiu@yahoo.com');
  console.log('- Product: Alfabetul (5 RON)');
  console.log('- Test Card: 4000 0000 0000 9995');
  console.log('- Expected: PDF + Stripe invoice delivery');
  
  console.log('\n📚 See CLIENT_TESTING_GUIDE.md for detailed instructions');
}

// Run setup if this file is executed directly
if (require.main === module) {
  setupClientTest();
}

module.exports = { setupClientTest }; 