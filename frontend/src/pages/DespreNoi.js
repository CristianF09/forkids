import React from 'react';
import { Star, BookOpen, Check, ShieldCheck, MessageCircle, Mail, Heart } from 'lucide-react';

const DespreNoi = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <Star className="w-8 h-8 text-yellow-400 mr-2" fill="#fbbf24" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Despre Noi
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            La Corcodusa.ro, credem că învățarea devine magică atunci când este îmbinată cu joaca și curiozitatea naturală a copiilor.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-200">
          <div className="flex items-start mb-6">
            <BookOpen className="w-10 h-10 text-[#20BF55] mr-4 flex-shrink-0" />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                Misiunea noastră
              </h2>
              <p className="text-gray-600 text-lg">
                Să transformăm învățarea într-o aventură plină de culoare, pentru fiecare copil de 3–7 ani. Creăm materiale digitale simple, colorate și interactive, care îi ajută să învețe alfabetul, numerele, formele și culorile – totul prin joacă!
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-200">
          <div className="flex items-start mb-6">
            <Heart className="w-10 h-10 text-[#FF6B00] mr-4 flex-shrink-0" />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                Cine a realizat fișele?
              </h2>
              <p className="text-gray-600 text-lg">
                Fișele educative sunt create de o echipă de specialiști în educație timpurie, ilustratori și părinți dedicați, asigurând materiale de înaltă calitate și adaptate nevoilor reale ale copiilor.
              </p>
            </div>
          </div>
        </div>

        {/* What We Offer - Updated responsive layout */}
        <div className="bg-gradient-to-r from-[#20BF55] to-[#FF6B00] text-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Ce oferim?
          </h2>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <Check className="w-6 h-6 text-white mr-3 mt-1 flex-shrink-0" />
                <span>Fișe digitale ușor de descărcat și tipărit</span>
              </div>
              <div className="flex items-start">
                <Check className="w-6 h-6 text-white mr-3 mt-1 flex-shrink-0" />
                <span>Acces permanent după plată</span>
              </div>
              <div className="flex items-start">
                <Check className="w-6 h-6 text-white mr-3 mt-1 flex-shrink-0" />
                <span>Adaptate vârstei (3–5 ani, 4–6 ani, 3–7 ani)</span>
              </div>
              <div className="flex items-start">
                <Check className="w-6 h-6 text-white mr-3 mt-1 flex-shrink-0" />
                <span>Ideal pentru acasă, grădiniță sau cluburi educaționale</span>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end lg:w-1/3">
              <img 
                src="/images/homepage.png" 
                alt="Oferte Corcodusa" 
                className="max-w-[280px] w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Why Different */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-200">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            De ce suntem diferiți?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl">
              <div className="bg-[#20BF55]/20 p-4 rounded-full mb-4">
                <ShieldCheck className="w-8 h-8 text-[#20BF55]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Materiale testate</h3>
              <p className="text-gray-600">
                Materiale testate și validate pentru eficiență
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl">
              <div className="bg-[#FF6B00]/20 p-4 rounded-full mb-4">
                <MessageCircle className="w-8 h-8 text-[#FF6B00]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Sprijin rapid</h3>
              <p className="text-gray-600">
                Sprijin rapid la întrebări sau probleme tehnice
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl">
              <div className="bg-[#20BF55]/20 p-4 rounded-full mb-4">
                <ShieldCheck className="w-8 h-8 text-[#20BF55]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Plăți securizate</h3>
              <p className="text-gray-600">
                Plăți securizate prin EuPlatesc
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl">
              <div className="bg-[#FF6B00]/20 p-4 rounded-full mb-4">
                <Mail className="w-8 h-8 text-[#FF6B00]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Asistență personalizată</h3>
              <p className="text-gray-600">
                Asistență personalizată prin email: contact@corcodusa.ro
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-[#FF6B00] to-[#20BF55] text-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Transformă învățarea într-o aventură!
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Vizitează corcodusa.ro și descoperă cum poți transforma învățarea într-o aventură distractivă!
          </p>
          <a 
            href="/produse" 
            className="inline-block bg-white text-[#FF6B00] px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Descoperă produsele
          </a>
        </div>
      </div>
    </div>
  );
};

export default DespreNoi;
