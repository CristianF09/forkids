import React from 'react';
import PurchaseSteps from '../components/PurchaseSteps';
import FAQ from '../components/FAQ';
import ForParents from '../components/ForParents';

function Acasa() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Cărți educative pentru copiii tăi
          </h1>
          <p className="text-xl mb-8">
            Materiale interactive și distractive pentru dezvoltarea abilităților copiilor între 3 și 7 ani
          </p>
          <button className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
            Descoperă cărțile
          </button>
        </div>
      </section>

      {/* Purchase Steps */}
      <PurchaseSteps />

      {/* For Parents Section */}
      <ForParents />

      {/* FAQ Section */}
      <FAQ />
    </div>
  );
}

export default Acasa; 