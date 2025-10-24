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
    price: 59,
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
    price: 59,
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
    price: 59,
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
    id: 1,
    category: 'pachet-complet',
    title: 'PACHET STANDARD',
    pdfFile: 'BonusCertificateDeAbsovire.pdf',
    price: 145,
    originalPrice: 226,
    image: '/images/Pachet Standard.png',
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
    id: 6,
    category: 'labirinturi',
    title: 'LABIRINTURI MAGICE',
    pdfFile: 'LabirinturiMagice.pdf',
    price: 59,
    image: '/images/Labirinturi Magice.png',
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
    price: 59,
    image: '/images/Jocuri si Activitati Distractive.png',
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
    id: 5,
    category: 'colorat',
    title: 'CARTE DE COLORAT',
    pdfFile: 'CarteDeColorat.pdf',
    price: 49,
    image: '/images/Carte de Colorat.png',
    priceId: 'your_stripe_price_id',
    productId: 'your_stripe_product_id',
    stripeLink: 'your_stripe_link',
    age: '3-7 ani',
    shortDescription: 'Carte completă de colorat cu activități interactive.',
    description: 'Carte completă de colorat cu activități interactive special create pentru dezvoltarea creativității și îmbunătățirea coordonării mână-ochi. Include imagini variate și atractive pentru copii.',
    features: [
      'Carte completă de colorat',
      'Activități interactive',
      'Dezvoltă coordonarea mână-ochi',
      'Stimulează creativitatea',
      'Activități relaxante și educative'
    ]
  },
  {
    id: 8,
    category: 'pachet-standard',
    title: 'PACHET PROMO',
    pdfFile: 'PachetStandard.pdf',
    price: 99,
    originalPrice: 120,
    image: '/images/Pachet Promo.png',
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
              {renderCategoryButton('pachet-standard', 'Pachet Promo')}
              {renderCategoryButton('pachet-complet', 'Pachet Standard')}
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
                    className="w-full cursor-pointer transition-transform duration-300 hover:scale-105 relative"
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
                    {(product.id === 5 || product.id === 6 || product.id === 7 || product.id === 8) && (
                      <img
                        src="/images/new-icon.svg"
                        alt="NEW"
                        className="absolute top-1 left-1 right-1 h-20 object-contain drop-shadow-lg"
                      />
                    )}
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
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Oferte Speciale: Pachete Educative
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              {/* Pachet Standard Card */}
              <div className="bg-white text-gray-800 rounded-xl shadow-xl p-8 relative border-4 border-[#FF6B00] transform transition-transform duration-300 hover:scale-105">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF6B00] text-white text-sm font-bold px-4 py-1 rounded-full shadow-md">
                  Cea mai bună ofertă
                </div>
                <h3 className="text-2xl font-bold mb-4">Pachet Standard</h3>
                <p className="text-sm text-gray-500 mb-3">3-7 ani</p>
                <p className="text-gray-600 mb-4">
                  Obține toate cele 3 cărți la un preț special, cu peste 150 de pagini de activități educative și distractive pentru copilul tău.
                </p>
                <ul className="space-y-3 text-left mb-8">
                  <li className="flex items-start text-gray-700"><Check className="w-5 h-5 text-[#20BF55] mr-2" /> Alfabetul în Joacă - activități de alfabetizare</li>
                  <li className="flex items-start text-gray-700"><Check className="w-5 h-5 text-[#20BF55] mr-2" /> Matematică Distractivă - activități matematice</li>
                  <li className="flex items-start text-gray-700"><Check className="w-5 h-5 text-[#20BF55] mr-2" /> Aventuri în Culori - activități artistice</li>
                  <li className="flex items-start text-gray-700"><Check className="w-5 h-5 text-[#20BF55] mr-2" /> BONUS: 40 de pagini de colorat foarte interactive și distractive pentru copii</li>
                  <li className="flex items-start text-gray-700"><Check className="w-5 h-5 text-[#20BF55] mr-2" /> BONUS: Diplome personalizate pentru fiecare secțiune completată (3 diplome)</li>
                </ul>
                <div className="flex justify-center items-center mb-6 space-x-4">
                  <span className="text-5xl font-bold text-[#20BF55]">145 Lei</span>
                  <span className="text-2xl line-through text-gray-500">177 Lei</span>
                </div>
                <button
                  onClick={() => {
                    window.open('https://buy.stripe.com/28E3cwc3ceav0OD5hWeZ203', '_blank');
                  }}
                  className="w-full bg-[#FF6B00] text-white py-3 rounded-md text-lg font-semibold hover:bg-[#E05C00] transition-colors shadow-lg inline-block mb-4"
                >
                  Cumpără pachetul standard
                </button>
                <p className="text-gray-700 text-center text-sm flex items-center justify-center">
                  Plată securizată prin
                  <img src="/images/iconstripe.png" alt="Stripe" className="ml-2" />
                </p>
              </div>

              {/* Pachet Promo Card */}
              <div className="bg-orange-100 text-gray-800 rounded-xl shadow-xl p-8 relative transform transition-transform duration-300 hover:scale-105">
                <h3 className="text-2xl font-bold mb-4">Pachet Promo</h3>
                <p className="text-sm text-gray-500 mb-3">3-7 ani</p>
                <p className="text-gray-600 mb-4">
                  Pachet esențial cu selecție atent aleasă de activități educative care acoperă principalele arii de dezvoltare.
                </p>
                <ul className="space-y-3 text-left mb-8">
                  <li className="flex items-start text-gray-700"><Check className="w-5 h-5 text-[#20BF55] mr-2" /> Pagini de colorat selectate</li>
                  <li className="flex items-start text-gray-700"><Check className="w-5 h-5 text-[#20BF55] mr-2" /> Labirinturi interactive</li>
                  <li className="flex items-start text-gray-700"><Check className="w-5 h-5 text-[#20BF55] mr-2" /> Jocuri educative esențiale</li>
                  <li className="flex items-start text-gray-700"><Check className="w-5 h-5 text-[#20BF55] mr-2" /> Activități de dezvoltare cognitivă</li>
                  <li className="flex items-start text-gray-700"><Check className="w-5 h-5 text-[#20BF55] mr-2" /> BONUS: Diplomă de participare personalizată</li>
                </ul>
                <div className="flex justify-center items-center mb-6 space-x-4">
                  <span className="text-5xl font-bold text-[#20BF55]">99 Lei</span>
                  <span className="text-2xl line-through text-gray-500">120 Lei</span>
                </div>
                <button
                  onClick={() => {
                    window.open('https://buy.stripe.com/your_promo_stripe_link', '_blank');
                  }}
                  className="w-full bg-[#FF6B00] text-white py-3 rounded-md text-lg font-semibold hover:bg-[#E05C00] transition-colors shadow-lg inline-block mb-4"
                >
                  Cumpără pachetul promo
                </button>
                <p className="text-gray-700 text-center text-sm flex items-center justify-center">
                  Plată securizată prin
                  <img src="/images/iconstripe.png" alt="Stripe" className="ml-2" />
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Products;
