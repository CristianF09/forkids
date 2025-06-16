import React from 'react';
import { CreditCard } from 'lucide-react';

const MetodeDePlata = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Metode de Plată</h1>
      
      <div className="space-y-6 text-lg">
        <p className="text-gray-700">
          Produsele de pe www.corcodusa.ro pot fi achiziționate prin următoarele metode:
        </p>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <CreditCard className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">Plată cu cardul bancar</h2>
          </div>
          
          <p className="text-gray-700 mb-4">
            Puteți efectua plata online, în siguranță deplină, folosind un card emis sub sigla VISA (Classic sau Electron) sau MASTERCARD (inclusiv Maestro). Nu se percep comisioane suplimentare.
          </p>

          <p className="text-gray-700 mb-4">
            Procesarea plăților este realizată de platforma securizată Stripe. Datele cardului nu sunt stocate și sunt criptate, transmise direct către banca procesatoare printr-o conexiune securizată.
          </p>

          <p className="text-gray-700">
            Toate plățile se efectuează în LEI, la cursul de schimb stabilit de banca emitentă. Tranzacțiile vor apărea pe extrasul de cont sub denumirea Corcodusa.ro.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MetodeDePlata; 