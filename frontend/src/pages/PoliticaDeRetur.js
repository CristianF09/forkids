import React from 'react';

const PoliticaDeRetur = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Politica de Retur</h1>
      
      <div className="space-y-6 text-lg">
        <p className="text-gray-700">
          Conform legislației în vigoare (OUG nr. 34/2014), produsele digitale descărcabile achiziționate de pe site-ul nostru nu pot fi returnate și nu sunt eligibile pentru rambursare.
        </p>

        <p className="text-gray-700">
          Prin finalizarea comenzii și descărcarea materialelor digitale, vă exprimați acordul explicit cu privire la începerea execuției contractului digital și confirmați că renunțați la dreptul legal de retragere, odată ce produsul a fost accesat sau descărcat.
        </p>

        <p className="text-gray-700">
          În cazul în care întâmpinați dificultăți tehnice sau aveți întrebări legate de materialele achiziționate, vă rugăm să ne contactați la{' '}
          <a href="mailto:contact@corcodusa.ro" className="text-blue-600 hover:text-blue-800">
            contact@corcodusa.ro
          </a>
          , iar echipa noastră vă va sprijini cu promptitudine.
        </p>

        <p className="text-gray-700">
          Vă mulțumim pentru încredere și pentru că ați ales materialele educative digitale Corcodușa! 💛
        </p>
      </div>
    </div>
  );
};

export default PoliticaDeRetur; 