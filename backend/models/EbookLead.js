const mongoose = require('mongoose');

const ebookLeadSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    required: [true, 'Prenumele este obligatoriu'], 
    trim: true,
    maxlength: [50, 'Prenumele nu poate avea mai mult de 50 de caractere']
  },
  lastName: { 
    type: String, 
    required: [true, 'Numele este obligatoriu'], 
    trim: true,
    maxlength: [50, 'Numele nu poate avea mai mult de 50 de caractere']
  },
  email: { 
    type: String, 
    required: [true, 'Emailul este obligatoriu'], 
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Introdu un email valid']
  },
  phone: { 
    type: String, 
    required: [true, 'Numărul de telefon este obligatoriu'], 
    trim: true 
  }
}, {
  timestamps: true // Adaugă automatically createdAt și updatedAt
});

// Index pentru performanță
ebookLeadSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('EbookLead', ebookLeadSchema);
