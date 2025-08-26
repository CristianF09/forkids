import React from 'react';
import { Star, Heart, Check, ShieldCheck, MessageCircle, Mail, Lock, Clock, Download, Users, Sparkles } from 'lucide-react';

function DespreNoi() {
  return (
    <div className="min-h-screen bg-white py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header section */}
        <section className="bg-gradient-to-r from-[#20BF55] to-[#FF6B00] text-white py-16 rounded-xl shadow-lg mb-16">
          <div className="text-center px-6">
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
              Despre Noi
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              La <span className="font-semibold">Corcodusa.ro</span>, credem că învățarea devine magică atunci când este îmbinată cu joaca și curiozitatea naturală a copiilor.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-gradient-to-r from-[#20BF55] to-[#FF6B00] text-white py-12 rounded-xl shadow-lg mb-16">
          <div className="flex flex-col md:flex-row items-center gap-8 px-8 md:px-12">
            <div className="md:w-1/3 flex flex-col items-center text-center">
              <div className="bg-white/20 p-4 rounded-full mb-6">
                <Users className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Echipa Noastră
              </h2>
            </div>
            <div className="md:w-2/3">
              <p className="text-white text-lg md:text-xl leading-relaxed">
                Fișele educative sunt create de o echipă de specialiști în educație timpurie, ilustratori și părinți dedicați, asigurând materiale de înaltă calitate și adaptate nevoilor reale ale copiilor.
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100 hover:border-purple-200 transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Download className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Fișe Digitale</h3>
            </div>
            <p className="text-gray-600">Ușor de descărcat și tipărit, disponibile oricând după achiziție</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-orange-100 hover:border-orange-200 transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Acces Permanent</h3>
            </div>
            <p className="text-gray-600">Acces permanent după plată, fără limite de timp</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 hover:border-blue-200 transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Adaptate Vârstei</h3>
            </div>
            <p className="text-gray-600">Materiale special concepute pentru copii între 3-7 ani</p>
          </div>
        </div>

        {/* Contact & Security Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-green-100 rounded-xl">
                <Lock className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Plăți Securizate</h3>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Utilizăm Stripe.com pentru procesarea plăților, asigurând cea mai înaltă securitate a tranzacțiilor dvs.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-100 rounded-xl">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Suport Dedicat</h3>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Suntem aici să vă ajutăm! Contactați-ne oricând la{' '}
              <a href="mailto:contact@corcodusa.ro" className="text-blue-600 hover:text-blue-700 transition-colors">
                contact@corcodusa.ro
              </a>
            </p>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Începeți Aventura Învățării
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Transformați educația copilului dvs. într-o experiență plăcută și interactivă cu materialele noastre special concepute.
          </p>
          <a 
            href="/produse" 
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-colors duration-300"
          >
            Descoperă Materialele
          </a>
        </div>
      </div>
    </div>
  );
}

export default DespreNoi;
