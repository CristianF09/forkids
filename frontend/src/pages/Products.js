import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import PurchaseSteps from '../components/PurchaseSteps';

const productsData = [
  {
    id: 2,
    category: 'alfabet',
    title: 'ALFABETUL',
    pdfFile: 'Alfabetul .pdf',
    price: 49,
    image: '/images/Alfabetul .jpg',
    priceId: 'price_1RxRzjK6Qc2WK3kdz8eAiQjD',
    productId: 'prod_Sg7FSlYGXYLqIx',
    stripeLink: 'https://buy.stripe.com/14AaEY8R02rNfJxh0EeZ202',
    age: '3-7 ani',
    shortDescription: 'Învățarea literelor alfabetului prin activități captivante.',
    description: 'Această carte educativă îi ajută pe cei mici să descopere literele alfabetului printr-o serie de activități captivante și jocuri distractive. Peste 50 de pagini de activități.',
    features: [
      'Învățarea literelor mari și mici de tipar',
      'Recunoașterea formelor și asocierea cu litere',
      'Exerciții de scris pentru dezvoltarea abilităților motorii fine',
      'Activități de colorat pentru fiecare literă',
      'Peste 50 de pagini de activități'
    ]
  },
  {
    id: 3,
    category: 'matematica',
    title: 'NUMERE',
    pdfFile: 'Numere.pdf',
    price: 49,
    image: '/images/Numere.jpg',
    priceId: 'price_1RxS3KK6Qc2WK3kd97xe4ihN',
    productId: 'prod_Sg7Fm0E2S5Hm1k',
    stripeLink: 'https://buy.stripe.com/fZu8wQ8R0c2n2WLh0EeZ201',
    age: '3-7 ani',
    shortDescription: 'Dezvoltă abilități matematice prin jocuri interactive.',
    description: 'Cărțile de numere sunt un instrument excelent pentru dezvoltarea abilităților matematice și logice a copiilor. Peste 50 de pagini de activități.',
    features: [
      'Exerciții de numărare și recunoaștere a numerelor',
      'Activități de scriere a numerelor',
      'Exerciții de logică și problem-solving',
      'Peste 50 de pagini de activități'
    ]
  },
  {
    id: 4,
    category: 'forme-si-culori',
    title: 'FORME SI CULORI',
    pdfFile: 'FormeSiCulori.pdf',
    price: 49,
    image: '/images/Forme si culori.jpg',
    priceId: 'price_1RxS42K6Qc2WK3kdWE7DjklP',
    productId: 'prod_Sg7GhD6zkyA7lA',
    stripeLink: 'https://buy.stripe.com/00geVa4AKayf2WL7swiN201',
    age: '3-7 ani',
    shortDescription: 'Descoperă lumea formelor și culorilor în mod creativ.',
    description: 'Cunoașterea formelor și a culorilor este esențială în dezvoltarea cognitivă timpurie a copiilor. Peste 50 de pagini de activități.',
    features: [
      'Învățarea formelor geometrice de bază',
      'Recunoașterea și numirea culorilor',
      'Activități de colorat și sortare',
      'Exerciții de asociere și clasificare',
      'Peste 50 de pagini de activități'
    ]
  },
  {
    id: 5,
    category: 'colorat',
    title: 'PAGINI DE COLORAT',
    pdfFile: 'PaginiColorat.pdf',
    price: 39,
    image: '/images/Bonus - Fise de colorat.jpg',
    priceId: 'your_stripe_price_id',
    productId: 'your_stripe_product_id',
    stripeLink: 'your_stripe_link',
    age: '3-7 ani',
    shortDescription: 'Stimulează creativitatea prin pagini de colorat interactive.',
    description: 'Colecție bogată de pagini de colorat special create pentru dezvoltarea creativității și îmbunătățirea coordonării mână-ochi. Include imagini variate și atractive pentru copii.',
    features: [
      'Imagini variate și atractive',
      'Dezvoltă coordonarea mână-ochi',
      'Stimulează creativitatea',
      'Activități relaxante și educative',
      'Peste 40 de pagini de colorat'
    ]
  },
  {
    id: 6,
    category: 'labirinturi',
    title: 'LABIRINTURI MAGICE',
    pdfFile: 'LabirinturiMagice.pdf',
    price: 45,
    image: '/images/labirinturi.jpg',
    priceId: 'your_stripe_price_id',
    productId: 'your_stripe_product_id',
    stripeLink: 'your_stripe_link',
    age: '4-7 ani',
    shortDescription: 'Explorează labirinturi magice pentru dezvoltare cognitivă.',
    description: 'Jocuri creative cu labirinturi care dezvoltă gândirea logică, capacitatea de rezolvare a problemelor și coordonarea. Fiecare labirint oferă o nouă aventură de învățare.',
    features: [
      'Labirinturi cu dificultate progresivă',
      'Dezvoltă gândirea logică',
      'Îmbunătățește orientarea spațială',
      'Include elemente interactive',
      'Peste 30 de provocări diferite'
    ]
  },
  {
    id: 7,
    category: 'jocuri-educative',
    title: 'JOCURI ȘI ACTIVITĂȚI EDUCATIVE',
    pdfFile: 'JocuriEducative.pdf',
    price: 55,
    image: '/images/jocuri-educative.jpg',
    priceId: 'your_stripe_price_id',
    productId: 'your_stripe_product_id',
    stripeLink: 'your_stripe_link',
    age: '3-7 ani',
    shortDescription: 'Colecție variată de jocuri și activități interactive.',
    description: 'O colecție completă de jocuri și activități educative care acoperă multiple arii de dezvoltare. Include puzzle-uri, jocuri de memorie, activități de potrivire și multe altele.',
    features: [
      'Puzzle-uri educative',
      'Jocuri de memorie',
      'Activități de potrivire',
      'Exerciții de concentrare',
      'Peste 45 de activități diverse'
    ]
  },
  {
    id: 1,
    category: 'pachet-complet',
    title: 'PACHET COMPLET',
    pdfFile: 'BonusCertificateDeAbsovire.pdf',
    price: 110,
    originalPrice: 147,
    image: '/images/Pachet Promo.jpg',
    priceId: 'price_1RxRyVK6Qc2WK3kdnE1H9PkY',
    productId: 'prod_Sg7FB1xJVJc2MV',
    stripeLink: 'https://buy.stripe.com/28E3cwc3ceav0OD5hWeZ203',
    age: '3-7 ani',
    shortDescription: 'Pachetul complet cu toate resursele educaționale.',
    description: 'Obține toate cele 3 cărți la un preț special, cu peste 150 de pagini de activități educative și distractive pentru copilul tău.',
    features: [
      'Alfabetul în Joacă - activități de alfabetizare',
      'Matematică Distractivă - activități matematice',
      'Aventuri în Culori - activități artistice',
      'BONUS: 40 de pagini de colorat foarte interactive și distractive pentru copii',
      'BONUS: Diplome personalizate pentru fiecare secțiune completată (3 diplome)'
    ]
  },
  {
    id: 8,
    category: 'pachet-standard',
    title: 'PACHET STANDARD',
    pdfFile: 'PachetStandard.pdf',
    price: 89,
    originalPrice: 120,
    image: '/images/pachet-standard.jpg',
    priceId: 'your_stripe_price_id',
    productId: 'your_stripe_product_id',
    stripeLink: 'your_stripe_link',
    age: '3-7 ani',
    shortDescription: 'Pachet esențial pentru dezvoltare completă.',
    description: 'Pachetul Standard include o selecție atent aleasă de activități educative care acoperă principalele arii de dezvoltare ale copilului tău.',
    features: [
      'Pagini de colorat selectate',
      'Labirinturi interactive',
      'Jocuri educative esențiale',
      'Activități de dezvoltare cognitivă',
      'BONUS: Diplomă de participare personalizată'
    ]
  }
];

