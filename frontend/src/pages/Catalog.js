import React, { useState } from 'react';
import { Search, ShoppingCart, CheckCircle2, ArrowRight, Gift } from 'lucide-react';


const products = [
  {
    id: 'prod_Sg7FB1xJVJc2MV',
    title: 'Pachet Complet',
    ageRangeDisplay: '3-7 ani',
    description: 'Obține toate cele 3 cărți la un preț special, cu peste 150 de pagini de activități educative și distractive.',
    price: 89,
    image: '/images/Pachet Promo.jpg',
    category: 'all',
    stripeLink: 'https://buy.stripe.com/28E3cwc3ceav0OD5hWeZ203',
    priceId: 'price_1Rkl17K6Qc2WK3kdsulZ1UxS',
    imageBgColor: 'bg-gradient-to-r from-[#20BF55] to-[#01BAEF]'
  },
  {
    id: 'prod_Sg7FSlYGXYLqIx',
    title: 'Alfabetul în Joacă',
    ageRangeDisplay: '3-5 ani',
    description: 'Învață literele și scrisul de mână prin activități captivante și jocuri interactive.',
    price: 39,
    image: '/images/Alfabetul .jpg',
    category: 'alfabet',
    stripeLink: 'https://buy.stripe.com/14AaEY8R02rNfJxh0EeZ202',
    priceId: 'price_1Rkl17K6Qc2WK3kdesB8V3Hm',
    imageBgColor: 'bg-[#2680EB]'
  },
  {
    id: 'prod_Sg7Fm0E2S5Hm1k',
    title: 'Matematică Distractivă',
    ageRangeDisplay: '4-6 ani',
    description: 'Descoperă cifrele, număratul și operații matematice simple prin jocuri și activități interactive.',
    price: 39,
    image: '/images/Numere.jpg',
    category: 'numere',
    stripeLink: 'https://buy.stripe.com/fZu8wQ8R0c2n2WLh0EeZ201',
    priceId: 'price_1Rkl16K6Qc2WK3kdu5bsOWqZ',
    imageBgColor: 'bg-[#20BF55]'
  },
  {
    id: 'prod_Sg7FLP5uIieb7r',
    title: 'Aventuri în Culori',
    ageRangeDisplay: '3-7 ani',
    description: 'Planșe de colorat, activități de desen și jocuri care dezvoltă creativitatea și motricitatea fină.',
    price: 39,
    image: '/images/Forme si culori.jpg',
    category: 'culori',
    stripeLink: 'https://buy.stripe.com/eVqdRaffo2rNfJxbGkeZ200',
    priceId: 'price_1Rkl16K6Qc2WK3kdr90F7xZM',
    imageBgColor: 'bg-[#FFD100]'
  }
];

