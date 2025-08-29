require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Import rute
const pdfRoutes = require('./routes/pdfs');
const paymentRoutes = require('./routes/payments');
const contactRoutes = require('./routes/contact');
const checkoutRoutes = require('./routes/checkout');
const successRoutes = require('./routes/success');
const webhookRoutes = require('./routes/webhook');
// const emailTestRoutes = require('./routes/emailTest'); // Test route removed
const productsRoutes = require('./routes/products');
const downloadRoutes = require('./routes/download');
const testRoutes = require('./routes/test');

const app = express();

// Middleware generale
const defaultAllowedOrigins = [
  'http://localhost:3000',
  'http://localhost:10000',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:10000',
  'https://corcodusa.ro',
  'https://www.corcodusa.ro',
  'https://forkids-app.onrender.com'
];
const envAllowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);
const allowedOrigins = Array.from(new Set([...defaultAllowedOrigins, ...envAllowedOrigins]));

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser or same-origin
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

// Stripe webhook must be mounted BEFORE express.json(), with express.raw()
app.use('/api/webhook', express.raw({ type: 'application/json' }), webhookRoutes);

// Now parse JSON for all other routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectare MongoDB - folosim direct MONGODB_URI din .env
const mongoUri = process.env.MONGODB_URI;

// MongoDB connection (optional for development)
if (mongoUri) {
  mongoose.connect(mongoUri)
    .then(() => console.log('✅ Conectat la MongoDB'))
    .catch(err => {
      console.error('❌ Eroare conectare MongoDB:', err.message);
      console.log('⚠️ Serverul va rula fără MongoDB pentru testare');
    });
} else {
  console.log('⚠️ MONGODB_URI nu este setat - serverul va rula fără MongoDB');
}

// Folosim rutele definite
app.use('/api/pdfs', pdfRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api', successRoutes); // <-- aici
// app.use('/api', emailTestRoutes); // Email test routes - removed
app.use('/api/products', productsRoutes); // Products routes
app.use('/api/download', downloadRoutes); // Download routes for PDFs
app.use('/api/test', testRoutes); // Local test routes (guarded by env)

// Health check route
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Servește frontendul (din folderul backend/frontend)
const frontendBuildPath = path.join(__dirname, 'frontend');
if (require('fs').existsSync(frontendBuildPath)) {
  // Servește frontendul cu cache control pentru index.html
  app.use(express.static(frontendBuildPath, {
    setHeaders: (res) => {
      res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.set('Pragma', 'no-cache');
      res.set('Expires', '0');
    }
  }));

  // Servește index.html pentru orice altă rută neidentificată (SPA routing)
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(frontendBuildPath, 'index.html'), {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  });
  console.log('✅ Frontend build găsit și servit din:', frontendBuildPath);
} else {
  console.log('⚠️ Frontend build nu a fost găsit la:', frontendBuildPath);
}

// Middleware pentru prinderea erorilor
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'A apărut o eroare pe server!' });
});
  
// Pornire server
const PORT = process.env.PORT || 10000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server rulează pe portul ${PORT}`);
});

// Dacă portul este ocupat, încearcă portul următor
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const nextPort = parseInt(PORT) + 1;
    console.log(`⚠️ Portul ${PORT} este ocupat, încerc portul ${nextPort}`);
    app.listen(nextPort, () => {
      console.log(`🚀 Server rulează acum pe portul ${nextPort}`);
    });
  } else {
    console.error('❌ Eroare la pornirea serverului:', err);
  }
});

if (mongoUri) {
  const masked = mongoUri.replace(/:[^@]+@/, ':****@');
  console.log('🔍 mongoUri configurat:', masked);
}
