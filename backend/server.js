require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const pdfRoutes = require('./routes/pdfs');
const paymentRoutes = require('./routes/payments');
const contactRoutes = require('./routes/contact');
const checkoutRoutes = require('./routes/checkout');
const webhookRoutes = require('./routes/webhook');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectare la MongoDB cu parolă înlocuită în siguranță
const rawMongoUri = process.env.MONGODB_URI; // conține <DB_PASSWORD>
const dbPassword = encodeURIComponent(process.env.DB_PASSWORD || '');
const mongoUri = rawMongoUri.replace('<DB_PASSWORD>', dbPassword);

mongoose.connect(mongoUri)
  .then(() => console.log('Conectat la MongoDB'))
  .catch((err) => console.error('Eroare conectare MongoDB:', err));

// Rute API
app.use('/api/pdfs', pdfRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/webhook', webhookRoutes);

// Servește frontendul în producție
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

// Middleware pentru erori
app.use((err, req, res, next) => {
  console.error('Eroare server:', err.stack);
  res.status(500).json({ message: 'A apărut o eroare pe server!' });
});

// Pornire server
const PORT = process.env.PORT || 10000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server rulează pe portul ${PORT}`);
});

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
