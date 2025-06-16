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

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#20BF55] to-[#01BAEF] py-12 px-4 sm:px-6 lg:px-8">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 -left-20 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute -bottom-20 right-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Cărți Educaționale pentru Copii
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Oferim o colecție de cărți interactive și distractive pentru dezvoltarea abilităților copiilor
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Caută cărți..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
          </div>
          <div className="flex gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-xl transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-white text-[#20BF55] font-bold'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Promo Package Card */}
        <div className="mb-12 relative">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <Gift className="w-6 h-6 text-[#FF6B00]" />
                  <span className="text-[#FF6B00] font-bold">OFERTĂ SPECIALĂ</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Pachet Complet - Toate Cărțile</h2>
                <p className="text-white/90 mb-6">
                  Obține toate cele 3 cărți educaționale la un preț special. Perfect pentru dezvoltarea completă a copilului tău.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#20BF55]" />
                    <span className="text-white">3 cărți educaționale complete</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#20BF55]" />
                    <span className="text-white">Peste 150 de pagini de activități</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#20BF55]" />
                    <span className="text-white">Jocuri și exerciții bonus</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#20BF55]" />
                    <span className="text-white">Diplome personalizate</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-3xl font-bold text-white">89 Lei</div>
                  <div className="text-lg text-white/60 line-through">117 Lei</div>
                  <div className="bg-[#FF6B00] text-white px-3 py-1 rounded-full text-sm font-bold">
                    -24%
                  </div>
                </div>
                <a
                  href="https://buy.stripe.com/your-link-here"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#FF6B00] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#FF6B00]/90 transition-colors"
                >
                  Cumpără Pachetul Complet
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
              <div className="relative w-full md:w-96 h-64 bg-gradient-to-br from-[#20BF55]/20 to-[#01BAEF]/20 rounded-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-16 h-16 text-white/40" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-colors group"
            >
              <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-[#20BF55]/20 to-[#01BAEF]/20">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{product.title}</h3>
              <p className="text-white/80 mb-4">{product.subtitle}</p>
              <p className="text-white/70 mb-4">{product.description}</p>
              <div className="space-y-2 mb-6">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#20BF55]" />
                    <span className="text-white/90">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-white">{product.price} Lei</div>
                <a
                  href={product.stripeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#FF6B00] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#FF6B00]/90 transition-colors"
                >
                  CUMPARĂ
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog; 