# 🔧 RENDER ENVIRONMENT VARIABLES SETUP

## 🎯 **Current Status: Variables Set But Not Configured**

I can see you have all the environment variables in Render, but they're showing "value" which means they need proper values.

## 📝 **Required Values for Each Variable**

### **✅ Already Working (Keep as is):**
- `MONGODB_URI` - ✅ Already has correct value

### **🔧 Need to Update:**

#### **1. ZMAIL_USER**
```
Key: ZMAIL_USER
Value: contact@corcodusa.ro
```

#### **2. ZMAIL_PASS**
```
Key: ZMAIL_PASS
Value: your_zoho_app_password_here
```
**Note:** This should be your Zoho App Password, not your regular password.

#### **3. STRIPE_SECRET_KEY**
```
Key: STRIPE_SECRET_KEY
Value: sk_live_your_live_stripe_secret_key
```

#### **4. STRIPE_WEBHOOK_SECRET**
```
Key: STRIPE_WEBHOOK_SECRET
Value: whsec_your_webhook_secret
```

#### **5. PORT**
```
Key: PORT
Value: 10000
```

#### **6. NODE_ENV**
```
Key: NODE_ENV
Value: production
```

#### **7. CLIENT_URL**
```
Key: CLIENT_URL
Value: https://corcodusa.ro
```

#### **8. DB_PASSWORD**
```
Key: DB_PASSWORD
Value: gZMTY7H2dkM32rXZ
```

#### **9. JWT_SECRET**
```
Key: JWT_SECRET
Value: your_jwt_secret_here
```

## 🚀 **How to Update in Render**

### **Step 1: Update Each Variable**
1. **Click on each variable** in Render
2. **Replace "value" with the actual value**
3. **Save each one**

### **Step 2: Get Zoho App Password**
If you don't have the Zoho App Password:
1. **Log into Zoho Mail** at https://mail.zoho.eu
2. **Go to Settings** → **Mail Accounts** → **Security**
3. **Generate an App Password**
4. **Copy it and use as ZMAIL_PASS value**

### **Step 3: Get Stripe Keys**
If you need your Stripe keys:
1. **Log into Stripe Dashboard**
2. **Go to Developers** → **API Keys**
3. **Copy your live secret key**
4. **Use as STRIPE_SECRET_KEY value**

### **Step 4: Get Webhook Secret**
For the webhook secret:
1. **In Stripe Dashboard** → **Developers** → **Webhooks**
2. **Find your webhook endpoint**
3. **Copy the signing secret**
4. **Use as STRIPE_WEBHOOK_SECRET value**

## 📊 **Final Environment Variables Should Look Like:**

```
CLIENT_URL=https://corcodusa.ro
DB_PASSWORD=gZMTY7H2dkM32rXZ
JWT_SECRET=your_jwt_secret_here
MONGODB_URI=mongodb+srv://forkids-admin:gZMTY7H2dkM32rXZ@cluster0.c4t3ydg.mongodb.net/corcodusa?retryWrites=true&w=majority&appName=Cluster0
NODE_ENV=production
PORT=10000
STRIPE_SECRET_KEY=sk_live_your_live_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
ZMAIL_PASS=your_zoho_app_password_here
ZMAIL_USER=contact@corcodusa.ro
```

## 🧪 **After Updating Variables**

### **1. Redeploy:**
1. **Go to "Manual Deploy" tab**
2. **Click "Deploy latest commit"**
3. **Wait for deployment to complete**

### **2. Test Contact Form:**
```bash
curl -X POST https://corcodusa.ro/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
```

### **3. Expected Results:**
- ✅ Contact form returns 200 status
- ✅ Email sent to contact@corcodusa.ro
- ✅ No more "development mode" messages

## 🎯 **Priority Variables to Fix First**

**Most Important (for contact form):**
1. `ZMAIL_USER` = contact@corcodusa.ro
2. `ZMAIL_PASS` = your_zoho_app_password

**For Stripe payments:**
3. `STRIPE_SECRET_KEY` = your_live_stripe_key
4. `STRIPE_WEBHOOK_SECRET` = your_webhook_secret

**For server:**
5. `PORT` = 10000
6. `NODE_ENV` = production

## 🏆 **Status**

**Current:** ❌ Environment variables have placeholder "value"
**After Fix:** ✅ Contact form and all features will work perfectly

**Next Action:** Update each environment variable with the correct value 