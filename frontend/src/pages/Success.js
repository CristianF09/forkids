import React from 'react';

const Success = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
    <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-4">Mulțumim pentru comandă!</h1>
    <p className="text-lg text-gray-700 mb-6">Vei primi un email cu linkul de descărcare pentru fisele educative in format digital.</p>
    <a href="/" className="text-blue-600 hover:underline">Înapoi la homepage</a>
  </div>
);

export default Success; 