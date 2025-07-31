# 🔒 Security Setup Guide

## 🚨 **GitHub Secret Scanning Alert Fixed**

I've removed all hardcoded API keys from your code. Now you need to set up environment variables properly.

## 📋 **Required Environment Variables**

### **Backend (.env file in backend directory)**

```env
# Node Environment
NODE_ENV=production

# MongoDB (Optional)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_actual_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_actual_webhook_secret

# Email Configuration (Zoho)
ZMAIL_USER=contact@corcodusa.ro
ZMAIL_PASS=your_actual_zoho_app_password

# Frontend URLs
REACT_APP_API_URL=https://corcodusa.onrender.com
CLIENT_URL=https://corcodusa.ro

# Server Port
PORT=10000
```

### **Frontend (.env file in frontend directory)**

```env
REACT_APP_API_URL=https://corcodusa.onrender.com
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_stripe_publishable_key
```

## 🔧 **How to Set Up**

### **Step 1: Backend Environment**
1. Go to `backend` directory
2. Create or update `.env` file
3. Add all the variables above with your actual values

### **Step 2: Frontend Environment**
1. Go to `frontend` directory
2. Create `.env` file
3. Add the frontend variables above

### **Step 3: Get Your Stripe Keys**
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Go to **Developers** → **API Keys**
3. Copy your **Secret Key** and **Publishable Key**
4. Go to **Webhooks** → **Add endpoint**
5. Copy your **Webhook Secret**

### **Step 4: Get Your Zoho App Password**
1. Go to [Zoho Mail](https://mail.zoho.com)
2. Login with `contact@corcodusa.ro`
3. Go to **Settings** → **Mail Accounts** → **Security**
4. Generate **App Password**
5. Copy the 16-character password

## ✅ **Security Benefits**

- ✅ No hardcoded secrets in code
- ✅ GitHub Secret Scanning won't flag your repo
- ✅ Safe to share code publicly
- ✅ Easy to change keys without code changes
- ✅ Different keys for development/production

## 🚀 **Testing After Setup**

```bash
# Test backend
cd backend
node test-email-simple.js

# Test frontend
cd frontend
npm start
```

## 📝 **Important Notes**

- **Never commit `.env` files** to Git
- **Use different keys** for development and production
- **Keep your keys secure** and don't share them
- **Rotate keys regularly** for security

## 🔍 **Files Updated**

- ✅ `backend/routes/checkout.js` - Removed hardcoded Stripe key
- ✅ `backend/routes/payments.js` - Removed hardcoded Stripe keys
- ✅ `backend/routes/webhook.js` - Removed hardcoded Stripe keys
- ✅ `frontend/src/config/api.js` - Removed hardcoded Stripe key
- ✅ `backend/env.example` - Created example file

Your code is now secure and ready for deployment! 🎉 