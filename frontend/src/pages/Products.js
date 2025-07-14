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
    image: '/images/Alfabetul .png',
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
    image: '/images/Numere.png',
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
    image: '/images/Forme si culori.png',
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
    image: '/images/Pachet Promo.png',
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

        {/* Category Filter (Basic implementation, can be enhanced) */}
        <div className="flex justify-center space-x-4 mb-12">
          <button
            onClick={() => setSelectedCategory('Toate produsele')}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${selectedCategory === 'Toate produse' ? 'bg-[#FF6B00] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Toate produsele
          </button>
          <button
            onClick={() => setSelectedCategory('Alfabet')}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${selectedCategory === 'Alfabet' ? 'bg-[#FF6B00] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Alfabet
          </button>
          <button
            onClick={() => setSelectedCategory('Matematică')}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${selectedCategory === 'Matematică' ? 'bg-[#FF6B00] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Matematică
          </button>
          <button
            onClick={() => setSelectedCategory('Forme și Culori')}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${selectedCategory === 'Forme și Culori' ? 'bg-[#FF6B00] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Forme și Culori
          </button>
          <button
            onClick={() => setSelectedCategory('Pachet Complet')}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${selectedCategory === 'Pachet Complet' ? 'bg-[#FF6B00] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Pachet Complet
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col">
              <img
                src={product.image}
                alt={product.title}
                className="max-w-xs w-full h-56 object-contain rounded-md bg-white mx-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/placeholder.jpg'; // Fallback image
                }}
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h3>
                <p className="text-sm text-gray-500 mb-3">({product.age})</p>
                <p className="text-gray-600 mb-4 flex-grow">{product.description}</p>
                <ul className="text-gray-700 text-sm mb-6 space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-4 h-4 text-[#20BF55] mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex justify-between items-center">
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
              <Link
                to="/checkout"
                className="w-full bg-[#FF6B00] text-white py-3 rounded-md text-lg font-semibold hover:bg-[#E05C00] transition-colors shadow-lg inline-block mb-4"
              >
                Cumpără pachetul complet
              </Link>
              <p className="text-gray-700 text-center text-sm flex items-center justify-center">
                Plată securizată prin
                <i className="fab fa-cc-stripe text-gray-700 text-xl ml-2"></i>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Products; 