import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpenCheck, Heart, Star, ArrowRight } from 'lucide-react';

const DespreNoi = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 md:py-16 lg:py-20">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white/10 rounded-full animate-float"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block p-4 bg-gray-200 rounded-full mb-6">
            <BookOpenCheck className="w-12 h-12 text-[#20BF55]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Despre Noi
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            La Corcodusa.ro, credem că învățarea devine magică atunci când este îmbinată cu joaca și curiozitatea naturală a copiilor.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Card 1: Misiunea noastră */}
          <div className="bg-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="bg-[#20BF55]/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Star className="w-8 h-8 text-[#20BF55]" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Misiunea noastră</h3>
            <p className="text-gray-600">
              Să transformăm învățarea într-o aventură plină de culoare, pentru fiecare copil de 3–7 ani. 
              Creăm materiale digitale simple, colorate și interactive, care îi ajută să învețe alfabetul, 
              numerele, formele și culorile – totul prin joacă!
            </p>
          </div>

          {/* Card 2: Despre Echipă */}
          <div className="bg-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="bg-[#FF6B00]/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-[#FF6B00]" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Despre Echipă</h3>
            <p className="text-gray-600">
              Fișele educative sunt create de o echipă de specialiști în educație timpurie, 
              ilustratori și părinți dedicați, asigurând materiale de înaltă calitate și 
              adaptate nevoilor reale ale copiilor.
            </p>
          </div>

          {/* Card 3: Ce oferim */}
          <div className="bg-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className="bg-[#20BF55]/20 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <BookOpenCheck className="w-8 h-8 text-[#20BF55]" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Ce oferim</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-600">
                <span className="text-[#20BF55] mr-2">✓</span>
                Fișe digitale ușor de descărcat și tipărit
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-[#20BF55] mr-2">✓</span>
                Acces permanent după plată
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-[#20BF55] mr-2">✓</span>
                Adaptate vârstei (3–7 ani)
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-[#20BF55] mr-2">✓</span>
                Ideal pentru acasă, grădiniță sau cluburi educaționale
              </li>
            </ul>
          </div>
        </div>

        {/* Why We're Different */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">De ce suntem diferiți?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3">
              <span className="text-2xl">🎯</span>
              <span className="text-gray-700">Materiale testate și validate pentru eficiență</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <span className="text-2xl">💬</span>
              <span className="text-gray-700">Sprijin rapid la întrebări sau probleme tehnice</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <span className="text-2xl">🔐</span>
              <span className="text-gray-700">Plăți securizate prin Stripe.com</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <span className="text-2xl">📩</span>
              <span className="text-gray-700">Asistență personalizată prin email: contact@corcodusa.ro</span>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-[#20BF55] to-[#FF6B00] rounded-lg p-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ești gata să începi călătoria ta educațională?
          </h2>
          <p className="text-white text-lg mb-6">
            Explorează materialele noastre educaționale și începe să construiești un viitor mai bun pentru copilul tău
          </p>
          <Link
            to="/produse"
            className="inline-flex items-center px-6 py-3 bg-white font-semibold rounded-lg transition-colors hover:text-[#FF6B00]"
          >
            Descoperă Materialele
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DespreNoi;