const promoPackageBannerImage = '/images/Pachet Promo.jpg'; // Updated to use correct image
const promoPackagePdf = '/pdfs/pachet-complet.pdf'; // Path for the promo package PDF

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Toate produsele' },
    { id: 'alfabet', name: 'Alfabetizare' },
    { id: 'numere', name: 'Matematică' },
    { id: 'culori', name: 'Creativitate' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    console.log(`Product: ${product.title}, Category: ${product.category}, Selected: ${selectedCategory}, Matches: ${matchesCategory}`);
    return matchesSearch && matchesCategory;
  });

  const handlePromoDownload = () => {
    const link = document.createElement('a');
    link.href = promoPackagePdf;
    link.download = 'PachetComplet-Corcodusa.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-100"> {/* Changed main background to light gray */}
      {/* Top Header Section with original gradient */}
      <div className="relative bg-gradient-to-r from-[#20BF55] to-[#01BAEF] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Cărți Educaționale pentru Copii
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Descoperă colecția noastră de cărți interactive și distractive pentru dezvoltarea abilităților copiilor
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
              className="w-full px-4 py-3 pl-12 bg-white border border-gray-300 text-gray-800 placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#20BF55]"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-xl transition-colors font-semibold text-sm
                  ${
                  selectedCategory === category.id
                    ? 'bg-[#20BF55] text-white'
                    : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid (Individual Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 flex flex-col h-full"
            >
              <div className={`relative w-full h-40 xs:h-48 sm:h-56 flex items-center justify-center ${product.imageBgColor}`}> {/* Dynamic background color, responsive heights */}
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-w-full w-full h-full object-contain rounded-md bg-white mx-auto"
                />
                <div className="absolute top-3 left-3 bg-white text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                  {product.ageRangeDisplay}
                </div>
              </div>
              <div className="p-4 sm:p-6 flex flex-col flex-grow">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{product.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl sm:text-2xl font-bold text-[#20BF55]">{product.price} Lei</span>
                  <button
                    onClick={() => {
                      window.open(product.stripeLink, '_blank');
                    }}
                    className="inline-flex items-center gap-2 bg-[#FF6B00] text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-bold hover:bg-[#FF6B00]/90 transition-colors text-sm sm:text-base"
                    aria-label={`Cumpără ${product.title}`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Cumpără
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Promo Package Section (Large Banner) */}
        <div className="promo-package relative bg-[#E0FFE0] rounded-2xl p-4 sm:p-8 shadow-lg mt-8"> {/* Responsive padding, margin-top for spacing */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Ofertă Specială: Pachet Complet</h2>
          </div>
          <div className="product-card flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="w-full md:w-1/2 h-40 xs:h-56 sm:h-64 relative rounded-xl overflow-hidden mb-4 md:mb-0">
              <img
                src={promoPackageBannerImage}
                alt="Pachet complet"
                className="max-w-full w-full h-full object-contain rounded-md bg-white mx-auto"
              />
            </div>
            <div className="product-info flex-1 bg-white p-4 sm:p-6 rounded-xl shadow-md relative"> {/* Responsive padding */}
              <span className="age-range absolute top-3 left-1/2 -translate-x-1/2 bg-[#FF6B00] text-white px-3 py-1 rounded-full text-xs font-bold w-fit">
                3-7 ani
              </span>
              <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mt-8 mb-2">Pachet Complet – Toate cărțile</h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-4">
                Obține toate cele 3 cărți la un preț special, cu peste 150 de pagini de activități educative și distractive.
              </p>
              <div className="price flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6 justify-center">
                  <span className="promo text-2xl sm:text-3xl font-bold text-[#FF6B00]">89 Lei</span>
                  <span className="original text-base sm:text-lg text-gray-400 line-through">117 Lei</span>
              </div>
              <div className="text-center">
                <button
                  onClick={() => {
                    window.open('https://buy.stripe.com/28E3cwc3ceav0OD5hWeZ203', '_blank');
                  }}
                  className="buy-button inline-flex items-center gap-2 bg-[#FF6B00] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-bold hover:bg-[#FF6B00]/90 transition-colors text-sm sm:text-base"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Cumpără
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
      {/* Bottom CTA Section with Gradient Background */}
      <div className="relative bg-gradient-to-r from-[#20BF55] to-[#01BAEF] py-16 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto relative text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pregătit să oferi copilului tău o experiență educațională de neuitat?
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Investește în educația copilului tău cu cărțile noastre interactive în format PDF. Descarcă-le acum și bucură-te de ele oricând dorești!
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
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
              <button
                onClick={() => window.location.href = '/produse'}
                className="inline-flex items-center gap-2 bg-[#FF6B00] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#FF6B00]/90 transition-colors"
              >
                Alege o carte
              </button>
            </div>

            <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF6B00] text-white px-4 py-1 rounded-full text-sm font-bold">
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
              <button
                onClick={() => {
                  window.open('https://buy.stripe.com/28E3cwc3ceav0OD5hWeZ203', '_blank');
                }}
                className="inline-flex items-center gap-2 bg-[#FF6B00] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#FF6B00]/90 transition-colors"
              >
                Cumpără pachetul complet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog; 