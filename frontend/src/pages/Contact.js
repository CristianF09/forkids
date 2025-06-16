import React, { useState } from 'react';
import { Mail, Phone, Clock, MapPin, ShoppingCart, CreditCard, MailCheck, BookOpenCheck, MessageCircle, Star, Heart, Sparkles } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    alert('Mulțumim pentru mesaj! Vă vom contacta în curând.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#20BF55] to-[#01BAEF] py-12">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white/10 rounded-full animate-float"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block p-4 bg-white/20 rounded-full mb-6">
            <MessageCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Contactează-ne
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Suntem aici pentru a răspunde întrebărilor tale și pentru a te ajuta cu orice ai nevoie
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="bg-[#20BF55]/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-[#20BF55]" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Email</h3>
            <p className="text-[#20BF55] font-semibold mb-2">contact@corcodusa.ro</p>
            <p className="text-gray-600">Răspundem în maxim 24 de ore</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="bg-[#01BAEF]/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Phone className="w-8 h-8 text-[#01BAEF]" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Telefon</h3>
            <p className="text-[#01BAEF] font-semibold mb-2">+40 755 123 456</p>
            <p className="text-gray-600">Luni - Vineri: 9:00 - 17:00</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="bg-[#20BF55]/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-[#20BF55]" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Program</h3>
            <p className="text-[#20BF55] font-semibold mb-2">Luni - Vineri: 9:00 - 17:00</p>
            <p className="text-gray-600">Răspundem și la email în weekend</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="bg-[#01BAEF]/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <MapPin className="w-8 h-8 text-[#01BAEF]" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Adresă</h3>
            <p className="text-[#01BAEF] font-semibold mb-2">București, România</p>
            <p className="text-gray-600">Lucrăm 100% digital</p>
          </div>
        </div>

        {/* How We Can Help */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg mb-16">
          <div className="flex items-center justify-center mb-6">
            <Star className="w-8 h-8 text-[#20BF55] mr-2" />
            <h2 className="text-3xl font-bold text-gray-800">Cum te putem ajuta?</h2>
            <Star className="w-8 h-8 text-[#01BAEF] ml-2" />
          </div>
          <ul className="space-y-4">
            <li className="flex items-start bg-white/50 p-4 rounded-xl">
              <Heart className="w-6 h-6 text-[#20BF55] mr-3 mt-1" />
              <span className="text-lg text-gray-700">Ai întrebări despre produsele noastre?</span>
            </li>
            <li className="flex items-start bg-white/50 p-4 rounded-xl">
              <Heart className="w-6 h-6 text-[#01BAEF] mr-3 mt-1" />
              <span className="text-lg text-gray-700">Întâmpini dificultăți la plasarea unei comenzi?</span>
            </li>
            <li className="flex items-start bg-white/50 p-4 rounded-xl">
              <Heart className="w-6 h-6 text-[#20BF55] mr-3 mt-1" />
              <span className="text-lg text-gray-700">Ai nevoie de asistență după achiziție?</span>
            </li>
            <li className="flex items-start bg-white/50 p-4 rounded-xl">
              <Heart className="w-6 h-6 text-[#01BAEF] mr-3 mt-1" />
              <span className="text-lg text-gray-700">Dorești să colaborezi cu noi?</span>
            </li>
          </ul>
          <p className="mt-6 text-gray-700 text-center text-lg">
            Nu ezita să ne contactezi folosind formularul de mai jos sau prin metodele de contact de mai sus.
          </p>
        </div>

        {/* Contact Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <Sparkles className="w-8 h-8 text-[#20BF55] mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">Ai întrebări? Contactează-ne!</h2>
            </div>
            <p className="text-lg text-gray-700 mb-8">
              Suntem aici pentru a te ajuta cu orice întrebare despre produsele noastre
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
                  Nume
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Numele tău"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-[#20BF55]/30 rounded-xl focus:ring-2 focus:ring-[#20BF55] focus:border-[#20BF55] text-lg"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="adresa@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-[#01BAEF]/30 rounded-xl focus:ring-2 focus:ring-[#01BAEF] focus:border-[#01BAEF] text-lg"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">
                  Mesaj
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  placeholder="Scrie mesajul tău aici..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-[#20BF55]/30 rounded-xl focus:ring-2 focus:ring-[#20BF55] focus:border-[#20BF55] text-lg"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#20BF55] to-[#01BAEF] text-white px-8 py-4 rounded-xl text-xl font-bold hover:opacity-90 transition-opacity shadow-lg"
              >
                Trimite mesajul
              </button>
            </form>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Informații de contact</h3>
            <div className="space-y-6">
              <div className="bg-white/50 p-4 rounded-xl">
                <h4 className="font-bold text-gray-700 mb-2">Email</h4>
                <p className="text-[#20BF55] font-semibold">contact@corcodusa.ro</p>
              </div>
              <div className="bg-white/50 p-4 rounded-xl">
                <h4 className="font-bold text-gray-700 mb-2">Telefon</h4>
                <p className="text-[#01BAEF] font-semibold">+40 755 123 456</p>
              </div>
              <div className="bg-white/50 p-4 rounded-xl">
                <h4 className="font-bold text-gray-700 mb-2">Program de răspuns</h4>
                <p className="text-[#20BF55] font-semibold">Luni - Vineri: 9:00 - 17:00</p>
              </div>
              <div className="bg-white/50 p-4 rounded-xl">
                <h4 className="font-bold text-gray-700 mb-2">Urmărește-ne</h4>
                <div className="flex space-x-4">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                     className="text-[#01BAEF] hover:text-[#20BF55] transition-colors">
                    Facebook
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                     className="text-[#01BAEF] hover:text-[#20BF55] transition-colors">
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Proces simplu și rapid</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center transform hover:scale-105 transition-transform duration-300">
              <div className="bg-[#20BF55]/20 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-10 h-10 text-[#20BF55]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Alege cărțile</h3>
              <p className="text-gray-600">
                Selectează cărțile care se potrivesc nevoilor copilului tău sau alege pachetul complet pentru economii maxime.
              </p>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform duration-300">
              <div className="bg-[#01BAEF]/20 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-10 h-10 text-[#01BAEF]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Finalizează comanda</h3>
              <p className="text-gray-600">
                Plătește în siguranță prin sistemul securizat EuPlatesc și primești o confirmare imediată.
              </p>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform duration-300">
              <div className="bg-[#20BF55]/20 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <MailCheck className="w-10 h-10 text-[#20BF55]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Primești email-ul</h3>
              <p className="text-gray-600">
                În câteva minute vei primi un email cu linkul de descărcare pentru cărțile achiziționate.
              </p>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform duration-300">
              <div className="bg-[#01BAEF]/20 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <BookOpenCheck className="w-10 h-10 text-[#01BAEF]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Bucură-te de cărți</h3>
              <p className="text-gray-600">
                Descarcă, printează sau folosește direct pe tabletă – cărțile sunt ale tale pentru totdeauna!
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Contact; 