import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Star, Heart, Sparkles, ArrowRight, ChevronRight } from 'lucide-react';
import PurchaseSteps from '../components/PurchaseSteps';
import FAQ from '../components/FAQ';
import ForParents from '../components/ForParents';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#20BF55] to-[#01BAEF]">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white/10 rounded-full animate-float"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Educație Distractivă pentru Copiii Tăi
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Descoperă lumea minunată a învățării prin joc cu cărțile noastre educaționale digitale
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/catalog"
                className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-colors flex items-center justify-center"
              >
                <BookOpen className="w-6 h-6 mr-2" />
                Explorează Catalogul
              </Link>
              <Link
                to="/about"
                className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-colors flex items-center justify-center"
              >
                <Sparkles className="w-6 h-6 mr-2" />
                Află Mai Multe
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="bg-[#20BF55]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-[#20BF55]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Cărți Educaționale</h3>
              <p className="text-gray-600">
                Materiale digitale de calitate, create special pentru a face învățarea distractivă și eficientă.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="bg-[#01BAEF]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Star className="w-8 h-8 text-[#01BAEF]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Calitate Garantată</h3>
              <p className="text-gray-600">
                Conținut verificat de experți în educație, adaptat nevoilor copiilor de azi.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="bg-[#20BF55]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-[#20BF55]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Învățare Plăcută</h3>
              <p className="text-gray-600">
                Activități interactive și exerciții distractive pentru o experiență de învățare memorabilă.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Produse Populare</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Product Card 1 */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
              <img src="/products/alfabet.jpg" alt="Alfabetul în Joacă" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Alfabetul în Joacă</h3>
                <p className="text-gray-600 mb-4">
                  Învață literele într-un mod distractiv și interactiv.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-[#20BF55] font-bold text-xl">49 Lei</span>
                  <Link
                    to="/catalog"
                    className="bg-gradient-to-r from-[#20BF55] to-[#01BAEF] text-white px-4 py-2 rounded-xl hover:opacity-90 transition-opacity"
                  >
                    Vezi Detalii
                  </Link>
                </div>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
              <img src="/products/matematica.jpg" alt="Matematică Distractivă" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Matematică Distractivă</h3>
                <p className="text-gray-600 mb-4">
                  Exerciții și probleme pentru învățarea matematicii prin joc.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-[#01BAEF] font-bold text-xl">59 Lei</span>
                  <Link
                    to="/catalog"
                    className="bg-gradient-to-r from-[#20BF55] to-[#01BAEF] text-white px-4 py-2 rounded-xl hover:opacity-90 transition-opacity"
                  >
                    Vezi Detalii
                  </Link>
                </div>
              </div>
            </div>

            {/* Product Card 3 */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
              <img src="/products/culori.jpg" alt="Aventuri în Culori" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Aventuri în Culori</h3>
                <p className="text-gray-600 mb-4">
                  Explorează lumea culorilor prin activități creative.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-[#20BF55] font-bold text-xl">45 Lei</span>
                  <Link
                    to="/catalog"
                    className="bg-gradient-to-r from-[#20BF55] to-[#01BAEF] text-white px-4 py-2 rounded-xl hover:opacity-90 transition-opacity"
                  >
                    Vezi Detalii
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/catalog"
              className="inline-flex items-center bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-colors"
            >
              Vezi Toate Produsele
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Ce Spun Părinții</h2>
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" id="testimonial-carousel">
                {/* Testimonial 1 */}
                <div className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg h-full">
                    <div className="flex items-center mb-4">
                      <Star className="w-5 h-5 text-[#20BF55]" />
                      <Star className="w-5 h-5 text-[#20BF55]" />
                      <Star className="w-5 h-5 text-[#20BF55]" />
                      <Star className="w-5 h-5 text-[#20BF55]" />
                      <Star className="w-5 h-5 text-[#20BF55]" />
                    </div>
                    <p className="text-gray-600 mb-4">
                      "Materialele sunt excelente! Copilul meu învață cu plăcere și nu mai trebuie să-l conving să studieze. Recomand cu încredere!"
                    </p>
                    <p className="text-gray-800 font-semibold">- Maria D.</p>
                  </div>
                </div>

                {/* Testimonial 2 */}
                <div className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg h-full">
                    <div className="flex items-center mb-4">
                      <Star className="w-5 h-5 text-[#01BAEF]" />
                      <Star className="w-5 h-5 text-[#01BAEF]" />
                      <Star className="w-5 h-5 text-[#01BAEF]" />
                      <Star className="w-5 h-5 text-[#01BAEF]" />
                      <Star className="w-5 h-5 text-[#01BAEF]" />
                    </div>
                    <p className="text-gray-600 mb-4">
                      "Calitatea materialelor este remarcabilă. Copilul meu a progresat mult în scurt timp. Mulțumim pentru această inițiativă!"
                    </p>
                    <p className="text-gray-800 font-semibold">- Ion P.</p>
                  </div>
                </div>

                {/* Testimonial 3 */}
                <div className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg h-full">
                    <div className="flex items-center mb-4">
                      <Star className="w-5 h-5 text-[#20BF55]" />
                      <Star className="w-5 h-5 text-[#20BF55]" />
                      <Star className="w-5 h-5 text-[#20BF55]" />
                      <Star className="w-5 h-5 text-[#20BF55]" />
                      <Star className="w-5 h-5 text-[#20BF55]" />
                    </div>
                    <p className="text-gray-600 mb-4">
                      "Cărțile sunt foarte bine structurate și copilul meu le adoră. Activitățile sunt distractive și educative în același timp."
                    </p>
                    <p className="text-gray-800 font-semibold">- Ana M.</p>
                  </div>
                </div>

                {/* Testimonial 4 */}
                <div className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg h-full">
                    <div className="flex items-center mb-4">
                      <Star className="w-5 h-5 text-[#01BAEF]" />
                      <Star className="w-5 h-5 text-[#01BAEF]" />
                      <Star className="w-5 h-5 text-[#01BAEF]" />
                      <Star className="w-5 h-5 text-[#01BAEF]" />
                      <Star className="w-5 h-5 text-[#01BAEF]" />
                    </div>
                    <p className="text-gray-600 mb-4">
                      "Excelent pentru pregătirea școlară! Materialele sunt adaptate perfect pentru vârsta copilului și foarte ușor de folosit."
                    </p>
                    <p className="text-gray-800 font-semibold">- Cristina R.</p>
                  </div>
                </div>

                {/* Testimonial 5 */}
                <div className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg h-full">
                    <div className="flex items-center mb-4">
                      <Star className="w-5 h-5 text-[#20BF55]" />
                      <Star className="w-5 h-5 text-[#20BF55]" />
                      <Star className="w-5 h-5 text-[#20BF55]" />
                      <Star className="w-5 h-5 text-[#20BF55]" />
                      <Star className="w-5 h-5 text-[#20BF55]" />
                    </div>
                    <p className="text-gray-600 mb-4">
                      "Îmi place foarte mult că pot descărca materialele instant și să le folosesc oriunde. Calitatea este excepțională!"
                    </p>
                    <p className="text-gray-800 font-semibold">- Andrei V.</p>
                  </div>
                </div>

                {/* Testimonial 6 */}
                <div className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg h-full">
                    <div className="flex items-center mb-4">
                      <Star className="w-5 h-5 text-[#01BAEF]" />
                      <Star className="w-5 h-5 text-[#01BAEF]" />
                      <Star className="w-5 h-5 text-[#01BAEF]" />
                      <Star className="w-5 h-5 text-[#01BAEF]" />
                      <Star className="w-5 h-5 text-[#01BAEF]" />
                    </div>
                    <p className="text-gray-600 mb-4">
                      "Cea mai bună investiție pentru educația copilului meu. Materialele sunt interactive și foarte bine organizate."
                    </p>
                    <p className="text-gray-800 font-semibold">- Elena S.</p>
                  </div>
                </div>

                {/* Testimonial 7 */}
                <div className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg h-full">
                    <div className="flex items-center mb-4">
                      <Star className="w-5 h-5 text-[#20BF55]" />
                      <Star className="w-5 h-5 text-[#20BF55]" />
                      <Star className="w-5 h-5 text-[#20BF55]" />
                      <Star className="w-5 h-5 text-[#20BF55]" />
                      <Star className="w-5 h-5 text-[#20BF55]" />
                    </div>
                    <p className="text-gray-600 mb-4">
                      "Recomand cu toată încrederea! Copilul meu așteaptă cu nerăbdare momentul când facem exercițiile împreună."
                    </p>
                    <p className="text-gray-800 font-semibold">- Mihai L.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={() => {
                const carousel = document.getElementById('testimonial-carousel');
                carousel.scrollLeft -= carousel.offsetWidth;
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full shadow-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => {
                const carousel = document.getElementById('testimonial-carousel');
                carousel.scrollLeft += carousel.offsetWidth;
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full shadow-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots Navigation */}
            <div className="flex justify-center mt-8 space-x-2">
              {[0, 1, 2, 3, 4].map((index) => (
                <button
                  key={index}
                  onClick={() => {
                    const carousel = document.getElementById('testimonial-carousel');
                    carousel.scrollLeft = index * carousel.offsetWidth;
                  }}
                  className="w-3 h-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Purchase Steps */}
      <PurchaseSteps />

      {/* FAQ Section */}
      <FAQ />

      {/* For Parents Section */}
      <ForParents />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Home; 