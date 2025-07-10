import React from 'react';

const Cancel = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-red-50">
    <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">Plata a fost anulată</h1>
    <p className="text-lg text-gray-700 mb-6">Poți încerca din nou oricând dorești.</p>
    <a href="/" className="text-blue-600 hover:underline">Înapoi la homepage</a>
  </div>
);

export default Cancel; 