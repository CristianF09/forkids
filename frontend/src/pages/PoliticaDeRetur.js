import React from 'react';
import { FileText } from 'lucide-react';

const PoliticaDeRetur = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 md:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-xl shadow-lg p-8 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10">
          Politica de Retur
        </h1>

        <section>
          <div className="space-y-6 text-lg text-gray-700">
            <p>
              Conform legislației în vigoare (OUG nr. 34/2014), produsele digitale descărcabile achiziționate de pe site-ul nostru nu pot fi returnate și nu sunt eligibile pentru rambursare.
            </p>
            <p>
              Prin finalizarea comenzii și descărcarea materialelor digitale, vă exprimați acordul explicit cu privire la începerea execuției contractului digital și confirmați că renunțați la dreptul legal de retragere, odată ce produsul a fost accesat sau descărcat.
            </p>
            <p>
              În cazul în care întâmpinați dificultăți tehnice sau aveți întrebări legate de materialele achiziționate, vă rugăm să ne contactați la <a href="mailto:contact@corcodusa.ro" className="text-[#FF6B00] hover:underline">contact@corcodusa.ro</a>, iar echipa noastră vă va sprijini cu promptitudine.
            </p>
            <p className="text-center font-semibold text-gray-800">
              Vă mulțumim pentru încredere și pentru că ați ales materialele educative digitale Corcodușa! 💛
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PoliticaDeRetur; 