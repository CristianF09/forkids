import React from 'react';

const Success = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4 text-center">
    <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-4">🎉 Mulțumim pentru comandă!</h1>
    <p className="text-lg text-gray-700 mb-6">
      Plata a fost procesată cu succes.<br />
      📩 Vei primi un e-mail cu linkul de descărcare al materialelor digitale.<br />
      📁 Dacă nu îl găsești în Inbox, verifică și folderul Spam / Promoții.<br />
      🖨️ Toate materialele sunt în format A4, gata de imprimat.
    </p>
    <a href="/" className="text-blue-600 hover:underline">Înapoi la homepage</a>
  </div>
);

export default Success; 