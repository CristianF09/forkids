# 🔑 GET YOUR REAL ENVIRONMENT VARIABLES

## 🚨 **URGENT: Your server is using placeholder values!**

Your server shows: `sk_live_your_stripe_...` - this means you need to get the REAL values.

## 📋 **Step-by-Step Guide:**

### **1. Get Your Stripe Secret Key:**
1. Go to: https://dashboard.stripe.com/apikeys
2. Look for **"Live Secret Key"** (starts with `sk_live_`)
3. Copy the entire key (it's long, like 100+ characters)

### **2. Get Your Webhook Secret:**
1. Go to: https://dashboard.stripe.com/webhooks
2. Find your webhook endpoint: `https://corcodusa.onrender.com/api/webhook`
3. Click on it
4. Look for **"Signing Secret"** (starts with `whsec_`)
5. Copy the entire secret

### **3. Get Your Zoho Email:**
- Your email is probably: `contact@corcodusa.ro`

### **4. Get Your Zoho App Password:**
1. Go to: https://mail.zoho.eu
2. Log in to your Zoho Mail account
3. Go to Settings → Mail Accounts
4. Find "App Passwords" or "Security"
5. Generate a new App Password
6. Copy the generated password (NOT your regular password!)

## 🔧 **Update Render Environment Variables:**

1. **Go to Render Dashboard:** https://dashboard.render.com
2. **Click on your service** (probably named "corcodusa")
3. **Go to "Environment" tab**
4. **Update these variables:**

```
STRIPE_SECRET_KEY = your_real_stripe_secret_key_here
```

```
STRIPE_WEBHOOK_SECRET = whsec_your_real_webhook_secret_from_stripe
```

```
ZMAIL_USER = contact@corcodusa.ro
```

```
ZMAIL_PASS = your_real_zoho_app_password
```

5. **Click "Save Changes"**
6. **Wait for redeployment**

## ✅ **Test After Update:**

1. Make a test payment
2. Check if webhook returns 200 instead of 500
3. Check if emails are sent

## 🆘 **If You Can't Find the Values:**

**For Stripe:**
- Check your Stripe dashboard for the live keys
- Make sure you're looking at LIVE mode, not test mode

**For Zoho:**
- Try generating a new App Password
- Make sure you're using the App Password, not your regular password

**The code is perfect - you just need the real environment variables!** 