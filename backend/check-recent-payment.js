require('dotenv').config();
const Stripe = require('stripe');

console.log('🔍 Checking Recent Payment');
console.log('==========================');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

async function checkRecentPayment() {
  try {
    console.log('\n📊 Payment Details:');
    console.log('Payment ID: pi_3Rquo42c4OeQrchO04Uiwq0l');
    console.log('Charge ID: ch_3Rquo42c4OeQrchO0waOAj2G');
    console.log('Amount: RON 89.00');
    console.log('Customer: cris7i_laurentiu@yahoo.com');
    
    // Check if this payment triggered a webhook
    console.log('\n🔍 Checking webhook events...');
    
    const events = await stripe.events.list({
      limit: 10,
      type: 'checkout.session.completed'
    });
    
    const recentEvent = events.data.find(event => {
      const session = event.data.object;
      return session.customer_email === 'cris7i_laurentiu@yahoo.com' && 
             session.amount_total === 8900;
    });
    
    if (recentEvent) {
      console.log('✅ Found matching webhook event!');
      console.log('Event ID:', recentEvent.id);
      console.log('Event type:', recentEvent.type);
      console.log('Created:', new Date(recentEvent.created * 1000).toLocaleString());
    } else {
      console.log('❌ No matching webhook event found');
      console.log('This means the webhook was not triggered');
    }
    
    console.log('\n📧 Email Status:');
    console.log('Check these email addresses:');
    console.log('1. cris7i_laurentiu@yahoo.com - for invoice and PDFs');
    console.log('2. contact@corcodusa.ro - for order notification');
    
    console.log('\n🔗 Webhook Configuration:');
    console.log('Make sure your Stripe Dashboard has webhook configured:');
    console.log('- Go to Stripe Dashboard > Developers > Webhooks');
    console.log('- Check if endpoint URL is set correctly');
    console.log('- Should be: https://YOUR_NGROK_URL/api/webhook');
    
  } catch (error) {
    console.log('❌ Error checking payment:', error.message);
  }
}

checkRecentPayment(); 