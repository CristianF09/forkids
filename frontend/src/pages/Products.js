import React from 'react';
import { Download } from 'lucide-react';

const Products = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-4 md:mb-6">
            Cărțile Noastre
          </h1>
          <p className="text-lg md:text-xl text-blue-700 max-w-3xl mx-auto">
            Descoperă colecția noastră de cărți educaționale, create special pentru dezvoltarea copiilor între 3 și 7 ani.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Product Card 1 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <img
              src="/images/alfabetul.jpg"
              alt="Alfabetul"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Alfabetul</h3>
              <p className="text-blue-800 mb-4">
                Învață literele alfabetului într-un mod distractiv și interactiv.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">29.99 RON</span>
                <a
                  href="/pdfs/alfabetul.pdf"
                  className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Descarcă
                </a>
              </div>
            </div>
          </div>

          {/* Product Card 2 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <img
              src="/images/numere.jpg"
              alt="Numerele"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Numerele</h3>
              <p className="text-blue-800 mb-4">
                Explorează lumea numerelor prin exerciții și activități distractive.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">29.99 RON</span>
                <a
                  href="/pdfs/numere.pdf"
                  className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Descarcă
                </a>
              </div>
            </div>
          </div>

          {/* Product Card 3 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <img
              src="/images/formesiculori.jpg"
              alt="Forme și Culori"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Forme și Culori</h3>
              <p className="text-blue-800 mb-4">
                Descoperă formele geometrice și culorile prin activități interactive.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">29.99 RON</span>
                <a
                  href="/pdfs/formesiculori.pdf"
                  className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Descarcă
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-16 md:mt-20 bg-white rounded-xl shadow-lg p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 text-center">
            Despre Cărțile Noastre
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-blue-900 mb-4">Caracteristici</h3>
              <ul className="space-y-3 text-blue-800">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Materiale create de specialiști în educație timpurie
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Activități interactive și distractive
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Imagini colorate și atractive
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Exerciții practice și adaptate vârstei
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-blue-900 mb-4">Cum Funcționează</h3>
              <ul className="space-y-3 text-blue-800">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Alege cărțile dorite
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Plătește în siguranță
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Descarcă instant după achiziție
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Printează sau folosește pe dispozitiv
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products; 