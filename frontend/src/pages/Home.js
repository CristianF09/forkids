import React from 'react';
import { Link } from 'react-router-dom';
import PurchaseSteps from '../components/PurchaseSteps';
import FAQ from '../components/FAQ';
import ForParents from '../components/ForParents';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Descoperă Lumea Cărților Educaționale
              </h1>
              <p className="text-lg mb-8">
                Cărți digitale interactive pentru dezvoltarea copiilor tăi, create cu grijă și dedicare.
              </p>
              <Link
                to="/produse"
                className="bg-secondary hover:bg-accent text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
              >
                Explorează Cărțile
              </Link>
            </div>
            <div className="relative">
              <img
                src="../images/img2"
                alt="Corcodușa Books"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-primary mb-12 text-center">
          Cărțile Noastre
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Alfabetul */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="../images/alfabetul"
              alt="Alfabetul"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-primary mb-2">
                Alfabetul
              </h3>
              <p className="text-gray-600 mb-4">
                Învață literele într-un mod distractiv și interactiv.
              </p>
              <Link
                to="/produse/alfabetul"
                className="inline-block bg-secondary hover:bg-accent text-white px-6 py-2 rounded-md transition-colors"
              >
                Vezi Detalii
              </Link>
            </div>
          </div>

          {/* Numere */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="../images/numere"
              alt="Numere"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-primary mb-2">
                Numere
              </h3>
              <p className="text-gray-600 mb-4">
                Descoperă lumea numerelor prin activități distractive.
              </p>
              <Link
                to="/produse/numere"
                className="inline-block bg-secondary hover:bg-accent text-white px-6 py-2 rounded-md transition-colors"
              >
                Vezi Detalii
              </Link>
            </div>
          </div>

          {/* Forme și Culori */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src="../images/formesiculori"
              alt="Forme și Culori"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-primary mb-2">
                Forme și Culori
              </h3>
              <p className="text-gray-600 mb-4">
                Explorează forme și culori prin activități interactive.
              </p>
              <Link
                to="/produse/forme-si-culori"
                className="inline-block bg-secondary hover:bg-accent text-white px-6 py-2 rounded-md transition-colors"
              >
                Vezi Detalii
              </Link>
            </div>
          </div>
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