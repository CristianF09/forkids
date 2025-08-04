# 🔧 Stripe Live Mode Settings Guide

## 🎯 **Problem: Invoices/PDFs Work in Test Mode but Not in Live Mode**

This is a common issue where everything works in test mode but fails in live mode. Here's how to fix it:

## 📋 **Step-by-Step Dashboard Settings Check**

### **Step 1: Customer Email Settings**

1. **Go to Stripe Dashboard:** https://dashboard.stripe.com/
2. **Ensure you're in Live mode** (toggle in top right)
3. **Navigate to:** Settings → Customer emails
4. **Enable these options:**
   - ✅ **Successful payments** - Sends receipts and invoices
   - ✅ **Failed payments** - Sends failure notifications
   - ✅ **Payment confirmations** - Sends confirmation emails
   - ✅ **Invoice reminders** - Sends invoice reminders

### **Step 2: Invoice Settings**

1. **Go to:** Settings → Billing → Invoices
2. **Enable these options:**
   - ✅ **Create invoices for one-time payments**
   - ✅ **Send invoice PDFs automatically**
   - ✅ **Include invoice PDFs in emails**
   - ✅ **Send invoice reminders**

### **Step 3: Webhook Configuration**

1. **Go to:** Developers → Webhooks
2. **Check your webhook endpoint:**
   - ✅ **Status:** Active
   - ✅ **URL:** `https://your-domain.com/webhook`
   - ✅ **Events selected:**
     - `checkout.session.completed`
     - `invoice.payment_succeeded`
     - `payment_intent.succeeded`

### **Step 4: API Keys Verification**

1. **Go to:** Developers → API Keys
2. **Ensure you're using Live keys:**
   - ✅ **Publishable key:** `pk_live_...`
   - ✅ **Secret key:** `sk_live_...`
3. **Copy these to your .env file**

## 🔍 **Common Live Mode Issues & Solutions**

### **Issue 1: Customer Emails Not Enabled**
**Symptoms:** No automatic emails sent to customers
**Solution:** Enable "Successful payments" in Customer emails settings

### **Issue 2: Invoices Not Created**
**Symptoms:** No invoice PDFs generated
**Solution:** Enable "Create invoices for one-time payments" in Billing settings

### **Issue 3: Webhook Not Receiving Events**
**Symptoms:** Server logs show no webhook events
**Solution:** 
1. Check webhook endpoint URL is correct
2. Ensure webhook is active
3. Verify webhook secret in .env file

### **Issue 4: Wrong API Keys**
**Symptoms:** Authentication errors or test mode behavior
**Solution:** Use Live API keys (sk_live_... not sk_test_...)

## 🧪 **Testing the Fix**

### **Step 1: Update Your .env File**
```env
# Stripe Configuration (LIVE KEYS)
STRIPE_SECRET_KEY=sk_live_your_actual_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_live_your_actual_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_actual_webhook_secret_here

# Email Configuration
ZMAIL_USER=contact@corcodusa.ro
ZMAIL_PASS=your_actual_app_password_here
```

### **Step 2: Test Configuration**
```bash
cd backend
node verify-stripe-live.js
```

### **Step 3: Test Email Flow**
```bash
node ../test-email-flow.js
```

### **Step 4: Make Test Payment**
1. Use test card: `4000 0000 0000 9995`
2. Complete payment
3. Check for:
   - ✅ Server logs show success
   - ✅ contact@corcodusa.ro receives notification
   - ✅ Customer receives PDF email
   - ✅ Stripe sends invoice automatically

## 📊 **Expected Results After Fix**

### **Server Logs:**
```bash
💰 Payment completed for session: cs_live_...
📧 Customer email: test@example.com
📦 Product found: Alfabetul PDF: Alfabetul.pdf
✅ Order notification sent to contact@corcodusa.ro
✅ PDF sent to customer: test@example.com
🎉 All payment processing completed successfully!
```

### **Email Deliveries:**
1. **contact@corcodusa.ro** - Order notification
2. **Customer email** - PDF attachment from your system
3. **Stripe invoice** - Professional invoice from Stripe

### **Stripe Dashboard:**
- **Payments section** - Shows live transaction
- **Customers section** - Shows test customer
- **Invoices section** - Shows generated invoice

## 🚨 **Critical Settings Checklist**

### **Customer Emails (Settings → Customer emails):**
- [ ] Successful payments: **ENABLED**
- [ ] Failed payments: **ENABLED**
- [ ] Payment confirmations: **ENABLED**
- [ ] Invoice reminders: **ENABLED**

### **Billing Settings (Settings → Billing → Invoices):**
- [ ] Create invoices for one-time payments: **ENABLED**
- [ ] Send invoice PDFs automatically: **ENABLED**
- [ ] Include invoice PDFs in emails: **ENABLED**

### **Webhooks (Developers → Webhooks):**
- [ ] Status: **ACTIVE**
- [ ] URL: **CORRECT**
- [ ] Events: **SELECTED**
- [ ] Secret: **CONFIGURED**

### **API Keys (Developers → API Keys):**
- [ ] Using Live keys: **sk_live_... and pk_live_...**
- [ ] Keys in .env file: **CONFIGURED**

## 🔧 **Troubleshooting Steps**

### **If Still Not Working:**

1. **Check Stripe Dashboard Logs:**
   - Go to Developers → Logs
   - Look for webhook delivery errors
   - Check for email sending failures

2. **Verify Webhook Endpoint:**
   - Ensure your server is accessible from internet
   - Check webhook URL is correct
   - Test webhook endpoint manually

3. **Check Email Settings:**
   - Verify Zoho/Gmail credentials
   - Test email sending manually
   - Check spam folders

4. **Monitor Server Logs:**
   - Watch for webhook events
   - Check for email sending errors
   - Verify PDF file access

## 📞 **Next Steps**

1. **Check all Dashboard settings** (above)
2. **Update .env file** with Live keys
3. **Test configuration** with verification scripts
4. **Make test payment** with safe test cards
5. **Monitor all components** for successful delivery

---

**The key is ensuring all Stripe Dashboard settings are properly configured for Live mode!** 