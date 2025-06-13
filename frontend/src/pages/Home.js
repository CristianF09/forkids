import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Învățare distractivă pentru copii de 3-7 ani
          </h1>
          <p className="text-xl mb-8">
            Descoperă cărțile noastre interactive în format PDF care transformă educația în joacă și dezvoltă abilitățile copilului tău într-un mod creativ și captivant!
          </p>
          <div className="space-x-4">
            <Link to="/produse" className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
              Vezi produsele
            </Link>
            <Link to="/demo" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition">
              Vezi demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">De ce Corcodușa este alegerea perfectă?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <h3 className="text-xl font-semibold mb-4">Dezvoltă gândirea</h3>
            <p className="text-gray-600">
              Activitățile noastre stimulează gândirea critică și ajută la dezvoltarea abilităților cognitive într-un mod captivant.
            </p>
          </div>
          <div className="text-center p-6">
            <h3 className="text-xl font-semibold mb-4">Încurajează creativitatea</h3>
            <p className="text-gray-600">
              Desenele și activitățile creative dezvoltă imaginația și expresivitatea copilului tău.
            </p>
          </div>
          <div className="text-center p-6">
            <h3 className="text-xl font-semibold mb-4">Învață prin joacă</h3>
            <p className="text-gray-600">
              Transformăm educația într-o experiență distractivă, pentru că știm că copiii învață cel mai bine când se joacă.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Cărțile noastre interactive</h2>
          <p className="text-center text-gray-600 mb-12">
            Peste 150 de pagini cu activități distractive și educative recomandate de părinți și cadre didactice pentru copii între 3 și 7 ani.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Product Cards */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Alfabetul în Joacă</h3>
                <p className="text-gray-600 mb-4">3-5 ani</p>
                <p className="text-gray-600 mb-4">
                  Învață literele și scrisul de mână prin activități captivante și jocuri interactive.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">39 Lei</span>
                  <button className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700">
                    Adaugă în coș
                  </button>
                </div>
              </div>
            </div>
            {/* Add other product cards similarly */}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Ce spun părinții despre noi</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 mb-4">
              "Fetița mea de 4 ani adoră activitățile din Alfabetul în Joacă. A învățat literele într-un mod distractiv și acum recunoaște aproape toate literele!"
            </p>
            <div className="font-semibold">Andreea M.</div>
            <div className="text-gray-500">mamă a unui copil de 4 ani</div>
          </div>
          {/* Add other testimonials similarly */}
        </div>
      </section>
    </div>
  );
}

export default Home; 