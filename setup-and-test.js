const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

console.log('🔧 Setting up CorcoDușa Payment System...\n');

// Check if .env file exists
const envPath = path.join(__dirname, 'backend', '.env');
const envExists = fs.existsSync(envPath);

if (!envExists) {
  console.log('❌ .env file not found in backend directory');
  console.log('📝 Creating .env file with required variables...\n');
  
  const envContent = `# Environment Variables for CorcoDușa Backend
# REQUIRED: Email Configuration (Zoho)
ZMAIL_USER=contact@corcodusa.ro
ZMAIL_PASS=your_zoho_app_password_here

# REQUIRED: Stripe Configuration
STRIPE_SECRET_KEY=sk_live_your_actual_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_actual_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_actual_webhook_secret

# Server Configuration
NODE_ENV=production
PORT=10000

# Optional: MongoDB (if you have it)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
`;

  try {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created successfully!');
    console.log('📋 Next steps:');
    console.log('1. Edit the .env file and replace placeholder values with your actual credentials');
    console.log('2. Get Zoho app password from https://mail.zoho.com');
    console.log('3. Get Stripe keys from https://dashboard.stripe.com/apikeys');
    console.log('4. Run this script again to test the configuration');
  } catch (error) {
    console.error('❌ Error creating .env file:', error.message);
    console.log('\n📝 Manual setup:');
    console.log('1. Create a file named ".env" in the backend directory');
    console.log('2. Add the environment variables shown above');
  }
} else {
  console.log('✅ .env file found');
  
  // Load environment variables
  require('dotenv').config({ path: envPath });
  
  // Check environment variables
  const requiredVars = ['ZMAIL_USER', 'ZMAIL_PASS', 'STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET'];
  let allConfigured = true;
  
  console.log('\n🔧 Checking Environment Variables:');
  requiredVars.forEach(varName => {
    const value = process.env[varName];
    if (value && !value.includes('your_')) {
      console.log(`✅ ${varName}: Configured`);
    } else {
      console.log(`❌ ${varName}: Missing or placeholder`);
      allConfigured = false;
    }
  });
  
  if (allConfigured) {
    console.log('\n✅ All environment variables are configured!');
    console.log('\n🧪 Testing email functionality...');
    
    // Test email functionality
    const { runRealPaymentTests } = require('./test-real-payment-flow');
    runRealPaymentTests().then(() => {
      console.log('\n🚀 Starting server...');
      startServer();
    }).catch(console.error);
  } else {
    console.log('\n❌ Please configure all environment variables in the .env file');
    console.log('📋 Required variables:');
    console.log('- ZMAIL_USER: Your Zoho email address');
    console.log('- ZMAIL_PASS: Your Zoho app password');
    console.log('- STRIPE_SECRET_KEY: Your Stripe secret key');
    console.log('- STRIPE_WEBHOOK_SECRET: Your Stripe webhook secret');
    console.log('\nSee QUICK_FIX_GUIDE.md for detailed instructions.');
  }
}

function startServer() {
  console.log('\n🚀 Starting backend server...');
  
  const serverProcess = spawn('node', ['server.js'], {
    cwd: path.join(__dirname, 'backend'),
    stdio: 'inherit'
  });
  
  serverProcess.on('error', (error) => {
    console.error('❌ Error starting server:', error.message);
  });
  
  serverProcess.on('close', (code) => {
    console.log(`\n📊 Server process exited with code ${code}`);
  });
  
  // Give the server time to start
  setTimeout(() => {
    console.log('\n🔍 Testing server health...');
    testServerHealth();
  }, 3000);
}

function testServerHealth() {
  const http = require('http');
  
  const options = {
    hostname: 'localhost',
    port: 10000,
    path: '/api/health',
    method: 'GET'
  };
  
  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('✅ Server is running and healthy!');
      console.log('\n📋 Next steps:');
      console.log('1. Test a payment on your website');
      console.log('2. Check if PDFs are sent to customers');
      console.log('3. Check if order notifications are sent to contact@corcodusa.ro');
      console.log('\n🔗 Server URL: http://localhost:10000');
      console.log('🔗 Health Check: http://localhost:10000/api/health');
    });
  });
  
  req.on('error', (error) => {
    console.log('❌ Server is not responding. Please check the server logs.');
  });
  
  req.end();
}

console.log('\n📋 Summary of the issue:');
console.log('1. ✅ Payment processing works (Stripe handles this)');
console.log('2. ✅ Stripe invoice is sent to customer');
console.log('3. ❌ Webhook fails to reach your server (missing env vars)');
console.log('4. ❌ PDF email not sent (server can\'t process webhook)');
console.log('5. ❌ Order notification not sent (server can\'t process webhook)');
console.log('\n🔧 The fix: Configure environment variables in .env file'); 