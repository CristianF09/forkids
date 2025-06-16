import React, { useState } from 'react';
import { Search, Star, ShoppingCart, Sparkles, CheckCircle2, ArrowRight, Lock, Gift } from 'lucide-react';

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Toate' },
    { id: 'alfabet', name: 'Alfabet' },
    { id: 'numere', name: 'Numere' },
    { id: 'culori', name: 'Forme și Culori' }
  ];

  const products = [
    {
      id: 1,
      title: 'Alfabetul în Joacă',
      ageRangeDisplay: '3-5 ani',
      subtitle: 'Pentru vârsta 3-5 ani',
      description: 'O călătorie distractivă prin lumea literelor, cu activități interactive și exerciții practice.',
      features: [
        'Exerciții de scriere și recunoaștere',
        'Jocuri cu litere și cuvinte',
        'Activități de colorat și desenat',
        'Peste 50 de pagini de activități'
      ],
      price: 39,
      image: '/products/alfabet.jpg',
      category: 'alfabet',
      stripeLink: 'https://buy.stripe.com/your-link-here'
    },
    {
      id: 2,
      title: 'Numere și Matematică',
      ageRangeDisplay: '4-6 ani',
      subtitle: 'Pentru vârsta 4-6 ani',
      description: 'Învață numerele și operațiile matematice de bază prin jocuri și exerciții practice.',
      features: [
        'Recunoașterea numerelor',
        'Adunare și scădere simplă',
        'Exerciții de logică',
        'Peste 50 de pagini de activități'
      ],
      price: 39,
      image: '/products/numere.jpg',
      category: 'numere',
      stripeLink: 'https://buy.stripe.com/your-link-here'
    },
    {
      id: 3,
      title: 'Forme și Culori',
      ageRangeDisplay: '3-7 ani',
      subtitle: 'Pentru vârsta 3-7 ani',
      description: 'Explorează lumea formelor și culorilor prin activități creative și exerciții practice.',
      features: [
        'Recunoașterea formelor geometrice',
        'Exerciții cu culori',
        'Activități creative',
        'Peste 50 de pagini de activități'
      ],
      price: 39,
      image: '/products/formesiculori.jpg',
      category: 'culori',
      stripeLink: 'https://buy.stripe.com/your-link-here'
    }
  ];

  const promoPackageBannerImage = '/products/promo-package-banner.jpg'; // Placeholder, user needs to provide this image

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Gradient Background */}
      <div className="relative bg-gradient-to-r from-[#20BF55] to-[#01BAEF] py-12 px-4 sm:px-6 lg:px-8">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-1/2 -left-20 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute -bottom-20 right-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
        </div>

        <div className="max-w-7xl mx-auto relative text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Cărți Educaționale pentru Copii
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Oferim o colecție de cărți interactive și distractive pentru dezvoltarea abilităților copiilor
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Caută cărți..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-white/10 backdrop-blur-sm text-gray-800 placeholder-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#20BF55]/20 border border-gray-200"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5" />
          </div>
          <div className="flex gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-xl transition-colors font-bold border border-gray-200 ${
                  selectedCategory === category.id
                    ? 'bg-[#20BF55] text-white'
                    : 'bg-white text-gray-800 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid (Individual Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <div className="relative w-full h-48">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#FF6B00] text-white px-3 py-1 rounded-full text-xs font-bold">
                  {product.ageRangeDisplay}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{product.title}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-[#20BF55] mr-2 flex-shrink-0 mt-1" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#20BF55]">{product.price} Lei</span>
                  <a
                    href={product.stripeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#FF6B00] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#FF6B00]/90 transition-colors"
                  >
                    Adaugă în coș
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Promo Package Section (Large Banner) */}
        <div className="relative bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Oferta Specială: Pachet Complet</h2>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 h-64 relative rounded-xl overflow-hidden">
              <img
                src={promoPackageBannerImage} // Use the banner image here
                alt="Pachet Complet - Oferta Specială"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-center bg-[#FF6B00] text-white px-4 py-2 rounded-full text-sm font-bold w-fit mx-auto mb-4">
                Cea mai bună ofertă
              </div>
              <h3 className="text-4xl font-bold text-[#FF6B00] text-center mb-4">
                89 Lei
                <span className="text-xl text-gray-400 line-through ml-2">117 Lei</span>
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Obține toate cele 3 cărți educaționale la un preț special. Perfect pentru dezvoltarea completă a copilului tău.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-[#20BF55] mr-2" />
                  <span className="text-gray-600">Toate cele 3 cărți educaționale</span>
                </li>
                <li className="flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-[#20BF55] mr-2" />
                  <span className="text-gray-600">Peste 150 de pagini de activități</span>
                </li>
                <li className="flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-[#20BF55] mr-2" />
                  <span className="text-gray-600">Jocuri și exerciții bonus</span>
                </li>
                <li className="flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-[#20BF55] mr-2" />
                  <span className="text-gray-600">Diplome personalizate</span>
                </li>
              </ul>
              <div className="text-center">
                <a
                  href="https://buy.stripe.com/your-link-here"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#FF6B00] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#FF6B00]/90 transition-colors"
                >
                  Cumpără Acum
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
      {/* Bottom CTA Section with Gradient Background */}
      <div className="relative bg-gradient-to-r from-[#20BF55] to-[#01BAEF] py-16 px-4 sm:px-6 lg:px-8 mt-12">
        {/* Decorative Elements - duplicated for this section if needed, or remove if already covered by main decorative elements */}
        {/* You might want to adjust these positions or remove if they overlap oddly */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 left-1/3 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute bottom-10 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
        </div>
        <div className="max-w-7xl mx-auto relative text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pregătit să oferi copilului tău o experiență educațională de neuitat?
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Investește în educația copilului tău cu cărțile noastre interactive în format PDF. Descarcă-le acum și bucură-te de ele oricând dorești!
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Cărți Individuale</h3>
              <p className="text-4xl font-bold text-[#20BF55] mb-4">39 <span className="text-xl">Lei/carte</span></p>
              <ul className="space-y-3 mb-6 text-left">
                <li className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-[#20BF55] mr-2" />
                  <span className="text-gray-600">O carte la alegere</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-[#20BF55] mr-2" />
                  <span className="text-gray-600">Peste 50 de pagini de activități</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-[#20BF55] mr-2" />
                  <span className="text-gray-600">Acces permanent la descărcări</span>
                </li>
              </ul>
              <a
                href="/catalog"
                className="inline-flex items-center gap-2 bg-[#FF6B00] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#FF6B00]/90 transition-colors"
              >
                Alege o carte
              </a>
            </div>

            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="absolute -top-4 right-1/2 translate-x-1/2 bg-[#FF6B00] text-white px-4 py-1 rounded-full text-sm font-bold">
                Cea mai bună ofertă
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 mt-6">Pachet Complet</h3>
              <p className="text-4xl font-bold text-[#FF6B00] mb-4">89 <span className="text-xl">Lei</span></p>
              <p className="text-lg text-gray-400 line-through mb-4">117 Lei</p>
              <ul className="space-y-3 mb-6 text-left">
                <li className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-[#20BF55] mr-2" />
                  <span className="text-gray-600">Toate cele 3 cărți</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-[#20BF55] mr-2" />
                  <span className="text-gray-600">Peste 150 de pagini de activități</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-[#20BF55] mr-2" />
                  <span className="text-gray-600">Acces permanent la descărcări</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-[#FF6B00] mr-2" />
                  <span className="text-gray-600 font-semibold">BONUS: Jocuri educative extra</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-[#FF6B00] mr-2" />
                  <span className="text-gray-600 font-semibold">BONUS: Diplome speciale</span>
                </li>
              </ul>
              <a
                href="https://buy.stripe.com/your-link-here"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#FF6B00] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#FF6B00]/90 transition-colors"
              >
                Cumpără pachetul complet
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center mt-8 text-white/80">
            <Lock className="w-4 h-4 mr-2" />
            <span className="text-sm">Plată securizată prin STRIPE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog; 