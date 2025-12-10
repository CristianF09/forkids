require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Import rute existente
const pdfRoutes = require('./routes/pdfs');
const paymentRoutes = require('./routes/payments');
const contactRoutes = require('./routes/contact');
const checkoutRoutes = require('./routes/checkout');
const successRoutes = require('./routes/success');
const webhookRoutes = require('./routes/webhook');
const productsRoutes = require('./routes/products');
const testRoutes = require('./routes/test');

// ✅ Ruta pentru Ebook Leads - COMENTATĂ (funcționalitate dezactivată)
// const ebookLeadsRoutes = require('./routes/ebookLeads');

const app = express();

const log = (...args) => process.stdout.write(`${args.join(' ')}\n`);
const errorLog = (...args) => process.stderr.write(`${args.join(' ')}\n`);

// === Middleware generale ===
const defaultAllowedOrigins = [
  'http://localhost:3000',
  'http://localhost:10000',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:10000',
  'https://corcodusa.ro',
  'https://www.corcodusa.ro',
  'https://forkids-app.onrender.com',
];
const envAllowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);
const allowedOrigins = Array.from(new Set([...defaultAllowedOrigins, ...envAllowedOrigins]));

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    log('❌ CORS blocked for origin:', origin);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

// Stripe webhook trebuie montat înainte de express.json()
app.use('/api/webhook', express.raw({ type: 'application/json' }), webhookRoutes);

// Parse JSON pentru toate celelalte rute
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// === ✅ CONECTARE MONGODB CU DEBUG ===
const mongoUri = process.env.MONGODB_URI;

// Debug MongoDB connection
log('🔍 MongoDB Configuration:');
log('📦 Database from URI:', mongoUri ? mongoUri.split('/').pop().split('?')[0] : 'Not set');
log('👤 User:', mongoUri ? mongoUri.split('//')[1].split(':')[0] : 'Not set');

if (mongoUri) {
  mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
    .then(() => {
      log('✅ Conectat la MongoDB');

    })
    .catch(err => {
      errorLog('❌ Eroare conectare MongoDB:', err.message);
      log('🔧 Verifică:');
      log('   1. MongoDB URI în .env');
      log('   2. Parola pentru user');
      log('   3. IP-ul este whitelisted în MongoDB Atlas');
    });
} else {
  log('❌ MONGODB_URI nu este setat în .env');
}

// Event listeners pentru MongoDB
mongoose.connection.on('connected', () => {
  log('✅ MongoDB connected successfully');
  setTimeout(() => {
    mongoose.connection.db.listCollections().toArray((err, collections) => {
      if (err) {
        errorLog('❌ Eroare la listarea colecțiilor:', err);
        return;
      }
      log('📁 Colecții în baza de date:');
      if (collections.length === 0) {
        log('   - (Nicio colecție încă)');
      } else {
        collections.forEach(collection => {
          log(`   - ${collection.name}`);
        });
      }
    });
  }, 1000);
});

mongoose.connection.on('error', (err) => {
  errorLog('❌ MongoDB connection error:', err);
});

// === Folosim rutele definite ===
app.use('/api/pdfs', pdfRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api', successRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/test', testRoutes);

// ✅ Ruta pentru Ebook Leads - COMENTATĂ (funcționalitate dezactivată)
// app.use('/api/ebook-leads', ebookLeadsRoutes);

// === ✅ Health check cu status MongoDB ===
app.get('/api/health', (req, res) => {
  const mongoStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';

  res.json({
    status: 'ok',
    mongodb: mongoStatus,
    database: mongoose.connection.name || 'not_connected',
    timestamp: new Date().toISOString(),
  });
});

// === ✅ Test route pentru ebook leads - COMENTATĂ (funcționalitate dezactivată) ===
// app.get('/api/debug/ebook-leads', async (req, res) => {
//   try {
//     const EbookLead = require('./models/EbookLead');
//     const leadCount = await EbookLead.countDocuments();
//
//     res.json({
//       success: true,
//       collection: 'ebookleads',
//       totalLeads: leadCount,
//       database: 'ebookhalloween',
//       mongoStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
//     });
//   } catch (error) {
//     res.json({
//       success: false,
//       error: error.message,
//       database: 'ebookhalloween',
//       mongoStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
//     });
//   }
// });

// === Servește frontendul ===
const frontendBuildPath = path.join(__dirname, 'frontend');
log('🔍 Frontend path:', frontendBuildPath);
log('🔍 Files in frontend:', require('fs').readdirSync(frontendBuildPath));

if (require('fs').existsSync(frontendBuildPath)) {
  app.use(express.static(frontendBuildPath, {
    setHeaders: (res) => {
      res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.set('Pragma', 'no-cache');
      res.set('Expires', '0');
    },
  }));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(frontendBuildPath, 'index.html'), {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  });
  log('✅ Frontend build găsit și servit din:', frontendBuildPath);
} else {
  log('⚠️ Frontend build nu a fost găsit la:', frontendBuildPath);
}

// === Middleware erori ===
app.use((err, req, res, next) => {
  void next;
  errorLog(err.stack);
  res.status(500).json({ message: 'A apărut o eroare pe server!' });
});

// === Pornire server ===
const PORT = process.env.PORT || 10000;
const server = app.listen(PORT, () => {
  log(`🚀 Server rulează pe portul ${PORT}`);
});

// === Dacă portul e ocupat, încearcă următorul ===
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const nextPort = parseInt(PORT) + 1;
    log(`⚠️ Portul ${PORT} este ocupat, încerc portul ${nextPort}`);
    app.listen(nextPort, () => {
      log(`🚀 Server rulează acum pe portul ${nextPort}`);
    });
  } else {
    errorLog('❌ Eroare la pornirea serverului:', err);
  }
});
