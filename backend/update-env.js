const fs = require('fs');
const path = require('path');

// Read current .env file
const envPath = path.join(__dirname, '.env');
let envContent = fs.readFileSync(envPath, 'utf8');

// Update the ZMAIL_PASS with the correct App Password
envContent = envContent.replace(
  /ZMAIL_PASS=parola_app_specificÄƒ/,
  'ZMAIL_PASS=59sr0kGL1ibD'
);

// Also update the Stripe keys to use placeholder values to avoid GitHub Secret Scanning
envContent = envContent.replace(
  /STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxxxxxxxxxxxxxxx/,
  'STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here'
);

envContent = envContent.replace(
  /STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxx/,
  'STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here'
);

// Add missing STRIPE_PUBLISHABLE_KEY
if (!envContent.includes('STRIPE_PUBLISHABLE_KEY')) {
  envContent = envContent.replace(
    /# Stripe/,
    `# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here`
  );
}

// Write updated .env file
fs.writeFileSync(envPath, envContent);

console.log('✅ .env file updated successfully!');
console.log('📧 ZMAIL_PASS updated with: 59sr0kGL1ibD');
console.log('🔑 Stripe keys updated to placeholder values');
console.log('📋 Added missing STRIPE_PUBLISHABLE_KEY');

// Show the updated content
console.log('\n📄 Updated .env content:');
console.log('='.repeat(50));
console.log(fs.readFileSync(envPath, 'utf8'));
console.log('='.repeat(50)); 