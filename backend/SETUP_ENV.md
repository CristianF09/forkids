# Environment Setup Guide for PDF Delivery

## Required Environment Variables

To fix the PDF delivery issue, you need to set up these environment variables in your `.env` file:

### 1. Create a `.env` file in the `backend` folder

```bash
# Navigate to backend folder
cd backend

# Create .env file
touch .env
```

### 2. Add these variables to your `.env` file:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_live_your_actual_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_actual_webhook_secret_here

# Zoho Email Configuration
ZMAIL_USER=your_zoho_email@zoho.eu
ZMAIL_PASS=your_zoho_app_password_here

# Server Configuration (Optional - for download links)
SERVER_URL=https://yourdomain.com
```

## How to Get These Values

### Stripe Keys
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to Developers → API keys
3. Copy your **Secret key** (starts with `sk_live_`)
4. For webhook secret, go to Developers → Webhooks
5. Create a webhook endpoint pointing to your server: `https://yourdomain.com/api/webhook`
6. Copy the webhook signing secret (starts with `whsec_`)

### Zoho Email
1. Go to [Zoho Mail](https://mail.zoho.eu/)
2. Sign in to your account
3. Go to Settings → Mail Accounts → Security
4. Generate an **App Password** (not your regular password)
5. Use your Zoho email address and the app password

### Server URL
- For production: Use your actual domain (e.g., `https://corcodusa.ro`)
- For development: Use `http://localhost:10000`
- This is used to generate download links for large PDFs

## How the New System Works

### 🎯 **Smart PDF Delivery:**
1. **Small PDFs (< 10MB)** → Sent directly via email
2. **Large PDFs (> 10MB)** → Download links provided
3. **Complete Package** → Mix of email attachments + download links

### 📧 **Email Flow:**
1. Customer makes payment
2. System processes webhook
3. Small PDFs sent as email attachments
4. Large PDFs get download links
5. Summary email sent with all download links

### 📥 **Download System:**
- Large PDFs are served via `/api/download/{filename}` endpoint
- Customers click download links to get PDFs directly
- No email size limits to worry about

## Test the Setup

After setting up the environment variables:

1. **Start your server:**
   ```bash
   cd backend
   npm start
   ```

2. **Make a test payment** to verify the complete flow

3. **Check the server logs** for webhook processing

## Common Issues

### ❌ "ZMAIL_USER and ZMAIL_PASS environment variables are required"
- Make sure your `.env` file is in the `backend` folder
- Check that the variable names are exactly as shown
- Restart your server after making changes

### ❌ "Webhook secret not configured"
- Verify your `STRIPE_WEBHOOK_SECRET` is set
- Make sure it starts with `whsec_`

### ❌ "PDF file not found"
- Check that PDF files exist in `backend/public/pdfs/`
- Verify file names match exactly (case-sensitive)

### ❌ Email sending fails
- Verify Zoho credentials are correct
- Check that you're using an App Password, not your regular password
- Ensure your Zoho account allows SMTP access

### ❌ Download links not working
- Verify `SERVER_URL` is set correctly
- Check that the download route is mounted in server.js
- Ensure your server is accessible from the internet

## File Structure

Your backend folder should look like this:
```
backend/
├── .env                    ← Create this file
├── public/
│   └── pdfs/
│       ├── Alfabetul.pdf
│       ├── Numere.pdf
│       ├── FormeSiCulori.pdf
│       ├── BonusFiseDeColorat.pdf
│       └── BonusCertificateDeAbsovire.pdf
├── routes/
│   ├── webhook.js         ← Updated with smart delivery
│   └── download.js        ← New download route
├── services/
│   ├── emailService.js
│   └── pdfDeliveryService.js
└── server.js              ← Updated with download route
```

## Testing Steps

1. ✅ Set up environment variables
2. ✅ Start your server with `npm start`
3. ✅ Make a test payment
4. ✅ Check server logs for webhook processing
5. ✅ Verify email delivery

## What Happens Now

### 🎉 **Before (Broken):**
- Large ZIP files failed to send via email
- Customers received no PDFs
- Error: "Mail Size exceeds limit"

### ✅ **After (Fixed):**
- Small PDFs sent via email (fast delivery)
- Large PDFs get download links (no size limits)
- Customers receive everything they paid for
- Professional delivery experience

## Need Help?

If you're still having issues:
1. Check the server logs for error messages
2. Verify all environment variables are set correctly
3. Check Stripe webhook delivery in your dashboard
4. Make a test payment to verify the complete flow
