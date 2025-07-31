require('dotenv').config();
const Stripe = require('stripe');

console.log('🔍 Webhook Debug - Checking Configuration');
console.log('========================================');

// Check environment variables
console.log('\n📋 Environment Variables:');
console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? '✅ Set' : '❌ Not set');
console.log('STRIPE_WEBHOOK_SECRET:', process.env.STRIPE_WEBHOOK_SECRET ? '✅ Set' : '❌ Not set');
console.log('ZMAIL_USER:', process.env.ZMAIL_USER ? '✅ Set' : '❌ Not set');
console.log('ZMAIL_PASS:', process.env.ZMAIL_PASS ? '✅ Set' : '❌ Not set');

// Check if we can connect to Stripe
const stripe = Stripe(process.env.STRIPE_SECRET_KEY || 'sk_live_placeholder');

async function checkStripeConnection() {
  try {
    console.log('\n🔗 Testing Stripe Connection...');
    const account = await stripe.accounts.retrieve();
    console.log('✅ Stripe connection successful');
    console.log('📧 Account email:', account.email);
  } catch (error) {
    console.log('❌ Stripe connection failed:', error.message);
  }
}

async function simulateWebhook() {
  console.log('\n🧪 Simulating Webhook Event...');
  
  // Simulate a checkout.session.completed event
  const mockEvent = {
    id: 'evt_test_webhook_debug',
    object: 'event',
    type: 'checkout.session.completed',
    data: {
      object: {
        id: 'cs_test_webhook_debug',
        object: 'checkout.session',
        customer_email: 'cris7i_laurentiu@yahoo.com',
        amount_total: 8999, // 89.99 RON in cents
        currency: 'ron',
        line_items: {
          data: [{
            price: {
              id: 'price_1Rkl17K6Qc2WK3kdsulZ1UxS' // Pachet Complet price ID
            }
          }]
        },
        metadata: {}
      }
    }
  };

  console.log('📦 Mock event data:', JSON.stringify(mockEvent, null, 2));
  
  // Test the webhook processing logic
  const { sendEmailWithAttachment, sendOrderNotification } = require('./services/emailService');
  const products = require('./config/products');
  
  const session = mockEvent.data.object;
  const customerEmail = session.customer_email;
  const sessionId = session.id;
  
  console.log('\n💰 Processing mock payment...');
  console.log('📧 Customer email:', customerEmail);
  console.log('🆔 Session ID:', sessionId);
  
  try {
    // Step 1: Send order notification
    await sendOrderNotification({
      customerEmail,
      productName: 'Pachet Complet',
      amount: 89.99,
      currency: 'RON',
      sessionId
    });
    console.log('✅ Order notification sent to contact@corcodusa.ro');
    
    // Step 2: Send invoice
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.eu',
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZMAIL_USER,
        pass: process.env.ZMAIL_PASS,
      },
    });
    
    const invoiceEmail = {
      from: `"CorcoDușa" <${process.env.ZMAIL_USER}>`,
      to: customerEmail,
      subject: `Factura pentru Pachet Complet - CorcoDușa`,
      html: `
        <h2>Factura - CorcoDușa</h2>
        <p><strong>Produs:</strong> Pachet Complet</p>
        <p><strong>Preț:</strong> 89.99 RON</p>
        <p><strong>Data:</strong> ${new Date().toLocaleString('ro-RO')}</p>
        <p><strong>Session ID:</strong> ${sessionId}</p>
        <hr>
        <p>Mulțumim pentru achiziție!</p>
        <p>Pentru întrebări: contact@corcodusa.ro</p>
      `
    };
    
    await transporter.sendMail(invoiceEmail);
    console.log('✅ Invoice sent to customer');
    
    // Step 3: Send PDFs individually
    const pdfFiles = [
      'Alfabetul.pdf',
      'Numere.pdf',
      'FormeSiCulori.pdf',
      'BonusCertificateDeAbsovire.pdf',
      'BonusFiseDeColorat.pdf'
    ];
    
    console.log('\n📤 Sending PDFs individually...');
    let successfulPdfs = 0;
    
    for (const pdfFile of pdfFiles) {
      try {
        await sendEmailWithAttachment(customerEmail, pdfFile);
        console.log(`✅ PDF sent: ${pdfFile}`);
        successfulPdfs++;
      } catch (error) {
        console.log(`⚠️ PDF failed: ${pdfFile} - ${error.message}`);
      }
    }
    
    console.log(`\n📊 PDF Delivery Summary: ${successfulPdfs}/${pdfFiles.length} sent successfully`);
    console.log('🎉 Webhook simulation completed successfully!');
    
  } catch (error) {
    console.error('❌ Error in webhook simulation:', error.message);
  }
}

async function main() {
  await checkStripeConnection();
  await simulateWebhook();
}

main().catch(console.error); 