const Stripe = require('stripe');

// Verify Stripe Live mode configuration
async function verifyStripeLive() {
  console.log('🔍 Verifying Stripe Live Mode Configuration...\n');
  
  // Check environment variables
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
  
  if (!stripeSecretKey) {
    console.log('❌ STRIPE_SECRET_KEY not found in environment variables');
    return false;
  }
  
  if (!stripePublishableKey) {
    console.log('❌ STRIPE_PUBLISHABLE_KEY not found in environment variables');
    return false;
  }
  
  // Check if keys are Live mode
  const isLiveSecret = stripeSecretKey.startsWith('sk_live_');
  const isLivePublishable = stripePublishableKey.startsWith('pk_live_');
  
  console.log('🔑 Stripe Key Analysis:');
  console.log(`Secret Key: ${isLiveSecret ? '✅ Live Mode' : '❌ Test Mode'} (${stripeSecretKey.substring(0, 12)}...)`);
  console.log(`Publishable Key: ${isLivePublishable ? '✅ Live Mode' : '❌ Test Mode'} (${stripePublishableKey.substring(0, 12)}...)`);
  
  if (!isLiveSecret || !isLivePublishable) {
    console.log('\n⚠️  WARNING: You are using Test mode keys!');
    console.log('To test in Live mode, you need Live API keys (sk_live_... and pk_live_...)');
    return false;
  }
  
  // Test Stripe connection
  try {
    const stripe = Stripe(stripeSecretKey);
    
    // Try to get account information (this will verify the key works)
    const account = await stripe.accounts.retrieve();
    
    console.log('\n✅ Stripe Live Mode Verified!');
    console.log(`Account ID: ${account.id}`);
    console.log(`Account Type: ${account.type}`);
    console.log(`Country: ${account.country}`);
    
    return true;
    
  } catch (error) {
    console.log('\n❌ Stripe connection failed:');
    console.log(`Error: ${error.message}`);
    
    if (error.code === 'authentication_error') {
      console.log('🔧 Solution: Check your Stripe secret key');
    } else if (error.code === 'invalid_request_error') {
      console.log('🔧 Solution: Verify your API key format');
    }
    
    return false;
  }
}

// Test webhook configuration
function checkWebhookConfig() {
  console.log('\n🔗 Webhook Configuration:');
  
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  if (webhookSecret) {
    console.log('✅ STRIPE_WEBHOOK_SECRET: Configured');
    console.log(`Secret: ${webhookSecret.substring(0, 12)}...`);
  } else {
    console.log('❌ STRIPE_WEBHOOK_SECRET: Missing');
    console.log('🔧 Solution: Add webhook secret to .env file');
  }
}

// Test email configuration
function checkEmailConfig() {
  console.log('\n📧 Email Configuration:');
  
  const zmailUser = process.env.ZMAIL_USER;
  const zmailPass = process.env.ZMAIL_PASS;
  
  if (zmailUser && zmailPass) {
    console.log('✅ ZMAIL_USER: Configured');
    console.log('✅ ZMAIL_PASS: Configured');
  } else {
    console.log('❌ Email credentials missing');
    console.log('🔧 Solution: Add ZMAIL_USER and ZMAIL_PASS to .env file');
  }
}

// Main verification function
async function runVerification() {
  console.log('🧪 Stripe Live Mode Verification\n');
  
  // Check all configurations
  checkWebhookConfig();
  checkEmailConfig();
  
  console.log('\n' + '='.repeat(50));
  
  // Verify Stripe Live mode
  const isLiveMode = await verifyStripeLive();
  
  if (isLiveMode) {
    console.log('\n🎉 READY FOR LIVE MODE TESTING!');
    console.log('\n📋 Next Steps:');
    console.log('1. Start your servers (backend:10000, frontend:3000)');
    console.log('2. Use test card: 4000 0000 0000 9995');
    console.log('3. Make a test payment');
    console.log('4. Monitor server logs and emails');
  } else {
    console.log('\n⚠️  NOT READY FOR LIVE MODE TESTING');
    console.log('\n🔧 Required Actions:');
    console.log('1. Get Live API keys from Stripe Dashboard');
    console.log('2. Update .env file with Live keys');
    console.log('3. Configure webhook endpoint');
    console.log('4. Set up email credentials');
  }
  
  console.log('\n📚 See STRIPE_LIVE_TESTING_SOLUTION.md for detailed instructions');
}

// Run verification if this file is executed directly
if (require.main === module) {
  runVerification().catch(console.error);
}

module.exports = { verifyStripeLive, runVerification }; 