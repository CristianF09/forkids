import React, { useState } from 'react';
import { X, Download, Mail, Phone, User } from 'lucide-react';

const DownloadModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Prenumele este obligatoriu';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Numele este obligatoriu';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email-ul este obligatoriu';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email-ul nu este valid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Numărul de telefon este obligatoriu';
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = 'Numărul de telefon nu este valid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('📤 Trimitem datele către backend:', formData);
      
      // ✅ CORECT: Folosește URL-ul absolut către backend-ul tău REAL
      const API_URL = window.location.hostname === 'localhost' 
        ? 'http://localhost:10000/api/ebook-leads/download-halloween-ebook' // Development
        : 'https://corcodusa.ro/api/ebook-leads/download-halloween-ebook'; // Production
      
      console.log('🔗 Folosim URL:', API_URL);
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('📥 Răspuns primit - Status:', response.status);

      // Verifică dacă request-ul a eșuat
      if (!response.ok) {
        let errorMessage = `Eroare server: ${response.status}`;
        
        try {
          const errorText = await response.text();
          console.error('❌ Eroare server - Detalii:', errorText);
          
          if (errorText) {
            // Încearcă să parsezi ca JSON
            try {
              const errorResult = JSON.parse(errorText);
              errorMessage = errorResult.message || errorMessage;
            } catch {
              // Dacă nu e JSON, folosește textul direct
              if (errorText.includes('<!DOCTYPE')) {
                errorMessage = 'Serverul a returnat o pagină HTML în loc de răspuns API';
              } else {
                errorMessage = errorText.substring(0, 100);
              }
            }
          }
        } catch (textError) {
          console.error('❌ Nu s-a putut citi răspunsul de eroare:', textError);
        }
        
        throw new Error(errorMessage);
      }

      // Procesează răspunsul ca fișier PDF
      const blob = await response.blob();
      console.log('📄 Tipul fișierului primit:', blob.type);
      console.log('📏 Mărimea fișierului:', blob.size, 'bytes');
      
      // Verifică dacă este PDF
      if (blob.type === 'application/pdf' && blob.size > 1000) {
        console.log('✅ Primim fișier PDF valid - începem download...');
        
        // Creează download
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Corcodusa-Halloween-Ebook-Gratuit.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        console.log('✅ Download reușit pentru:', formData.email);

        // Închide modal și resetează formularul
        setTimeout(() => {
          onClose();
          setFormData({ firstName: '', lastName: '', email: '', phone: '' });
          alert('🎃 Mulțumim! E-book-ul s-a descărcat cu succes!');
        }, 1000);
      } 
      else {
        // Poate fi un mesaj JSON de eroare
        const text = await blob.text();
        console.log('📄 Conținutul răspunsului:', text.substring(0, 200));
        
        try {
          const result = JSON.parse(text);
          if (result.success) {
            alert('✅ Datele au fost salvate cu succes!');
          } else {
            throw new Error(result.message || 'Eroare la procesarea datelor');
          }
        } catch (parseError) {
          throw new Error(`Răspuns neașteptat de la server: ${text.substring(0, 100)}`);
        }
      }

    } catch (error) {
      console.error('❌ Eroare completă la submit:', error);
      alert('❌ ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto relative">
        {/* Halloween-themed header */}
        <div className="bg-gradient-to-r from-[#FF6B00] to-[#8B4513] text-white p-6 rounded-t-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 left-4 text-4xl">🎃</div>
            <div className="absolute top-1 right-8 text-3xl">👻</div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-2xl">🦇</div>
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-center mb-2">🎃 E-book Halloween GRATUIT! 🎃</h2>
            <p className="text-center text-orange-100">Completează formularul și descarcă imediat cartea noastră de Halloween!</p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-orange-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prenume *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent transition-colors ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Introdu prenumele"
                disabled={isSubmitting}
              />
            </div>
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nume *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent transition-colors ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Introdu numele"
                disabled={isSubmitting}
              />
            </div>
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent transition-colors ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="exemplu@email.com"
                disabled={isSubmitting}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Număr de telefon *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent transition-colors ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="07xx xxx xxx"
                disabled={isSubmitting}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#FF6B00] to-[#8B4513] text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-[#E05C00] hover:to-[#6B3410] transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Se descarcă...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Descarcă E-book-ul GRATUIT! 🎃</span>
              </>
            )}
          </button>

          {/* Privacy Note */}
          <p className="text-xs text-gray-500 text-center mt-4">
            Datele tale sunt protejate și vor fi folosite doar pentru a-ți trimite materialele educationale.
          </p>
        </form>
      </div>
    </div>
  );
};

export default DownloadModal;