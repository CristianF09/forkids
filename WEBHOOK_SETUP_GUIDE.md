# Stripe Webhook Setup Guide for Automatic PDF Delivery

## 🎯 **Webhook Configuration**

### **1. Stripe Dashboard Setup**
- **URL**: `https://api.corcodusa.ro/api/webhook`
- **Event Type**: Select **"Checkout"** → **"checkout.session.completed"**
- **API Version**: Latest (2023-10-16 or newer)

### **2. Environment Variables Required**
Make sure these are set in your production environment:

```bash
# Stripe Configuration (LIVE keys)
STRIPE_SECRET_KEY=sk_live_your_live_secret_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_live_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Email Configuration (Zoho)
ZMAIL_USER=contact@corcodusa.ro
ZMAIL_PASS=your_zoho_app_password

# Server Configuration
PORT=5000
NODE_ENV=production
```

## 🔄 **What Happens When Payment is Completed**

### **Step 1: Order Notification** 📧
- **To**: `contact@corcodusa.ro`
- **Subject**: "Comandă nouă - CorcoDușa"
- **Content**: Customer details, product, amount, session ID

### **Step 2: Invoice to Customer** 📄
- **To**: Customer's email
- **Subject**: "Factura pentru [Product Name] - CorcoDușa"
- **Content**: Invoice with payment details

### **Step 3: PDF Delivery** 📚
- **To**: Customer's email
- **Subject**: "Mulțumim pentru achiziția [Product Name]"
- **Attachment**: The purchased PDF file

## 📦 **Product Mapping**

| Product | Price ID | PDF File | Payment Link |
|---------|----------|----------|--------------|
| Pachet Complet | `price_1Rkl17K6Qc2WK3kdsulZ1UxS` | `BonusCertificateDeAbsovire.pdf` | `https://buy.stripe.com/28E3cwc3ceav0OD5hWeZ203` |
| Alfabetul | `price_1Rkl17K6Qc2WK3kdesB8V3Hm` | `Alfabetul .pdf` | `https://buy.stripe.com/14AaEY8R02rNfJxh0EeZ202` |
| Numere | `price_1Rkl16K6Qc2WK3kdu5bsOWqZ` | `Numere.pdf` | `https://buy.stripe.com/fZu8wQ8R0c2n2WLh0EeZ201` |
| Forme și Culori | `price_1Rkl16K6Qc2WK3kdr90F7xZM` | `FormeSiCulori.pdf` | `https://buy.stripe.com/eVqdRaffo2rNfJxbGkeZ200` |

## 🧪 **Testing the Webhook**

### **1. Test Email Configuration**
```bash
# Test email configuration manually by setting up environment variables
# and testing the contact form or webhook functionality
```

### **2. Test Complete Order Flow**
```bash
# Test complete order flow by making a real payment
# and checking webhook processing
```

### **3. Test Webhook Manually**
```bash
# Test webhook manually by configuring Stripe webhook
# and making a test payment
```

## ⚠️ **Common Issues & Solutions**

### **Issue 1: Email Authentication Failed**
- **Cause**: Zoho credentials not configured
- **Solution**: Set `ZMAIL_USER` and `ZMAIL_PASS` in environment variables

### **Issue 2: PDF File Too Large**
- **Cause**: Email providers have attachment size limits
- **Solution**: System automatically sends delivery notification instead

### **Issue 3: Webhook Not Receiving Events**
- **Cause**: Incorrect webhook URL or secret
- **Solution**: Verify URL is `https://api.corcodusa.ro/api/webhook` and secret matches

## 🔍 **Monitoring Webhook Events**

### **Check Webhook Logs**
- Monitor server logs for webhook events
- Look for "💰 Payment completed for session:" messages
- Verify email delivery confirmations

### **Stripe Dashboard**
- Go to Stripe Dashboard → Webhooks
- Check "Recent deliveries" for success/failure
- Verify event types are being sent

## 🚀 **Deployment Checklist**

- [ ] Set all environment variables in production
- [ ] Configure webhook URL in Stripe Dashboard
- [ ] Test email configuration
- [ ] Test complete order flow
- [ ] Monitor first few live payments
- [ ] Verify PDF delivery to customers
- [ ] Confirm order notifications received

## 📞 **Support**

If webhook issues persist:
1. Check server logs for error messages
2. Verify environment variables are set
3. Test email configuration separately
4. Contact support with specific error messages 