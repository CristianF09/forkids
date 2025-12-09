import { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import PurchaseSteps from '../components/PurchaseSteps';

const productsData = [
  {
    id: 2,
    category: 'alfabet',
    title: 'Alfabetul',
    pdfFile: 'Alfabetul.pdf',
    price: 59,
    image: '/images/Alfabetul .jpg',
    priceId: 'price_1SNBBrK6Qc2WK3kdE86Rm9w4',
    productId: 'prod_Sg7FSlYGXYLqIx',
    stripeLink: 'https://buy.stripe.com/3cIfZiaZ8aYjgNB39OeZ209',
    age: '3-7 ani',
    shortDescription: 'Învățarea literelor alfabetului prin activități captivante.',
    description: 'Descoperă literele alături de Corcodușa cea isteață!\n\nAceastă carte îi ajută pe cei mici să învețe alfabetul într-un mod distractiv și interactiv. Fiecare pagină este gândită să transforme învățarea literelor într-o adevărată aventură educativă.',
    features: [
      'Litere mari și mici de trasat pentru exersarea scrisului',
      'Cuvinte ilustrate pentru fiecare literă (A – Avion, B – Balon, etc.)',
      'Activități de identificare a literelor și jocuri de recunoaștere vizuală',
      'Spații pentru colorat, desen și completat',
      'Propoziții scurte care îmbină litera învățată cu vocabularul zilnic',
      'Dezvoltă coordonarea mână-ochi, recunoașterea literelor, motricitatea fină și interesul pentru citit',
      'O carte ideală pentru preșcolari și clasa pregătitoare!',
    ]
  },
  {
    id: 3,
    category: 'numere',
    title: 'Numere',
    pdfFile: 'Numere.pdf',
    price: 59,
    image: '/images/Numere.jpg',
    priceId: 'price_1SNC1IK6Qc2WK3kdB3AIEUYP',
    productId: 'prod_Sg7Fm0E2S5Hm1k',
    stripeLink: 'https://buy.stripe.com/fZu00k9V4eavapd8u8eZ20b',
    age: '3-7 ani',
    shortDescription: 'Dezvoltă abilități matematice prin jocuri interactive.',
    description: 'Joacă-te cu cifrele și învață să numeri cu zâmbetul pe buze!\n\nAceastă carte transformă exercițiile de numărare într-o experiență colorată și veselă.',
    features: [
      'Cifrele de la 1 la 10 de trasat și colorat',
      'Activități de recunoaștere a cantităților (numără obiectele și colorează-le)',
      'Exerciții simple de adunare și scădere ilustrate cu imagini amuzante',
      'Jocuri logice și puzzle-uri numerice pentru exersare',
      'Activități „Unește punctele" pentru învățarea ordinii numerelor',
      'Ajută copilul să înțeleagă conceptele de cantitate, numărare și ordine',
      'Perfectă pentru copiii între 3 și 6 ani care învață prin joc!',
    ]
  },
  {
    id: 4,
    category: 'forme-si-culori',
    title: 'Forme și Culori',
    pdfFile: 'FormeSiCulori.pdf',
    price: 59,
    image: '/images/Forme si culori.jpg',
    priceId: 'price_1SNC2uK6Qc2WK3kdxNwaWzy9',
    productId: 'prod_Sg7FLP5uIieb7r',
    stripeLink: 'https://buy.stripe.com/6oU7sMaZ84zVeFt6m0eZ20a',
    age: '3-7 ani',
    shortDescription: 'Descoperă lumea formelor și culorilor în mod creativ.',
    description: 'O lume plină de culori și forme te așteaptă!\n\nAlături de Corcodușa, copiii descoperă cercuri, pătrate, triunghiuri și culorile care dau viață imaginației lor.',
    features: [
      'Pagini dedicate formelor geometrice de bază (cerc, pătrat, triunghi, dreptunghi)',
      'Activități de asociere formă–obiect („Ce formă are roata?", „Ce culoare are soarele?")',
      'Exerciții de colorat și decupat pentru dezvoltarea motricității fine',
      'Jocuri de potrivire și labirinturi simple cu forme și culori',
      'Activități creative de desen și colorare liberă pentru exprimarea artistică',
      'Îmbunătățește recunoașterea vizuală, atenția la detalii și coordonarea',
      'Perfectă pentru grădiniță și primele clase, oferind un echilibru între distracție și învățare',
    ]
  },
  {
    id: 1,
    category: 'pachet-standard',
    title: 'Pachet Standard',
    pdfFile: 'BonusCertificateDeAbsovire.pdf',
    price: 145,
    originalPrice: 226,
    image: '/images/Pachet Standard.png',
    priceId: 'price_1SNBAgK6Qc2WK3kdgRGn5eW2',
    productId: 'prod_Sg7FB1xJVJc2MV',
    stripeLink: 'https://buy.stripe.com/bJe9AUc3c3vR2WLcKoeZ20c',
    age: '3-7 ani',
    shortDescription: 'Pachetul complet cu toate resursele educaționale.',
    description: 'Descoperă bucuria învățării prin joc cu Pachetul Standard Corcodușa, o colecție completă de materiale educative pentru copii între 3 și 7 ani!\n\nCreat cu grijă și pasiune, acest pachet conține activități ilustrate, exerciții interactive și jocuri care dezvoltă imaginația, logica și curiozitatea copiilor.',
    features: [
      '📖 Peste 150 de pagini de activități educative din cărțile:',
      '🅰️ Corcodușa învață Alfabetul',
      '🔢 Corcodușa învață Numerele',
      '🔺 Corcodușa învață Formele și Culorile',
      '✏️ Exerciții de trasare, recunoaștere, colorare și numărare',
      '🎨 Jocuri logice, labirinturi și activități creative care transformă învățarea în joacă',
      '🏅 Bonus exclusiv: Certificat de absolvire pentru fiecare carte completată',
      '🎁 Extra cadou: Carte de colorat Corcodușa – peste 50 de pagini gratuite de desen și relaxare!',
      'Stimulează imaginația, coordonarea și atenția copilului',
      'Dezvoltă abilitățile de scriere, citire și gândire logică',
      'Poate fi tipărit acasă sau folosit direct pe tabletă / laptop',
      'Ideal pentru: părinți, educatori și copii curioși care învață prin joacă',
      'Transformă timpul liber într-o aventură educativă plină de culoare, descoperiri și bucurie alături de Corcodușa!',
    ]
  },
  {
    id: 6,
    category: 'labirinturi-magice',
    title: 'Labirinturi Magice',
    pdfFile: 'Labirinturi Magice.pdf',
    price: 59,
    image: '/images/Labirinturi Magice.png',
    priceId: 'price_1SNCfLK6Qc2WK3kdVbZ9T85H',
    productId: 'prod_TJqMYITWTkXrqm',
    stripeLink: 'https://buy.stripe.com/4gM4gA4AKd6rdBpeSweZ205',
    age: '4-7 ani',
    shortDescription: 'Explorează labirinturi magice pentru dezvoltare cognitivă.',
    description: 'Pornește alături de Corcodușa într-o lume plină de mister și distracție! 🌟\n\n„Labirinturi Magice" este o carte de activități care provoacă imaginația și logica copiilor, oferind ore întregi de joacă educativă.',
    features: [
      'Labirinturi simple pentru începători și unele mai complexe pentru micii exploratori curajoși',
      'Activități cu cuburi, piramide și forme geometrice care stimulează gândirea spațială',
      'Labirinturi matematice care transformă exercițiile de numărare într-o aventură distractivă',
      'Spații de colorat și desenat, pentru a dezvolta creativitatea și coordonarea',
      'Ilustrații prietenoase, clare și ușor de urmărit',
      'Dezvoltă atenția, logica și răbdarea',
      'Îmbunătățește gândirea strategică și orientarea în spațiu',
      'Încurajează copilul să caute soluții și să gândească independent',
      'Ideală pentru copiii cu vârste între 3 și 8 ani, care adoră provocările și descoperirile!',
    ]
  },
  {
    id: 7,
    category: 'jocuri-si-activități-educative',
    title: 'Jocuri și Activități Educative',
    pdfFile: 'JocuriSiActivitatiEducative.pdf',
    price: 59,
    image: '/images/Jocuri si Activitati Distractive.png',
    priceId: 'price_1SNCYSK6Qc2WK3kd1YKIoyo9',
    productId: 'prod_TJqEqowI96zqa3',
    stripeLink: 'https://buy.stripe.com/9B69AU0ku5DZ2WL4dSeZ206',
    age: '3-7 ani',
    shortDescription: 'Colecție variată de jocuri și activități interactive.',
    description: 'Bine ai venit în lumea Corcodușei, unde fiecare pagină aduce o nouă provocare!\n\nAceastă carte combină învățarea cu distracția, transformând fiecare activitate într-o experiență veselă și plină de satisfacții.',
    features: [
      'Unește punctele și descoperă imagini-surpriză',
      'Trasează liniile punctate pentru a-ți antrena coordonarea și scrisul de mână',
      'Numără obiectele și învață cifrele într-un mod simplu și interactiv',
      'Găsește diferențele, puzzle-uri vizuale și exerciții logice care stimulează atenția și gândirea critică',
      'Activități de colorat și desenat, care eliberează creativitatea copilului',
      'Dezvoltă atenția, memoria și spiritul de observație',
      'Antrenează motricitatea fină și coordonarea mână-ochi',
      'Încurajează învățarea prin joc și descoperire activă',
      'Perfectă pentru copiii de 3–7 ani, această carte oferă o combinație echilibrată între distracție și educație!',
    ]
  },
  {
    id: 5,
    category: 'carte-de-colorat',
    title: 'Carte de Colorat',
    pdfFile: 'CarteDeColorat.pdf',
    price: 49,
    image: '/images/Carte de Colorat.png',
    priceId: 'price_1SNCDvK6Qc2WK3kdR7PskNbO',
    productId: 'prod_TJpts2v6oxXec2',
    stripeLink: 'https://buy.stripe.com/8x2cN6c3c8QbeFt9yceZ207',
    age: '3-7 ani',
    shortDescription: 'Carte completă de colorat cu activități interactive.',
    description: 'Culorile prind viață alături de Corcodușa!\n\nAceastă carte de colorat este un spațiu magic în care copiii pot explora, imagina și se pot exprima liber prin culoare.',
    features: [
      'Peste 50 de pagini cu desene mari, clare și prietenoase',
      'Tematici diverse: natură, animale, emoții, joacă și personaje simpatice',
      'Ilustrații gândite special pentru copiii de 3–7 ani, cu linii simple și spații generoase pentru colorat',
      'Pagini bonus cu activități creative (forme, trasează și colorează)',
      'Stimulează creativitatea, concentrarea și răbdarea',
      'Ajută la dezvoltarea motricității fine și a controlului creionului',
      'Oferă momente de relaxare și exprimare artistică',
      'Ideală pentru acasă, grădiniță sau activități în familie – un mod minunat de a petrece timp de calitate și de a cultiva dragostea pentru artă!',
    ]
  },
  {
    id: 8,
    category: 'pachet-promo',
    title: 'Pachet Promo',
    pdfFile: 'PachetPromo.pdf',
    price: 99,
    originalPrice: 120,
    image: '/images/Pachet Promo.png',
    priceId: 'price_1SNCw4K6Qc2WK3kdOLmO6qpp',
    productId: 'prod_TJqdmBiCDbNA9I',
    stripeLink: 'https://buy.stripe.com/aFa9AU3wG4zVgNB6m0eZ204',
    age: '3-7 ani',
    shortDescription: 'Pachet esențial pentru dezvoltare completă.',
    description: 'Descoperă Pachetul Promo Corcodușa, o combinație unică de distracție și învățare!\n\nAcest pachet reunește cele mai iubite două cărți de activități: Labirinturi Magice și Jocuri și Activități Educative, pentru o experiență completă de explorare și descoperire.',
    features: [
      'Două cărți pline de activități captivante pentru copii între 3–8 ani',
      'Labirinturi, jocuri logice, exerciții de trasare și activități de colorat',
      'Exerciții care dezvoltă atenția, creativitatea și gândirea logică',
      'Ilustrații prietenoase și pagini ușor de tipărit, perfecte pentru acasă sau la grădiniță',
      'Include certificat de absolvire pentru fiecare carte finalizată!',
      'Copiii învață fără efort, prin joacă și curiozitate',
      'Este un cadou educativ ideal pentru acasă, școală sau vacanță',
      'Stimulează implicarea părintelui în procesul de învățare',
      'Cu Pachetul Promo Corcodușa, fiecare pagină devine o nouă aventură! Învață, joacă-te și descoperă magia cunoașterii pas cu pas!',
    ],
  },
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
    const OFFSET = 80;
    if (location.hash === '#pachet-complet' || location.hash === '#pachete-educative') {
      window.setTimeout(() => {
        const special = document.getElementById('pachete-educative');
        if (special) {
          const top = special.getBoundingClientRect().top + window.pageYOffset - OFFSET;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 100);
    } else if (location.hash === '#products') {
      window.setTimeout(() => {
        const productsEl = document.getElementById('products');
        if (productsEl) {
          const top = productsEl.getBoundingClientRect().top + window.pageYOffset - OFFSET;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  const handleCategoryClick = (newCategory) => {
    setSelectedCategory(newCategory);
    if (newCategory === 'Toate produsele') {
      setFilteredProducts(productsData);
      navigate('/produse#products');
    } else {
      const filtered = productsData.filter(product => product.category === newCategory);
      setFilteredProducts(filtered);
      navigate(`/produse/${newCategory}#products`);
    }
  };

  const renderCategoryButton = (categoryId, text) => {
    return (
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
  };

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
              {renderCategoryButton('numere', 'Numere')}
              {renderCategoryButton('forme-si-culori', 'Forme și Culori')}
              {renderCategoryButton('labirinturi-magice', 'Labirinturi Magice')}
              {renderCategoryButton('jocuri-si-activități-educative', 'Jocuri și Activități Educative')}
              {renderCategoryButton('pachet-standard', 'Pachet Standard')}
              {renderCategoryButton('pachet-promo', 'Pachet Promo')}
            </div>
            {/* Second row */}
            <div className="flex flex-wrap gap-4 justify-center">
              {renderCategoryButton('labirinturi-magice', 'Labirinturi Magice')}
              {renderCategoryButton('jocuri-si-activități-educative', 'Jocuri și Activități Educative')}
              {renderCategoryButton('pachet-standard', 'Pachet Standard')}
              {renderCategoryButton('pachet-promo', 'Pachet Promo')}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-20" id="products">
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
                  <div className="mt-auto w-full">
                    <div className="flex justify-center mb-3">
                      <div className="flex flex-col text-center">
                        <span className="text-xl sm:text-2xl font-bold text-[#20BF55]">{product.price} Lei</span>
                        <span className="text-base sm:text-lg line-through text-gray-500">{product.originalPrice ? product.originalPrice + ' Lei' : ''}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => window.open(product.stripeLink, '_blank')}
                        className="w-full inline-flex items-center justify-center bg-[#FF6B00] text-white px-6 py-2 rounded-md hover:bg-[#E05C00] transition-colors shadow"
                        aria-label={`Cumpără ${product.title}`}
                      >
                        {product.originalPrice ? 'Cumpără pachetul' : 'Cumpără acum'}
                      </button>
                    </div>
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

                      <div className="mt-6 flex justify-center">
                        <div className="flex flex-col items-center gap-4">
                          <div className="flex flex-col items-center gap-2">
                            <span className="text-xl sm:text-2xl font-bold text-[#20BF55]">{product.price} Lei</span>
                            <span className="text-base sm:text-lg line-through text-gray-500">{product.originalPrice ? product.originalPrice + ' Lei' : ''}</span>
                          </div>
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
        <section id="pachete-educative" className="bg-gradient-to-r from-[#20BF55] to-[#FF6B00] text-white py-16 rounded-xl shadow-lg">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Oferte Speciale: Pachete Educative
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
              {/* Pachet Standard Card */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#25B838] via-[#FF6B00] to-[#FFD700] rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-3xl border-4 border-[#25B838]">
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-[#FF6B00] text-white text-sm font-bold px-4 py-1 rounded-full shadow-lg z-20 border-2 border-white">
                    Cel mai bine vândut
                  </div>

                  <div className="bg-gradient-to-r from-[#2C5F7A] to-[#0A4D68] p-8 text-white pt-16">
                    <div className="text-center">
                      <h3 className="text-3xl lg:text-4xl font-black tracking-tight">PACHET STANDARD</h3>
                    </div>
                  </div>

                  <div className="p-8">
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start text-gray-700">
                        <div className="bg-[#FF6B00] rounded-full p-1 mr-3 mt-0.5">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm font-medium">Alfabetul - activități de alfabetizare</span>
                      </li>
                      <li className="flex items-start text-gray-700">
                        <div className="bg-[#FF6B00] rounded-full p-1 mr-3 mt-0.5">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm font-medium">Numere - activități matematice</span>
                      </li>
                      <li className="flex items-start text-gray-700">
                        <div className="bg-[#FF6B00] rounded-full p-1 mr-3 mt-0.5">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm font-medium">Forme și Culori - activități artistice</span>
                      </li>
                      <li className="flex items-start text-gray-700">
                        <div className="bg-[#FF6B00] rounded-full p-1 mr-3 mt-0.5">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm font-medium">🎨 BONUS: Carte de Colorat completă</span>
                      </li>
                      <li className="flex items-start text-gray-700">
                        <div className="bg-[#FF6B00] rounded-full p-1 mr-3 mt-0.5">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm font-medium">🏆 BONUS: 3 diplome personalizate</span>
                      </li>
                    </ul>

                    <div className="text-center mb-6">
                      <div className="text-5xl lg:text-6xl font-black text-[#FF6B00] mb-2">
                        145 LEI
                      </div>
                      <div className="text-2xl line-through text-gray-400">226 Lei</div>
                    </div>

                    <button
                      onClick={() => window.open('https://buy.stripe.com/bJe9AUc3c3vR2WLcKoeZ20c', '_blank')}
                      className="w-full bg-[#FF6B00] text-white py-4 px-8 rounded-2xl text-xl font-bold hover:bg-[#E05C00] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 mb-6"
                    >
                      Cumpără pachetul
                    </button>

                    <div className="text-center">
                      <p className="text-gray-600 text-sm flex items-center justify-center">
                        <span className="mr-2">🔒</span>
                        Plată securizată prin
                        <img src="/images/iconstripe.png" alt="Stripe" className="ml-2 h-4" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pachet Promo Card */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#FF6B00] via-[#FFD700] to-[#25B838] rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
                  <div className="bg-gradient-to-r from-[#2C5F7A] to-[#0A4D68] p-8 text-white">
                    <div className="text-center">
                      <h3 className="text-3xl lg:text-4xl font-black tracking-tight">PACHET PROMO</h3>
                    </div>
                  </div>

                  <div className="p-8">
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start text-gray-700">
                        <div className="bg-[#FFD700] rounded-full p-1 mr-3 mt-0.5">
                          <Check className="w-3 h-3 text-gray-800" />
                        </div>
                        <span className="text-sm font-medium">Pagini de colorat selectate</span>
                      </li>
                      <li className="flex items-start text-gray-700">
                        <div className="bg-[#FFD700] rounded-full p-1 mr-3 mt-0.5">
                          <Check className="w-3 h-3 text-gray-800" />
                        </div>
                        <span className="text-sm font-medium">Labirinturi interactive</span>
                      </li>
                      <li className="flex items-start text-gray-700">
                        <div className="bg-[#FFD700] rounded-full p-1 mr-3 mt-0.5">
                          <Check className="w-3 h-3 text-gray-800" />
                        </div>
                        <span className="text-sm font-medium">Jocuri educative esențiale</span>
                      </li>
                      <li className="flex items-start text-gray-700">
                        <div className="bg-[#FFD700] rounded-full p-1 mr-3 mt-0.5">
                          <Check className="w-3 h-3 text-gray-800" />
                        </div>
                        <span className="text-sm font-medium">Activități de dezvoltare cognitivă</span>
                      </li>
                      <li className="flex items-start text-gray-700">
                        <div className="bg-[#FFD700] rounded-full p-1 mr-3 mt-0.5">
                          <Check className="w-3 h-3 text-gray-800" />
                        </div>
                        <span className="text-sm font-medium">🏆 BONUS: Diplomă personalizată</span>
                      </li>
                    </ul>

                    <div className="text-center mb-6">
                      <div className="text-5xl lg:text-6xl font-black text-[#FFD700] mb-2">99 LEI</div>
                      <div className="text-2xl line-through text-gray-400">120 Lei</div>
                    </div>

                    <button
                      onClick={() => window.open('https://buy.stripe.com/aFa9AU3wG4zVgNB6m0eZ204', '_blank')}
                      className="w-full bg-[#FFD700] text-gray-800 py-4 px-8 rounded-2xl text-xl font-bold hover:bg-[#E6C300] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 mb-6"
                    >
                      Cumpără pachetul
                    </button>

                    <div className="text-center">
                      <p className="text-gray-600 text-sm flex items-center justify-center">
                        <span className="mr-2">🔒</span>
                        Plată securizată prin
                        <img src="/images/iconstripe.png" alt="Stripe" className="ml-2 h-4" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Products;
