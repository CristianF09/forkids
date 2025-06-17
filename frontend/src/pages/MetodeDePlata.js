import React from 'react';
import { CreditCard } from 'lucide-react';

const MetodeDePlata = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 md:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-xl shadow-lg p-8 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10">
          Metode de Plată
        </h1>

        {/* Metode de Plată */}
        <section>
          <div className="space-y-6 text-lg text-gray-700">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 mt-8">Metode de Plată</h2>
            <p>
              Produsele de pe <span className="font-semibold">www.corcodusa.ro</span> pot fi achiziționate prin următoarele metode:
            </p>

            <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <CreditCard className="w-6 h-6 text-[#FF6B00] mr-3" />
                <h3 className="text-xl font-semibold text-gray-800">Plată cu cardul bancar</h3>
              </div>
              <p className="mb-3">
                Puteți efectua plata online, în siguranță deplină, folosind un card emis sub sigla VISA (Classic sau Electron) sau MASTERCARD (inclusiv Maestro). Nu se percep comisioane suplimentare.
              </p>
              <p className="mb-3">
                Procesarea plăților este realizată de platforma securizată <span className="font-semibold text-[#FF6B00]">Stripe.com</span>. Datele cardului nu sunt stocate și sunt criptate, transmise direct către banca procesatoare printr-o conexiune securizată.
              </p>
              <p>
                Toate plățile se efectuează în LEI, la cursul de schimb stabilit de banca emitentă. Tranzacțiile vor apărea pe extrasul de cont sub denumirea <span className="font-semibold">Corcodusa.ro</span>
              </p>
              <div className="flex space-x-4 mt-4">
                <i className="payment-icon payment-icon-style-card payment-icon-mastercard text-4xl"></i>
                <i className="payment-icon payment-icon-style-card payment-icon-visa text-4xl"></i>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 mt-8">Date cu Caracter Personal</h2>
            <p className="mb-3">
              Pentru a finaliza o comandă pe <span className="font-semibold">www.corcodusa.ro</span>, este necesar să furnizați informații precum: nume, prenume, email, adresă, date de facturare (inclusiv CNP și date firmă, dacă este cazul).
            </p>
            <p className="mb-3">
              Prin completarea formularului de comandă, vă exprimați acordul pentru colectarea și prelucrarea acestor date, în conformitate cu legislația în vigoare privind protecția datelor personale (GDPR).
            </p>
            <p>
              Pentru întrebări legate de modul în care vă sunt procesate datele sau pentru exercitarea drepturilor prevăzute de lege, ne puteți contacta oricând la:
              <br/>
              <a href="mailto:contact@corcodusa.ro" className="text-[#FF6B00] hover:underline flex items-center mt-2">
                <span className="mr-2">📩</span> contact@corcodusa.ro
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MetodeDePlata; 