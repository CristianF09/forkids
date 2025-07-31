const fs = require('fs');
const path = require('path');

console.log('🔑 Updating Stripe Keys with Real Values');
console.log('========================================');

// Real Stripe keys provided by user
const realStripeKeys = {
  STRIPE_SECRET_KEY: 'sk_test_51RazoP2c4OeQrchOp4DFWgwNKE42YbQEDuG2z9d6yvohcARrIAkyHi8R1SxrpEIVnbmRRqPFbNCi8GpKqpg3ZzsL00peq0vPbL',
  STRIPE_PUBLISHABLE_KEY: 'pk_test_51RazoP2c4OeQrchO9F99VM4oBuAydsdxhP2hgUTDQnv4a2moFNmexLysj9nHNjjFzGLjjGlPED9hptvB2EjUtisQ00RMiFZAmN',
  STRIPE_WEBHOOK_SECRET: 'whsec_VYcvGSVKyNE12FEylen2YyOemUv3G6qd'
};

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env file not found. Creating new .env file...');
  
  // Create new .env file with all required variables
  const envContent = `# Stripe Configuration
STRIPE_SECRET_KEY=${realStripeKeys.STRIPE_SECRET_KEY}
STRIPE_PUBLISHABLE_KEY=${realStripeKeys.STRIPE_PUBLISHABLE_KEY}
STRIPE_WEBHOOK_SECRET=${realStripeKeys.STRIPE_WEBHOOK_SECRET}

# Email Configuration (Zoho)
ZMAIL_USER=contact@corcodusa.ro
ZMAIL_PASS=59sr0kGL1ibD

# Server Configuration
PORT=10000
CLIENT_URL=http://localhost:3000

# Frontend Configuration
REACT_APP_API_URL=http://localhost:10000
REACT_APP_STRIPE_PUBLISHABLE_KEY=${realStripeKeys.STRIPE_PUBLISHABLE_KEY}

# MongoDB (optional)
MONGODB_URI=mongodb+srv://forkids-admin:<DB_PASSWORD>@cluster0.c4t3ydg.mongodb.net/corcodusa?retryWrites=true&w=majority&appName=Cluster0
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ New .env file created with real Stripe keys');
} else {
  console.log('📁 .env file found. Updating Stripe keys...');
  
  // Read existing .env file
  let envContent = fs.readFileSync(envPath, 'utf8');
  
  // Update Stripe keys
  Object.entries(realStripeKeys).forEach(([key, value]) => {
    const regex = new RegExp(`^${key}=.*`, 'm');
    if (regex.test(envContent)) {
      envContent = envContent.replace(regex, `${key}=${value}`);
      console.log(`✅ Updated ${key}`);
    } else {
      envContent += `\n${key}=${value}`;
      console.log(`✅ Added ${key}`);
    }
  });
  
  // Write updated .env file
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file updated with real Stripe keys');
}

console.log('\n🎉 Stripe keys updated successfully!');
console.log('\n📋 Next Steps:');
console.log('1. Restart your backend server');
console.log('2. Test a payment on http://localhost:3000');
console.log('3. Check if webhooks are now working');
console.log('\n⚠️  Important: Make sure your webhook URL in Stripe Dashboard is:');
console.log('   http://localhost:10000/api/webhook (for local testing)');
console.log('   or https://yourdomain.com/api/webhook (for production)'); 