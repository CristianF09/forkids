const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up Environment Variables for CorcoDușa...\n');

const envContent = `# Environment Variables for CorcoDușa Backend
# Copy this file to .env and fill in your actual values

# Node Environment
NODE_ENV=production

# MongoDB (Optional)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# Stripe Configuration
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Email Configuration (Zoho) - REQUIRED FOR PDF DELIVERY
ZMAIL_USER=contact@corcodusa.ro
ZMAIL_PASS=your_zoho_app_password_here

# Frontend URLs
REACT_APP_API_URL=https://your-domain.com
CLIENT_URL=https://your-domain.com

# Server Port
PORT=10000
`;

const envPath = path.join(__dirname, 'backend', '.env');

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created successfully at:', envPath);
  console.log('\n📋 Next Steps:');
  console.log('1. Edit the .env file and replace the placeholder values with your actual credentials');
  console.log('2. For Zoho email setup, follow the instructions in ZOHO_SETUP_GUIDE.md');
  console.log('3. Test the email functionality with: node test-email-flow.js');
  console.log('\n⚠️  IMPORTANT: The PDF delivery issue is caused by missing ZMAIL_USER and ZMAIL_PASS');
  console.log('   You need to set up Zoho email credentials to fix this issue.');
} catch (error) {
  console.error('❌ Error creating .env file:', error.message);
  console.log('\n📝 Manual Setup:');
  console.log('1. Create a file named ".env" in the backend directory');
  console.log('2. Copy the content above into the file');
  console.log('3. Replace the placeholder values with your actual credentials');
} 