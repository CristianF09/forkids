import React from 'react';
import PurchaseSteps from '../components/PurchaseSteps';
import FAQ from '../components/FAQ';
import ForParents from '../components/ForParents';

function Acasa() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#25B838] via-[#FF6B00] to-[#FFD700] text-white py-20 md:py-32 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
                <span className="block">Învățarea devine o</span>
                <span className="block bg-gradient-to-r from-[#2C5F7A] to-[#0A4D68] bg-clip-text text-transparent">Aventură</span>
                <span className="block">alături de Corcodușa</span>
              </h1>

              <p className="text-xl sm:text-2xl md:text-3xl mb-8 max-w-2xl opacity-90 leading-relaxed">
                Alătură-te miilor de copii care explorează matematica, cititul și științele prin jocuri interactive distractive și activități captivante
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                {/* <button className="bg-gradient-to-r from-[#FF6B00] to-[#8B4513] text-white hover:from-[#E05C00] hover:to-[#6B3410] px-8 py-4 rounded-2xl text-xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 inline-flex items-center justify-center group border-4 border-white">
                  🎃 Descarcă GRATUIT E-book-ul Halloween! 🎃
                </button> */}
                <button className="bg-gradient-to-r from-[#0A4D68] to-[#2C5F7A] text-white hover:from-[#083756] hover:to-[#1e3a5f] px-8 py-4 rounded-2xl text-xl font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 border-4 border-white">
                  Pentru Părinți
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="text-2xl">⭐</span>
                  <span className="font-semibold">5/5 Rating</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="text-2xl">📚</span>
                  <span className="font-semibold">150+ Activități</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="text-2xl">🎯</span>
                  <span className="font-semibold">100% Interactive</span>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src="/images/homepage.png"
                  alt="Copil învățând cu materiale Corcodusa"
                  className="w-full h-auto rounded-2xl"
                />

                {/* Speech Bubble */}
                <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-lg">
                  <p className="text-gray-800 font-semibold">Să învățăm împreună!</p>
                  <div className="absolute bottom-0 right-8 transform translate-y-full">
                    <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-[#2C5F7A] to-[#0A4D68] text-white rounded-2xl p-4 shadow-lg">
                  <div className="text-2xl mb-1">🦉</div>
                  <p className="text-sm font-semibold">Înțelept ca o bufniță!</p>
                </div>
              </div>
            </div>
          </div>
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
