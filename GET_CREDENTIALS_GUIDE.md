# 🔑 GET CREDENTIALS GUIDE: Fix PDF Delivery

## 🎯 **Current Status**

✅ **Stripe Webhook**: Configured correctly
✅ **Webhook URL**: https://api.corcodusa.ro/api/webhook
✅ **Events**: Listening to all required events
❌ **Missing**: Environment variables in your server

## 🛠️ **Step 1: Get Stripe Webhook Secret**

You already have this! From your Stripe dashboard:

1. Go to https://dashboard.stripe.com/webhooks
2. Click on your webhook endpoint
3. Copy the **Signing secret** (starts with `whsec_`)
4. Add it to your `.env` file as: `STRIPE_WEBHOOK_SECRET=whsec_your_actual_secret`

## 🔑 **Step 2: Get Stripe API Keys**

1. Go to https://dashboard.stripe.com/apikeys
2. Copy your **Secret key** (starts with `sk_live_`)
3. Copy your **Publishable key** (starts with `pk_live_`)
4. Add them to your `.env` file:
   ```
   STRIPE_SECRET_KEY=sk_live_your_actual_secret_key
   STRIPE_PUBLISHABLE_KEY=pk_live_your_actual_publishable_key
   ```

## 📧 **Step 3: Get Zoho App Password**

1. Go to https://mail.zoho.com
2. Login with your corcodusa.ro account
3. Click **Settings** (gear icon)
4. Go to **Mail Accounts** → **Security**
5. Find **App Passwords** section
6. Click **Generate App Password**
7. Name it "CorcoDușa App"
8. Copy the generated password (looks like: `abcd1234efgh5678`)
9. Add it to your `.env` file as: `ZMAIL_PASS=your_actual_app_password`

## 📝 **Step 4: Update Your .env File**

Create or update `backend/.env` with all the credentials:

```env
# REQUIRED: Email Configuration (Zoho)
ZMAIL_USER=contact@corcodusa.ro
ZMAIL_PASS=your_actual_zoho_app_password_here

# REQUIRED: Stripe Configuration
STRIPE_SECRET_KEY=sk_live_your_actual_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_actual_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_actual_webhook_secret

# Server Configuration
NODE_ENV=production
PORT=10000
```

## 🧪 **Step 5: Test the Configuration**

After updating the `.env` file, run:

```bash
node test-real-payment-flow.js
```

You should see:
```
✅ ZMAIL_USER: Configured
✅ ZMAIL_PASS: Configured
✅ All email tests completed successfully!
```

## 🚀 **Step 6: Restart Server**

1. Stop your current server (Ctrl+C)
2. Start it again: `cd backend && npm start`
3. Test a payment to verify everything works

## 📋 **What You Need to Get:**

1. **Zoho App Password**: From https://mail.zoho.com
2. **Stripe Secret Key**: From https://dashboard.stripe.com/apikeys
3. **Stripe Publishable Key**: From https://dashboard.stripe.com/apikeys
4. **Stripe Webhook Secret**: From https://dashboard.stripe.com/webhooks

## 🎯 **Expected Results After Fix:**

- ✅ PDFs sent automatically to customers
- ✅ Order notifications sent to contact@corcodusa.ro
- ✅ Webhooks processed correctly
- ✅ All future payments work perfectly

## 🚨 **For Current Customer:**

For `cris7i_laurentiu@yahoo.com` who paid RON 39.00:
- **Product**: Pachet Complet
- **PDF File**: `backend/public/pdfs/BonusCertificateDeAbsovire.pdf`
- **Action**: Manually email this PDF while you set up the credentials

Once you have all the credentials and update the `.env` file, everything will work automatically! 