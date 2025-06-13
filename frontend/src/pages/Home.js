import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Download, CreditCard, Shield } from 'lucide-react';
import PurchaseSteps from '../components/PurchaseSteps';
import FAQ from '../components/FAQ';
import ForParents from '../components/ForParents';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Cărți Educaționale pentru Copii
              </h1>
              <p className="text-xl mb-8">
                Descoperă colecția noastră de cărți interactive și materiale educaționale
                care fac învățarea distractivă și captivantă.
              </p>
              <Link
                to="/products"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Explorează Cărțile
              </Link>
            </div>
            <div className="relative">
              <img
                src="/images/img2.png"
                alt="Cărți Educaționale"
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Conținut Educațional</h3>
            <p className="text-gray-600">Materiale create de experți în educație</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Download className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Descărcare Instantă</h3>
            <p className="text-gray-600">Acces imediat după achiziție</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <CreditCard className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Plată Securizată</h3>
            <p className="text-gray-600">Tranzacții sigure și rapide</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Calitate Garantată</h3>
            <p className="text-gray-600">Satisfacție garantată sau banii înapoi</p>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Cărțile Noastre</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Alfabetul */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform">
              <img
                src="/images/alfabetul.jpg"
                alt="Alfabetul"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Alfabetul</h3>
                <p className="text-gray-600 mb-4">
                  Învață literele într-un mod distractiv și interactiv, cu exerciții practice și imagini colorate.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">29.99 RON</span>
                  <Link
                    to="/produse/alfabetul"
                    className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    Vezi Detalii
                  </Link>
                </div>
              </div>
            </div>

            {/* Numere */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform">
              <img
                src="/images/numere.jpg"
                alt="Numere"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Numere</h3>
                <p className="text-gray-600 mb-4">
                  Explorează lumea numerelor prin activități distractive și exerciții practice.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">29.99 RON</span>
                  <Link
                    to="/produse/numere"
                    className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    Vezi Detalii
                  </Link>
                </div>
              </div>
            </div>

            {/* Forme și Culori */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform">
              <img
                src="/images/formesiculori.jpg"
                alt="Forme și Culori"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Forme și Culori</h3>
                <p className="text-gray-600 mb-4">
                  Descoperă forme și culori prin activități interactive și exerciții practice.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">29.99 RON</span>
                  <Link
                    to="/produse/forme-si-culori"
                    className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    Vezi Detalii
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Pregătit să începi?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Descarcă acum cărțile noastre educaționale și ajută-ți copilul să învețe într-un mod distractiv și interactiv.
          </p>
          <Link
            to="/produse"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Vezi Toate Cărțile
          </Link>
        </div>
      </div>

      {/* Purchase Steps */}
      <PurchaseSteps />

      {/* FAQ Section */}
      <FAQ />

      {/* For Parents Section */}
      <ForParents />
    </div>
  );
};

export default Home; 