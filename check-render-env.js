console.log('🔍 Checking Environment Variables...\n');

const requiredVars = [
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET', 
  'ZMAIL_USER',
  'ZMAIL_PASS'
];

console.log('📋 Required Environment Variables:');
requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    // Show first 10 characters to check if it's a placeholder
    const preview = value.substring(0, 10);
    const isPlaceholder = value.includes('your_') || value.includes('placeholder') || value === 'sk_live_your_stripe_';
    
    console.log(`✅ ${varName}: ${preview}... ${isPlaceholder ? '(PLACEHOLDER!)' : '(Looks real)'}`);
  } else {
    console.log(`❌ ${varName}: NOT SET`);
  }
});

console.log('\n🚨 PROBLEM: Your environment variables are still placeholders!');
console.log('📝 You need to update these in your Render dashboard:');
console.log('   1. Go to your Render service dashboard');
console.log('   2. Click on "Environment" tab');
console.log('   3. Update these variables with real values:');
console.log('      - STRIPE_SECRET_KEY: Your real Stripe secret key');
console.log('      - STRIPE_WEBHOOK_SECRET: Your real webhook secret');
console.log('      - ZMAIL_USER: Your real Zoho email');
console.log('      - ZMAIL_PASS: Your real Zoho app password');
console.log('   4. Redeploy your service'); 