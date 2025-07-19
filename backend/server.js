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
const webhookRoutes = require('./routes/webhook');

const app = express();

// Middleware generale
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectare MongoDB - înlocuim <DB_PASSWORD> cu parola
const rawMongoUri = process.env.MONGODB_URI;  // ex: mongodb+srv://forkids-admin:<DB_PASSWORD>@cluster...
const dbPassword = encodeURIComponent(process.env.DB_PASSWORD || '');
const mongoUri = rawMongoUri.replace('<DB_PASSWORD>', dbPassword);

mongoose.connect(mongoUri)
  .then(() => console.log('✅ Conectat la MongoDB'))
  .catch(err => console.error('❌ Eroare conectare MongoDB:', err));

// Folosim rutele definite
app.use('/api/pdfs', pdfRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/webhook', webhookRoutes);

// Servește frontendul în producție (din folderul build)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend', 'build')));

  // Servește index.html pentru orice altă rută neidentificată (SPA routing)
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

// Middleware pentru prinderea erorilor
app.use((err, req, res, next) => {
  console.error('❌ Eroare server:', err.stack);
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
    const nextPort = PORT + 1;
    console.log(`⚠️ Portul ${PORT} este ocupat, încerc portul ${nextPort}`);
    app.listen(nextPort, () => {
      console.log(`🚀 Server rulează acum pe portul ${nextPort}`);
    });
  } else {
    console.error('❌ Eroare la pornirea serverului:', err);
  }
});
