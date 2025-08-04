# 🧪 Client Testing Guide: cris7i_laurentiu@yahoo.com

## 🎯 **Test Scenario**
- **Client Email:** cris7i_laurentiu@yahoo.com
- **Test Product:** Alfabetul (5 RON)
- **Payment Method:** Safe test card
- **Expected Results:** PDF delivery + Stripe invoice

## 🔧 **Step 1: Environment Setup**

### **Create .env File**
Create a `.env` file in your `backend` directory:

```env
# Node Environment
NODE_ENV=production

# Stripe Configuration (LIVE KEYS)
STRIPE_SECRET_KEY=sk_live_your_actual_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_live_your_actual_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_actual_webhook_secret_here

# Email Configuration
ZMAIL_USER=contact@corcodusa.ro
ZMAIL_PASS=your_actual_app_password_here

# Frontend URLs
REACT_APP_API_URL=https://your-domain.com
CLIENT_URL=https://your-domain.com

# Server Port
PORT=10000
```

### **Get Your Stripe Live Keys**
1. **Go to:** https://dashboard.stripe.com/
2. **Ensure Live mode** (toggle in top right)
3. **Go to:** Developers → API Keys
4. **Copy Live keys:**
   - Publishable key: `pk_live_...`
   - Secret key: `sk_live_...`

### **Set Up Webhook**
1. **Go to:** Developers → Webhooks
2. **Add endpoint:** `https://your-domain.com/webhook`
3. **Select events:**
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
4. **Copy webhook secret:** `whsec_...`

## 🧪 **Step 2: Test Configuration**

### **Verify Setup**
```bash
cd backend
node check-stripe-settings.js
```

**Expected Output:**
```
✅ Using Live API keys
✅ Stripe connection successful
✅ Webhook secret configured
✅ Email credentials configured
```

### **Test Email Flow**
```bash
node ../test-email-flow.js
```

**Expected Output:**
```
✅ Order notification sent successfully!
✅ PDF email sent to customer successfully!
```

## 🚀 **Step 3: Start Servers**

### **Terminal 1 - Backend:**
```bash
cd backend
npm start
```

### **Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

## 🧪 **Step 4: Client Test Payment**

### **Test Details:**
- **Client Email:** cris7i_laurentiu@yahoo.com
- **Product:** Alfabetul (5 RON)
- **Test Card:** `4000 0000 0000 9995`
- **Expiry:** `12/25`
- **CVC:** `123`
- **ZIP:** `12345`

### **Payment Process:**
1. **Navigate to:** `http://localhost:3000`
2. **Select "Alfabetul"** product
3. **Enter client email:** cris7i_laurentiu@yahoo.com
4. **Use test card:** `4000 0000 0000 9995`
5. **Complete payment**

## 📊 **Step 5: Monitor Results**

### **Server Logs (Backend Console)**
```bash
# Expected logs:
💰 Payment completed for session: cs_live_...
📧 Customer email: cris7i_laurentiu@yahoo.com
📦 Product found: Alfabetul PDF: Alfabetul.pdf
✅ Order notification sent to contact@corcodusa.ro
✅ PDF sent to customer: cris7i_laurentiu@yahoo.com
🎉 All payment processing completed successfully!
```

### **Email Deliveries**
1. **contact@corcodusa.ro** - Order notification
2. **cris7i_laurentiu@yahoo.com** - PDF attachment
3. **Stripe invoice** - Professional invoice from Stripe

### **Stripe Dashboard**
- **Payments section** - Shows live transaction
- **Customers section** - Shows cris7i_laurentiu@yahoo.com
- **Invoices section** - Shows generated invoice

## 📋 **Testing Checklist**

### **Before Testing:**
- [ ] .env file created with Live keys
- [ ] Webhook configured in Stripe Dashboard
- [ ] Email credentials working
- [ ] Servers running (backend:10000, frontend:3000)

### **During Testing:**
- [ ] Client email: cris7i_laurentiu@yahoo.com
- [ ] Product: Alfabetul (5 RON)
- [ ] Test card: 4000 0000 0000 9995
- [ ] Payment completed successfully

### **Expected Results:**
- [ ] Payment success page displayed
- [ ] Server logs show successful processing
- [ ] contact@corcodusa.ro receives order notification
- [ ] cris7i_laurentiu@yahoo.com receives PDF attachment
- [ ] Stripe sends professional invoice
- [ ] Stripe Dashboard shows live transaction

## 🔒 **Safe Test Cards**

### **✅ Successful Payment:**
- **Visa:** `4000 0000 0000 9995`
- **Mastercard:** `5555 5555 5555 4444`

### **❌ Declined Payment:**
- **Visa:** `4000 0000 0000 0002`
- **Mastercard:** `5105 1051 0510 5100`

## 🚨 **Troubleshooting**

### **Issue: "Environment variables missing"**
**Solution:** Create .env file with Live Stripe keys

### **Issue: "Payment fails"**
**Solution:** Use exact test card numbers listed above

### **Issue: "Email not sending"**
**Solution:** Check Zoho/Gmail credentials in .env

### **Issue: "Webhook not working"**
**Solution:** Verify webhook URL and events in Stripe Dashboard

## 📞 **Next Steps**

1. **Set up environment** with Live keys
2. **Test configuration** with verification scripts
3. **Start servers** and make test payment
4. **Monitor all components** for successful delivery
5. **Check client email** for PDF and invoice

---

**Ready to test?** Follow the step-by-step process above and monitor the results! 