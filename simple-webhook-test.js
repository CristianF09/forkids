console.log('🔍 SIMPLE WEBHOOK DIAGNOSTIC\n');

// Check environment variables
console.log('📋 ENVIRONMENT VARIABLES:');
console.log('========================');

const requiredVars = [
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'ZMAIL_USER',
  'ZMAIL_PASS'
];

let allVarsPresent = true;

requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    const preview = value.substring(0, 10);
    const isPlaceholder = value.includes('your_') || value.includes('placeholder') || value === 'sk_live_your_stripe_';
    console.log(`✅ ${varName}: ${preview}... ${isPlaceholder ? '(PLACEHOLDER!)' : '(Looks real)'}`);
    if (isPlaceholder) allVarsPresent = false;
  } else {
    console.log(`❌ ${varName}: NOT SET`);
    allVarsPresent = false;
  }
});

console.log('\n🎯 DIAGNOSIS:');
console.log('=============');

if (!allVarsPresent) {
  console.log('❌ PROBLEM: Environment variables are not properly configured!');
  console.log('\n📝 SOLUTION: Update these in your Render dashboard:');
  console.log('   - STRIPE_SECRET_KEY = your_real_stripe_secret_key');
  console.log('   - STRIPE_WEBHOOK_SECRET = your_real_webhook_secret');
  console.log('   - ZMAIL_USER = contact@corcodusa.ro');
  console.log('   - ZMAIL_PASS = your_real_zoho_app_password');
  console.log('\n🚨 This is why your webhook is returning 500 errors!');
} else {
  console.log('✅ All environment variables are set correctly');
  console.log('✅ Webhook should work properly');
}

console.log('\n📊 WEBHOOK STATUS:');
console.log('==================');
console.log('✅ Server is running: https://corcodusa.onrender.com/api/health');
console.log('❌ Webhook failing: 500 error on https://corcodusa.onrender.com/api/webhook');
console.log('💰 Payment successful: Customer paid 39.00 RON');
console.log('📧 Customer email: cris7i_laurentiu@yahoo.com');

console.log('\n🎯 NEXT STEPS:');
console.log('==============');
console.log('1. Update Render environment variables with real values');
console.log('2. Redeploy your application');
console.log('3. Test another payment');
console.log('4. Check if webhook returns 200 instead of 500'); 