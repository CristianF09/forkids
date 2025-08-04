# 🚀 Payment System Setup Guide

## 🔧 **Step 1: Environment Variables Setup**

You need to create a `.env` file in your `backend` directory with your Stripe Live keys.

### 1. **Create `.env` file in backend directory:**

```bash
# Navigate to backend directory
cd backend

# Create .env file (Windows PowerShell)
New-Item -ItemType File -Name ".env"
```

### 2. **Add your Stripe Live configuration:**

Open the `.env` file and add:

```env
# Node Environment
NODE_ENV=production

# Stripe Configuration (LIVE KEYS)
STRIPE_SECRET_KEY=sk_live_your_actual_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_live_your_actual_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_actual_webhook_secret_here

# Email Configuration (Zoho)
ZMAIL_USER=contact@corcodusa.ro
ZMAIL_PASS=your_actual_zoho_app_password_here

# Frontend URLs (Update with your actual domain)
REACT_APP_API_URL=https://your-domain.com
CLIENT_URL=https://your-domain.com

# Server Port
PORT=10000
```

### 3. **Get your Stripe Live keys:**

1. **Log into Stripe Dashboard:** https://dashboard.stripe.com/
2. **Go to Developers → API Keys**
3. **Copy your Live keys:**
   - **Publishable key:** `pk_live_...`
   - **Secret key:** `sk_live_...`
4. **Go to Webhooks → Add endpoint**
   - **URL:** `https://your-domain.com/webhook`
   - **Events:** Select `checkout.session.completed` and `invoice.payment_succeeded`
   - **Copy the webhook secret:** `whsec_...`

### 4. **Get your Zoho email credentials:**

1. **Log into Zoho Mail:** https://mail.zoho.com/
2. **Go to Settings → Mail Accounts**
3. **Generate App Password** for `contact@corcodusa.ro`
4. **Use the app password** in `ZMAIL_PASS`

## 🧪 **Step 2: Test Your Setup**

After creating the `.env` file, run the test script:

```bash
# From the backend directory
node ../test-webhook.js
```

**Expected output:**
```
🧪 Starting Payment System Tests...

🔧 Environment Variables Check:
✅ STRIPE_SECRET_KEY: Configured
✅ STRIPE_PUBLISHABLE_KEY: Configured
✅ STRIPE_WEBHOOK_SECRET: Configured
✅ ZMAIL_USER: Configured
✅ ZMAIL_PASS: Configured

📄 PDF Files Check:
✅ Alfabetul.pdf: Found
✅ Numere.pdf: Found
✅ FormeSiCulori.pdf: Found
✅ BonusCertificateDeAbsovire.pdf: Found
```

## 🚀 **Step 3: Start Your Servers**

### Terminal 1 - Backend:
```bash
cd backend
npm start
```

### Terminal 2 - Frontend:
```bash
cd frontend
npm start
```

## 🧪 **Step 4: Payment Testing**

### **Safe Test Cards for Stripe Live:**

#### ✅ **Successful Payment Cards:**
- **Visa:** `4000 0000 0000 9995`
- **Mastercard:** `5555 5555 5555 4444`
- **American Express:** `3782 822463 10005`

#### ❌ **Declined Payment Cards:**
- **Visa:** `4000 0000 0000 0002`
- **Mastercard:** `5105 1051 0510 5100`

### **Test Details:**
- **Expiry:** Any future date (e.g., `12/25`)
- **CVC:** Any 3 digits (e.g., `123`)
- **ZIP:** Any valid ZIP code (e.g., `12345`)

## 📋 **Testing Checklist**

### **Before Testing:**
- [ ] `.env` file created with all variables
- [ ] Test script shows all ✅ (no ❌)
- [ ] Backend server running on port 10000
- [ ] Frontend server running on port 3000
- [ ] Website accessible at `http://localhost:3000`

### **During Testing:**
- [ ] Select a product (e.g., "Alfabetul" - 5 RON)
- [ ] Use test card `4000 0000 0000 9995`
- [ ] Complete payment successfully
- [ ] Check email received with PDF
- [ ] Check admin notification sent
- [ ] Check Stripe dashboard for transaction

### **Expected Results:**
- ✅ Payment success page displayed
- ✅ Customer receives email with PDF attachment
- ✅ `contact@corcodusa.ro` receives order notification
- ✅ Stripe generates invoice automatically
- ✅ Server logs show successful processing

## 🚨 **Common Issues & Solutions**

### **Issue: "Environment variables missing"**
**Solution:** Make sure `.env` file is in the `backend` directory and contains all required variables

### **Issue: "PDF not found"**
**Solution:** ✅ **FIXED** - Updated product configuration to match actual file names

### **Issue: "Payment fails"**
**Solution:** Use the exact test card numbers listed above

### **Issue: "Email not sending"**
**Solution:** 
1. Check Zoho credentials in `.env`
2. Verify email service configuration
3. Check server logs for email errors

### **Issue: "Webhook not working"**
**Solution:**
1. Verify webhook URL in Stripe Dashboard
2. Check webhook secret in `.env`
3. Ensure server is accessible from internet

## 🔒 **Security Notes**

- ✅ Test cards are safe and won't charge real money
- ✅ These cards work with Stripe Live for testing
- ✅ Never use real card numbers for testing
- ✅ Keep your Stripe keys secure

## 📞 **Need Help?**

If you encounter issues:
1. Check the server logs for error messages
2. Verify all environment variables are set correctly
3. Ensure your domain is accessible for webhooks
4. Test with the exact card numbers provided

---

**Next Steps:**
1. Create the `.env` file with your actual Stripe Live keys
2. Run the test script to verify setup
3. Start your servers
4. Follow the testing guide in `TESTING_GUIDE.md` 