const Stripe = require('stripe');

// Check Stripe Live mode settings
async function checkStripeSettings() {
  console.log('🔍 Checking Stripe Live Mode Settings...\n');
  
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  
  if (!stripeSecretKey) {
    console.log('❌ STRIPE_SECRET_KEY not found');
    console.log('🔧 Solution: Add your Live API key to .env file');
    return;
  }
  
  // Check if using Live keys
  const isLiveKey = stripeSecretKey.startsWith('sk_live_');
  
  if (!isLiveKey) {
    console.log('❌ You are using Test mode keys!');
    console.log('🔧 Solution: Get Live API keys from Stripe Dashboard');
    return;
  }
  
  console.log('✅ Using Live API keys');
  
  try {
    const stripe = Stripe(stripeSecretKey);
    
    // Test connection
    const account = await stripe.accounts.retrieve();
    console.log(`✅ Stripe connection successful`);
    console.log(`Account ID: ${account.id}`);
    console.log(`Country: ${account.country}`);
    
    // Check webhook configuration
    console.log('\n🔗 Webhook Configuration:');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (webhookSecret) {
      console.log('✅ Webhook secret configured');
    } else {
      console.log('❌ Webhook secret missing');
      console.log('🔧 Solution: Add STRIPE_WEBHOOK_SECRET to .env');
    }
    
    // Check email configuration
    console.log('\n📧 Email Configuration:');
    const zmailUser = process.env.ZMAIL_USER;
    const zmailPass = process.env.ZMAIL_PASS;
    
    if (zmailUser && zmailPass) {
      console.log('✅ Email credentials configured');
    } else {
      console.log('❌ Email credentials missing');
      console.log('🔧 Solution: Add ZMAIL_USER and ZMAIL_PASS to .env');
    }
    
    console.log('\n📋 Manual Dashboard Checks Required:');
    console.log('1. Go to Settings → Customer emails');
    console.log('   - Enable "Successful payments"');
    console.log('   - Enable "Failed payments"');
    console.log('   - Enable "Payment confirmations"');
    console.log('');
    console.log('2. Go to Settings → Billing → Invoices');
    console.log('   - Enable "Create invoices for one-time payments"');
    console.log('   - Enable "Send invoice PDFs automatically"');
    console.log('');
    console.log('3. Go to Developers → Webhooks');
    console.log('   - Verify endpoint URL is correct');
    console.log('   - Ensure events are selected');
    console.log('   - Check status is "Active"');
    
  } catch (error) {
    console.log('❌ Stripe connection failed:');
    console.log(`Error: ${error.message}`);
  }
}

// Run check if this file is executed directly
if (require.main === module) {
  checkStripeSettings().catch(console.error);
}

module.exports = { checkStripeSettings }; 