const Products = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [selectedCategory, setSelectedCategory] = useState(category || 'Toate produsele');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  useEffect(() => {
    if (category) {
      const filtered = productsData.filter(product => product.category === category);
      setFilteredProducts(filtered);
      
      if (filtered.length === 0) {
        navigate('/produse');
      }
    } else {
      setFilteredProducts(productsData);
    }
  }, [category, navigate]);

  useEffect(() => {
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

  const handleCategoryClick = (newCategory) => {
    setSelectedCategory(newCategory);
    if (newCategory === 'Toate produsele') {
      setFilteredProducts(productsData);
      navigate('/produse');
    } else {
      const filtered = productsData.filter(product => product.category === newCategory);
      setFilteredProducts(filtered);
      navigate(`/produse/${newCategory}`);
    }
  };

  const renderCategoryButton = (categoryId, text) => (
    <button
      onClick={() => handleCategoryClick(categoryId)}
      className={`px-6 py-2 rounded-full font-semibold transition-colors text-sm md:text-base ${
        selectedCategory === categoryId 
        ? 'bg-[#FF6B00] text-white' 
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {text}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 md:mb-6">
            Produsele Noastre
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Descoperă cărțile noastre educative care transformă învățarea în joacă și dezvoltă abilitățile copilului tău
          </p>
        </div>

        <PurchaseSteps />

        <div className="mt-10 mb-12">
          <div className="flex flex-col gap-4">
            {/* First row */}
            <div className="flex flex-wrap gap-4 justify-center">
              {renderCategoryButton('Toate produsele', 'Toate Produsele')}
              {renderCategoryButton('alfabet', 'Alfabetul')}
              {renderCategoryButton('matematica', 'Matematică')}
              {renderCategoryButton('forme-si-culori', 'Forme și Culori')}
              {renderCategoryButton('colorat', 'Pagini de Colorat')}
            </div>
            {/* Second row */}
            <div className="flex flex-wrap gap-4 justify-center">
              {renderCategoryButton('labirinturi', 'Labirinturi Magice')}
              {renderCategoryButton('jocuri-educative', 'Jocuri Educative')}
              {renderCategoryButton('pachet-standard', 'Pachet Standard')}
              {renderCategoryButton('pachet-complet', 'Pachet Complet')}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-20">
          {selectedCategory === 'Toate produsele' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white p-4 sm:p-6 rounded-xl shadow-lg flex flex-col items-center">
                  <div 
                    className="w-full cursor-pointer transition-transform duration-300 hover:scale-105"
                    onClick={() => navigate(`/produs/${product.category}`)}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full aspect-square object-contain rounded-md mb-4 bg-white mx-auto"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/Icon.png';
                      }}
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 text-center">{product.title}</h3>
                  <p className="text-gray-600 mb-4 text-center text-sm">{product.shortDescription}</p>
                  <ul className="text-gray-700 text-sm mb-6 space-y-2 w-full">
                    {product.features.slice(0, 2).map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="w-4 h-4 text-[#20BF55] mr-2 flex-shrink-0" />
                        <span className="flex-1">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto w-full flex flex-col sm:flex-row justify-between items-center gap-4">
                    {product.originalPrice ? (
                      <div className="flex flex-col text-center sm:text-left">
                        <span className="text-xl sm:text-2xl font-bold text-[#20BF55]">{product.price} Lei</span>
                        <span className="text-base sm:text-lg line-through text-gray-500">{product.originalPrice} Lei</span>
                      </div>
                    ) : (
                      <span className="text-xl sm:text-2xl font-bold text-[#20BF55]">{product.price} Lei</span>
                    )}
                    <button
                      onClick={() => window.open(product.stripeLink, '_blank')}
                      className="w-full sm:w-auto inline-flex items-center justify-center bg-[#FF6B00] text-white px-6 py-2 rounded-md hover:bg-[#E05C00] transition-colors shadow"
                      aria-label={`Cumpără ${product.title}`}
                    >
                      Cumpără
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Left side - Image */}
                    <div className="md:w-1/3 flex flex-col items-center">
                      <div 
                        className="w-full max-w-sm cursor-pointer transition-transform duration-300 hover:scale-105"
                        onClick={() => navigate(`/produs/${product.category}`)}
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full aspect-square object-contain rounded-md bg-white"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/images/Icon.png';
                          }}
                        />
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 text-center mt-4">{product.title}</h3>
                      </div>
                    </div>

                    {/* Right side - Details */}
                    <div className="md:w-2/3 flex flex-col">
                      <div className="flex-grow">
                        <p className="text-gray-700 mb-4">{product.description}</p>
                        <p className="text-sm text-gray-500 mb-4">Vârstă recomandată: {product.age}</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                          {product.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start">
                              <Check className="w-4 h-4 text-[#20BF55] mr-2 flex-shrink-0 mt-1" />
                              <span className="text-sm text-gray-600 flex-1">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 flex flex-col sm:flex-row justify-between sm:justify-end items-center gap-4">
                        <div className="flex items-center gap-4">
                          {product.originalPrice ? (
                            <div className="flex flex-col sm:flex-row items-center gap-2">
                              <span className="text-xl sm:text-2xl font-bold text-[#20BF55]">{product.price} Lei</span>
                              <span className="text-base sm:text-lg line-through text-gray-500">{product.originalPrice} Lei</span>
                            </div>
                          ) : (
                            <span className="text-xl sm:text-2xl font-bold text-[#20BF55]">{product.price} Lei</span>
                          )}
                          <button
                            onClick={() => window.open(product.stripeLink, '_blank')}
                            className="w-full sm:w-auto inline-flex items-center justify-center bg-[#FF6B00] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-md hover:bg-[#E05C00] transition-colors shadow text-base sm:text-lg font-semibold"
                            aria-label={`Cumpără ${product.title}`}
                          >
                            Cumpără acum
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Special Offer Section */}
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
                <span className="text-5xl font-bold text-[#20BF55]">110 Lei</span>
                <span className="text-2xl line-through text-gray-500">147 Lei</span>
              </div>
              <button
                onClick={() => {
                  window.open('https://buy.stripe.com/28E3cwc3ceav0OD5hWeZ203', '_blank');
                }}
                className="w-full bg-[#FF6B00] text-white py-3 rounded-md text-lg font-semibold hover:bg-[#E05C00] transition-colors shadow-lg inline-block mb-4"
              >
                Cumpără pachetul complet
              </button>
              <p className="text-gray-700 text-center text-sm flex items-center justify-center">
                Plată securizată prin
                <span className="ml-2" style={{ display: 'inline-flex', alignItems: 'center', height: '24px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 90 90">
                    <g>
                      <circle cx="45" cy="45" r="45" fill="#635bff"/>
                      <path d="M75 45.417c0-4.267-2.067-7.633-6.017-7.633-3.967 0-6.367 3.367-6.367 7.6 0 5.017 2.833 7.55 6.9 7.55 1.983 0 3.483-.45 4.617-1.083v-3.333C73 49.083 71.7 49.433 70.05 49.433c-1.617 0-3.05-.567-3.233-2.533h8.15c0-.217.033-1.083.033-1.483zM66.767 43.833c0-1.883 1.15-2.667 2.2-2.667 1.017 0 2.1.783 2.1 2.667h-4.3z" fill="#f9f9f9"/>
                      <path d="M56.183 37.783c-1.633 0-2.683.767-3.267 1.3l-.217-1.033h-3.667v19.433l4.167-.833.017-4.717c.6.433 1.483 1.05 2.95 1.05 2.983 0 5.7-2.4 5.7-7.683 0-5.017-2.75-7.65-5.667-7.65zm-1 11.484c-.983 0-1.567-.35-1.967-.783l-.017-6.184c.433-.483 1.033-.817 1.983-.817 1.517 0 2.567 1.7 2.567 3.883 0 2.218-1.033 3.883-2.566 3.883z" fill="#f9f9f9"/>
                      <polygon points="43.3,36.8 47.48,35.9 47.48,32.52 43.3,33.4" fill="#f9f9f9"/>
                      <rect x="43.3" y="38.07" width="4.18" height="14.58" fill="#f9f9f9"/>
                      <path d="M38.817 39.3l-.267-1.233h-3.6V52.65h4.167v-9.883c.983-1.283 2.65-1.05 3.167-.867v-3.833c-1.534.1-3.484-.267-4.467 1.533z" fill="#f9f9f9"/>
                      <path d="M30.483 34.45l-4.067.867-.017 13.35c0 2.467 1.85 4.283 4.317 4.283 1.367 0 2.367-.25 2.917-.55v-3.383c-.534.866-3.167 1.633-3.167-.834v-5.917h3.167v-3.55h-3.167l-.001-4.566z" fill="#f9f9f9"/>
                      <path d="M19.217 42.3c0-.65.533-.9 1.417-.9 1.267 0 2.867.383 4.133 1.067V38.55c-1.383-.55-2.75-.767-4.133-.767-2.017 0-4.267 1.767-4.267 4.717 0 4.6 6.333 3.867 6.333 5.85 0 .767-.667 1.017-1.6 1.017-1.383 0-3.15-.567-4.55-1.333V52c1.55.667 3.117.95 4.55.95 3.467 0 5.85-1.717 5.85-4.7 0-4.967-6.35-4.083-6.35-5.95z" fill="#f9f9f9"/>
                    </g>
                  </svg>
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