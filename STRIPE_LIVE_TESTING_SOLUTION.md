# 🧪 Stripe Live Mode Testing Solution

## 🎯 **Goal: Test Stripe Live Without Real Cards**

### **Problem:**
- You want to test Stripe Live mode (not demo/test mode)
- You can't use your real card for testing
- You need to verify payment flow, emails, and PDFs

### **Solution: Use Stripe's Test Cards in Live Mode**

## ✅ **Safe Test Cards for Stripe Live**

These cards work with Stripe Live but **WON'T charge real money**:

### **Successful Payment Cards:**
- **Visa:** `4000 0000 0000 9995`
- **Mastercard:** `5555 5555 5555 4444`
- **American Express:** `3782 822463 10005`

### **Declined Payment Cards:**
- **Visa:** `4000 0000 0000 0002`
- **Mastercard:** `5105 1051 0510 5100`

### **Test Details:**
- **Expiry:** Any future date (e.g., `12/25`)
- **CVC:** Any 3 digits (e.g., `123`)
- **ZIP:** Any valid ZIP code (e.g., `12345`)

## 🔧 **Step-by-Step Testing Process**

### **Step 1: Verify Your Stripe Live Setup**

1. **Check your Stripe Dashboard:**
   - Go to https://dashboard.stripe.com/
   - Ensure you're in **Live mode** (not Test mode)
   - Verify your Live API keys are configured

2. **Verify your .env file has Live keys:**
   ```env
   STRIPE_SECRET_KEY=sk_live_...  # NOT sk_test_...
   STRIPE_PUBLISHABLE_KEY=pk_live_...  # NOT pk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

### **Step 2: Test Environment Setup**

```bash
# Run the environment test
node ../test-webhook.js
```

**Expected Output:**
```
✅ STRIPE_SECRET_KEY: Configured (Live)
✅ STRIPE_PUBLISHABLE_KEY: Configured (Live)
✅ STRIPE_WEBHOOK_SECRET: Configured
✅ ZMAIL_USER: Configured
✅ ZMAIL_PASS: Configured
```

### **Step 3: Test Email Flow**

```bash
# Test email functionality
node ../test-email-flow.js
```

**Expected Output:**
```
✅ Order notification sent successfully!
✅ PDF email sent to customer successfully!
```

### **Step 4: Start Your Servers**

```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm start
```

### **Step 5: Make Test Payment**

1. **Navigate to:** `http://localhost:3000`
2. **Select a product** (e.g., "Alfabetul" - 5 RON)
3. **Use test card:** `4000 0000 0000 9995`
   - Expiry: `12/25`
   - CVC: `123`
   - ZIP: `12345`
4. **Complete the payment**

## 📊 **What to Monitor During Testing**

### **1. Server Logs (Backend Console)**
```bash
# Expected logs:
💰 Payment completed for session: cs_live_...
📧 Customer email: test@example.com
📦 Product found: Alfabetul PDF: Alfabetul.pdf
✅ Order notification sent to contact@corcodusa.ro
✅ PDF sent to customer: test@example.com
🎉 All payment processing completed successfully!
```

### **2. Stripe Dashboard**
1. **Log into Stripe Dashboard**
2. **Check Payments section** - Should show test transaction
3. **Check Customers section** - Should show test customer
4. **Check Invoices section** - Should show generated invoice

### **3. Email Deliveries**
- **contact@corcodusa.ro** - Should receive order notification
- **Customer email** - Should receive PDF attachment
- **Stripe invoice** - Should be sent automatically

## 🚨 **Alternative Testing Methods**

### **Method 1: Use a Friend's Card**
1. Ask a friend to let you test with their card
2. Make a small test payment (5 RON)
3. Immediately refund them through Stripe Dashboard
4. Document the test results

### **Method 2: Use a Prepaid Card**
1. Buy a small prepaid card (like a gift card)
2. Use it for testing
3. The card will be charged but you control the amount

### **Method 3: Use Your Card with Immediate Refund**
1. Use your real card for one test
2. Immediately refund yourself through Stripe Dashboard
3. Document the process for future reference

## 📋 **Complete Testing Checklist**

### **Before Testing:**
- [ ] Stripe Live keys configured in .env
- [ ] Webhook endpoint accessible
- [ ] Email credentials working
- [ ] PDF files present
- [ ] Servers running (backend:10000, frontend:3000)

### **During Testing:**
- [ ] Use test card `4000 0000 0000 9995`
- [ ] Complete payment successfully
- [ ] Check server logs for success messages
- [ ] Verify Stripe Dashboard shows transaction
- [ ] Check all email inboxes

### **Expected Results:**
- [ ] Payment success page displayed
- [ ] Server logs show successful processing
- [ ] contact@corcodusa.ro receives order notification
- [ ] Customer receives PDF email with attachment
- [ ] Stripe sends professional invoice
- [ ] Stripe Dashboard shows live transaction

## 🔒 **Security and Safety**

### **Why Test Cards Are Safe:**
- ✅ These cards are specifically designed for testing
- ✅ They work with Stripe Live but don't charge real money
- ✅ Stripe recognizes them as test cards automatically
- ✅ No real funds are transferred

### **Best Practices:**
- ✅ Never use real card numbers for testing
- ✅ Keep your Stripe keys secure
- ✅ Monitor your Stripe dashboard for any issues
- ✅ Test in a controlled environment

## 🚨 **Troubleshooting**

### **Issue: "Payment failed with test card"**
**Solution:** Ensure you're using the exact test card numbers listed above

### **Issue: "Webhook not receiving events"**
**Solution:** 
1. Check webhook endpoint URL in Stripe Dashboard
2. Verify webhook secret in environment variables
3. Ensure server is accessible from internet

### **Issue: "Email not sending"**
**Solution:** Follow the email setup guide in `ZOHO_EMAIL_FIX.md`

### **Issue: "Stripe shows test mode"**
**Solution:** Ensure you're using Live API keys (sk_live_... not sk_test_...)

## 📊 **Testing Results Template**

```
Test Date: _______________
Tester: _______________

✅ Successful Payment Test:
- Card Used: 4000 0000 0000 9995
- Product: _______________
- Amount: _______________
- Customer Email: _______________
- PDF Received: Yes/No
- Admin Notification: Yes/No
- Stripe Invoice: Yes/No
- Server Logs: Working/Not Working

❌ Declined Payment Test:
- Card Used: 4000 0000 0000 0002
- Error Message: _______________
- Error Handling: Working/Not Working

🔧 Issues Found:
- _______________
- _______________

📝 Notes:
- _______________
- _______________
```

## 🎯 **Next Steps**

1. **Set up your environment** with Live Stripe keys
2. **Test email functionality** with `node ../test-email-flow.js`
3. **Start your servers** and make a test payment
4. **Monitor all components** (server logs, emails, Stripe dashboard)
5. **Document any issues** and fix them before going live

---

**Ready to test?** Follow the step-by-step process above and use the test cards provided! 