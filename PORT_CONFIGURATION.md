# Port Configuration Guide

## 🎯 **Port Setup**

### **Local Development**
- **Backend**: `localhost:10000` (Node.js/Express server)
- **Frontend**: `localhost:3000` (React development server)

### **Render Production**
- **Backend**: `https://forkids-app.onrender.com:10000` (Main service)
- **Frontend**: Served by backend (unified deployment)

## 🔧 **Configuration Files**

### **1. render.yaml**
```yaml
services:
  - type: web
    name: forkids-app
    env: node
    buildCommand: npm install && cd frontend && npm install && cd ../backend && npm install && npm run build
    startCommand: cd backend && npm start
    envVars:
      - key: PORT
        value: 10000  # ✅ Backend port on Render
      - key: REACT_APP_API_URL
        value: https://forkids-app.onrender.com  # ✅ Production API URL
```

### **2. Environment Variables**

#### **Local Development (.env)**
```bash
# Server Configuration
PORT=10000
NODE_ENV=development

# Frontend Configuration
REACT_APP_API_URL=http://localhost:10000
CLIENT_URL=http://localhost:3000
```

#### **Production (Render Environment Variables)**
```bash
# Server Configuration
PORT=10000
NODE_ENV=production

# Frontend Configuration
REACT_APP_API_URL=https://forkids-app.onrender.com
CLIENT_URL=https://forkids-app.onrender.com
```

## 🚀 **How It Works**

### **Local Development**
1. **Backend**: Runs on `localhost:10000`
2. **Frontend**: Runs on `localhost:3000`
3. **Frontend calls**: `http://localhost:10000/api/*`

### **Production (Render)**
1. **Backend**: Runs on `https://forkids-app.onrender.com:10000`
2. **Frontend**: Built and served by backend
3. **Frontend calls**: `https://forkids-app.onrender.com/api/*`

## 📋 **API Endpoints**

### **Local Development**
- Health Check: `http://localhost:10000/api/health`
- Contact Form: `http://localhost:10000/api/contact`
- Webhook: `http://localhost:10000/api/webhook`
- Products: `http://localhost:10000/api/products`

### **Production**
- Health Check: `https://forkids-app.onrender.com/api/health`
- Contact Form: `https://forkids-app.onrender.com/api/contact`
- Webhook: `https://forkids-app.onrender.com/api/webhook`
- Products: `https://forkids-app.onrender.com/api/products`

## 🔍 **Testing**

### **Local Testing**
```bash
# Start backend
cd backend && npm start
# Server runs on localhost:10000

# Start frontend (in another terminal)
cd frontend && npm start
# Frontend runs on localhost:3000
```

### **Production Testing**
```bash
# Deploy to Render
git push origin main
# Render builds and deploys automatically
# Access at https://forkids-app.onrender.com
```

## ⚠️ **Important Notes**

1. **Port 10000**: Used for backend API on both local and production
2. **Port 3000**: Only used for frontend development locally
3. **Production**: Frontend is built and served by backend
4. **CORS**: Configured for both localhost:3000 and localhost:10000
5. **Webhook**: Must use production URL for Stripe webhooks

## 🎯 **Summary**

- **Local**: Backend (10000) + Frontend (3000) = Two services
- **Production**: Backend (10000) serves both API and frontend = One service
- **Port 10000**: Consistent across local and production
- **Port 3000**: Only for local frontend development 