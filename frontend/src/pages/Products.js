import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Check, Download, Heart } from 'lucide-react';
import PurchaseSteps from '../components/PurchaseSteps';

const productsData = [
  {
    id: 1,
    category: 'Alfabet',
    title: 'Alfabetul în Joacă',
    age: '3-5 ani',
    description: 'Această carte educativă îi ajută pe cei mici să descopere literele alfabetului printr-o serie de activități captivante și jocuri distractive.',
    features: [
      'Învățarea literelor mari și mici de tipar',
      'Recunoașterea sunetelor și asocierea cu literele',
      'Exerciții de scris pentru dezvoltarea abilităților motorii fine',
      'Activități de colorat pentru fiecare literă',
      'Peste 50 de pagini de activități',
    ],
    price: 39,
    image: '/images/Alfabetul .jpg',
    priceId: 'price_1Rkl17K6Qc2WK3kdesB8V3Hm',
    productId: 'prod_Sg7FSlYGXYLqIx',
    stripeLink: 'https://buy.stripe.com/14AaEY8R02rNfJxh0EeZ202',
  },
  {
    id: 2,
    category: 'Matematică',
    title: 'Matematică Distractivă',
    age: '4-6 ani',
    description: 'Această carte ajută copiii să dezvolde abilități matematice de bază într-un mod distractiv și accesibil, prin jocuri și activități interactive.',
    features: [
      'Recunoașterea și scrierea numerelor de la 1 la 20',
      'Învățarea conceptelor de adunare și scădere',
      'Jocuri de numărare și asociere',
      'Activități de rezolvare a problemelor simple',
      'Peste 50 de pagini de activități',
    ],
    price: 39,
    image: '/images/Numere.jpg',
    priceId: 'price_1Rkl16K6Qc2WK3kdu5bsOWqZ',
    productId: 'prod_Sg7Fm0E2S5Hm1k',
    stripeLink: 'https://buy.stripe.com/fZu8wQ8R0c2n2WLh0EeZ201',
  },
  {
    id: 3,
    category: 'Forme și Culori',
    title: 'Aventuri în Culori',
    age: '3-7 ani',
    description: 'O colecție de planșe de colorat și activități creative care stimulează imaginația și dezvoltă abilitățile artistice ale copiilor.',
    features: [
      'Planșe de colorat tematice (animale, anotimpuri, povești)',
      'Activități de desen ghidate pas cu pas',
      'Jocuri de potrivire a culorilor',
      'Labirinturi și activități de coordonare',
      'Peste 50 de pagini de activități',
    ],
    price: 39,
    image: '/images/Forme si culori.jpg',
    priceId: 'price_1Rkl16K6Qc2WK3kdr90F7xZM',
    productId: 'prod_Sg7FLP5uIieb7r',
    stripeLink: 'https://buy.stripe.com/eVqdRaffo2rNfJxbGkeZ200',
  },
  {
    id: 4,
    category: 'Pachet Complet',
    title: 'Pachet Complet',
    age: '3-7 ani',
    description: 'Obține toate cele 3 cărți la un preț special, cu peste 150 de pagini de activități educative și distractive pentru copilul tău. Include 40 de pagini de colorat bonus!',
    features: [
      'Alfabetul în Joacă - activități de alfabetizare',
      'Matematică Distractivă - activități matematice',
      'Aventuri în Culori - activități artistice',
      'BONUS: 40 de pagini de colorat foarte interactive și distractive pentru copii',
      'BONUS: Diplome personalizate pentru fiecare secțiune completată (3 diplome)',
      'BONUS: Certificate de Absolvire',
    ],
    price: 89,
    image: '/images/Pachet Promo.jpg',
    priceId: 'price_1Rkl17K6Qc2WK3kdsulZ1UxS',
    productId: 'prod_Sg7FB1xJVJc2MV',
    stripeLink: 'https://buy.stripe.com/28E3cwc3ceav0OD5hWeZ203',
  },
];

const Products = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('Toate produsele');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category === 'alfabet') {
      setSelectedCategory('Alfabet');
    } else if (category === 'matematica') {
      setSelectedCategory('Matematică');
    } else if (category === 'formesiculori') {
      setSelectedCategory('Forme și Culori');
    } else {
      setSelectedCategory('Toate produsele');
    }
    // Scroll to special offer if hash is present
    if (location.hash === '#pachet-complet') {
      setTimeout(() => {
        const section = document.querySelector('section');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  const filteredProducts = selectedCategory === 'Toate produsele'
    ? productsData
    : productsData.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-100 py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 md:mb-6">
            Produsele Noastre
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Descoperă cărțile noastre educative care transformă învățarea în joacă și dezvoltă abilitățile copilului tău
          </p>
        </div>

        {/* Purchase Steps */}
        <PurchaseSteps />

        {/* Category Filter (Centered) */}
        <div className="mt-10 mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-row gap-4 md:gap-6 lg:gap-8 justify-center md:justify-center">
            <button
              onClick={() => setSelectedCategory('Toate produsele')}
              className={`col-span-2 px-8 py-3 rounded-full font-semibold transition-colors text-base md:text-lg lg:text-xl ${selectedCategory === 'Toate produsele' ? 'bg-[#FF6B00] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Toate produsele
            </button>
            <button
              onClick={() => setSelectedCategory('Alfabet')}
              className={`px-8 py-3 rounded-full font-semibold transition-colors text-base md:text-lg lg:text-xl ${selectedCategory === 'Alfabet' ? 'bg-[#FF6B00] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Alfabet
            </button>
            <button
              onClick={() => setSelectedCategory('Matematică')}
              className={`px-8 py-3 rounded-full font-semibold transition-colors text-base md:text-lg lg:text-xl ${selectedCategory === 'Matematică' ? 'bg-[#FF6B00] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Matematică
            </button>
            <button
              onClick={() => setSelectedCategory('Forme și Culori')}
              className={`px-8 py-3 rounded-full font-semibold transition-colors text-base md:text-lg lg:text-xl ${selectedCategory === 'Forme și Culori' ? 'bg-[#FF6B00] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Forme și Culori
            </button>
            <button
              onClick={() => setSelectedCategory('Pachet Complet')}
              className={`px-8 py-3 rounded-full font-semibold transition-colors text-base md:text-lg lg:text-xl ${selectedCategory === 'Pachet Complet' ? 'bg-[#FF6B00] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Pachet Complet
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
              <img
                src={product.image}
                alt={product.title}
                className="max-w-xs w-full h-56 object-contain rounded-md mb-4 bg-white mx-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/placeholder.jpg'; // Fallback image
                }}
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h3>
              <p className="text-sm text-gray-500 mb-3">({product.age})</p>
              <p className="text-gray-600 mb-4 text-center">{product.description}</p>
              <ul className="text-gray-700 text-sm mb-6 space-y-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="w-4 h-4 text-[#20BF55] mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-auto w-full flex justify-between items-center">
                <span className="text-2xl font-bold text-[#20BF55]">{product.price} Lei</span>
                <a
                  href={product.stripeLink && product.stripeLink !== 'https://buy.stripe.com/your-link-here' ? product.stripeLink : '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-[#FF6B00] text-white px-6 py-2 rounded-md hover:bg-[#E05C00] transition-colors shadow"
                  onClick={e => {
                    if (!product.stripeLink || product.stripeLink === 'https://buy.stripe.com/your-link-here') {
                      e.preventDefault();
                      alert('Linkul de plată nu este configurat încă. Vă rugăm să reveniți mai târziu.');
                    }
                  }}
                  aria-label={`Cumpără ${product.title}`}
                >
                  Cumpără
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Special Offer Section (Pachet Complet) */}
        <section className="bg-gradient-to-r from-[#20BF55] to-[#FF6B00] text-white py-16 rounded-xl shadow-lg">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Oferta Specială: Pachet Complet
            </h2>
            <div className="bg-white text-gray-800 rounded-xl shadow-xl p-8 relative border-4 border-[#FF6B00] transform transition-transform duration-300 hover:scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF6B00] text-white text-sm font-bold px-4 py-1 rounded-full shadow-md">
                Cea mai bună ofertă
              </div>
              <h3 className="text-2xl font-bold mb-4">Pachet Complet - Toate cărțile</h3>
              <p className="text-sm text-gray-500 mb-3">3-7 ani</p>
              <p className="text-gray-600 mb-4">
                Obține toate cele 3 cărți la un preț special, cu peste 150 de pagini de activități educative și distractive pentru copilul tău.
              </p>
              <ul className="space-y-3 text-left mb-8 inline-block">
                <li className="flex items-start text-gray-700"><Check className="w-5 h-5 text-[#20BF55] mr-2" /> Alfabetul în Joacă - activități de alfabetizare</li>
                <li className="flex items-start text-gray-700"><Check className="w-5 h-5 text-[#20BF55] mr-2" /> Matematică Distractivă - activități matematice</li>
                <li className="flex items-start text-gray-700"><Check className="w-5 h-5 text-[#20BF55] mr-2" /> Aventuri în Culori - activități artistice</li>
                <li className="flex items-start text-gray-700"><Check className="w-5 h-5 text-[#20BF55] mr-2" /> BONUS: 40 de pagini de colorat foarte interactive și distractive pentru copii</li>
                <li className="flex items-start text-gray-700"><Check className="w-5 h-5 text-[#20BF55] mr-2" /> BONUS: Diplome personalizate pentru fiecare secțiune completată (3 diplome)</li>
              </ul>
              <div className="flex justify-center items-center mb-6 space-x-4">
                <span className="text-5xl font-bold text-[#20BF55]">89 Lei</span>
                <span className="text-2xl line-through text-gray-500">117 Lei</span>
              </div>
              <a
                href="https://buy.stripe.com/28E3cwc3ceav0OD5hWeZ203"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#FF6B00] text-white py-3 rounded-md text-lg font-semibold hover:bg-[#E05C00] transition-colors shadow-lg inline-block mb-4"
              >
                Cumpără pachetul complet
              </a>
              <p className="text-gray-700 text-center text-sm flex items-center justify-center">
                Plată securizată prin
                <span className="ml-2" style={{ display: 'inline-flex', alignItems: 'center', height: '24px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 90 90"><g><circle cx="45" cy="45" r="45" fill="#635bff"/><path d="M75 45.417c0-4.267-2.067-7.633-6.017-7.633-3.967 0-6.367 3.367-6.367 7.6 0 5.017 2.833 7.55 6.9 7.55 1.983 0 3.483-.45 4.617-1.083v-3.333C73 49.083 71.7 49.433 70.05 49.433c-1.617 0-3.05-.567-3.233-2.533h8.15c0-.217.033-1.083.033-1.483zM66.767 43.833c0-1.883 1.15-2.667 2.2-2.667 1.017 0 2.1.783 2.1 2.667h-4.3z" fill="#f9f9f9"/><path d="M56.183 37.783c-1.633 0-2.683.767-3.267 1.3l-.217-1.033h-3.667v19.433l4.167-.833.017-4.717c.6.433 1.483 1.05 2.95 1.05 2.983 0 5.7-2.4 5.7-7.683 0-5.017-2.75-7.65-5.667-7.65zm-1 11.484c-.983 0-1.567-.35-1.967-.783l-.017-6.184c.433-.483 1.033-.817 1.983-.817 1.517 0 2.567 1.7 2.567 3.883 0 2.218-1.033 3.883-2.566 3.883z" fill="#f9f9f9"/><polygon points="43.3,36.8 47.48,35.9 47.48,32.52 43.3,33.4" fill="#f9f9f9"/><rect x="43.3" y="38.07" width="4.18" height="14.58" fill="#f9f9f9"/><path d="M38.817 39.3l-.267-1.233h-3.6V52.65h4.167v-9.883c.983-1.283 2.65-1.05 3.167-.867v-3.833c-1.534.1-3.484-.267-4.467 1.533z" fill="#f9f9f9"/><path d="M30.483 34.45l-4.067.867-.017 13.35c0 2.467 1.85 4.283 4.317 4.283 1.367 0 2.367-.25 2.917-.55v-3.383c-.534.866-3.167 1.633-3.167-.834v-5.917h3.167v-3.55h-3.167l-.001-4.566z" fill="#f9f9f9"/><path d="M19.217 42.3c0-.65.533-.9 1.417-.9 1.267 0 2.867.383 4.133 1.067V38.55c-1.383-.55-2.75-.767-4.133-.767-2.017 0-4.267 1.767-4.267 4.717 0 4.6 6.333 3.867 6.333 5.85 0 .767-.667 1.017-1.6 1.017-1.383 0-3.15-.567-4.55-1.333V52c1.55.667 3.117.95 4.55.95 3.467 0 5.85-1.717 5.85-4.7 0-4.967-6.35-4.083-6.35-5.95z" fill="#f9f9f9"/></g></svg>
                </span>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Products; 