import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const productsData = [
      {
        id: 2,
        category: 'alfabet',
        title: 'Alfabetul',
        pdfFile: 'Alfabetul.pdf',
        price: 59,
        image: '/images/Alfabetul.png',
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
          'O carte ideală pentru preșcolari și clasa pregătitoare!'
        ]
      },
      {
        id: 3,
        category: 'numere',
        title: 'Numere',
        pdfFile: 'Numere.pdf',
        price: 59,
        image: '/images/Numere.png',
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
          'Perfectă pentru copiii între 3 și 6 ani care învață prin joc!'
        ]
      },
      {
        id: 4,
        category: 'forme-si-culori',
        title: 'Forme și Culori',
        pdfFile: 'FormeSiCulori.pdf',
        price: 59,
        image: '/images/Forme si culori.png',
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
          'Perfectă pentru grădiniță și primele clase, oferind un echilibru între distracție și învățare'
        ]
      },
      {
        id: 1,
        category: 'pachet-standard',
        title: 'Pachet Standard',
        pdfFile: 'BonusCertificatDeAbsolvire-PachetStandard.pdf',
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
          'Transformă timpul liber într-o aventură educativă plină de culoare, descoperiri și bucurie alături de Corcodușa!'
        ]
      },
      {
        id: 6,
        category: 'labirinturi-magice',
        title: 'Labirinturi Magice',
        pdfFile: 'LabirinturiMagice.pdf',
        price: 59,
        image: '/images/Labirinturi Magice.png',
        priceId: 'price_1SNCfLK6Qc2WK3kdVbZ9T85H',
        productId: 'prod_TJqMYITWTkXrqm',
        stripeLink: 'https://buy.stripe.com/4gM4gA4AKd6rdBpeSweZ205',
        age: '3-8 ani',
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
          'Ideală pentru copiii cu vârste între 3 și 8 ani, care adoră provocările și descoperirile!'
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
          'Perfectă pentru copiii de 3–7 ani, această carte oferă o combinație echilibrată între distracție și educație!'
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
          'Ideală pentru acasă, grădiniță sau activități în familie – un mod minunat de a petrece timp de calitate și de a cultiva dragostea pentru artă!'
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
          'Cu Pachetul Promo Corcodușa, fiecare pagină devine o nouă aventură! Învață, joacă-te și descoperă magia cunoașterii pas cu pas!'
        ]
      }
    ];

    const foundProduct = productsData.find(p => p.category === productId);

    if (foundProduct) {
      setProduct(foundProduct);
      const OFFSET = 80;
      window.setTimeout(() => {
        const container = document.getElementById('product-detail');
        const top = container ? (container.getBoundingClientRect().top + window.pageYOffset - OFFSET) : 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }, 100);
    } else {
      navigate('/produse');
    }
  }, [productId, navigate]);

  if (!product) return null;

  return (
    <div id="product-detail" className="min-h-screen bg-gray-100 py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="flex justify-center items-start">
              <div className="relative w-full max-w-md">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-auto rounded-lg shadow-md"
                  style={{ maxHeight: '800px', objectFit: 'contain' }}
                  loading="eager"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/Icon.png';
                  }}
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {product.title}
              </h1>
              <p className="text-lg text-gray-600 mb-2">({product.age})</p>
              <p className="text-xl text-gray-700 mb-6">{product.description}</p>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Ce vei găsi în acest produs:</h2>
                <ul className="space-y-3">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-5 h-5 text-[#20BF55] mr-3 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex flex-col">
                    {product.originalPrice ? (
                      <>
                        <span className="text-3xl font-bold text-[#20BF55]">{product.price} Lei</span>
                        <span className="text-xl line-through text-gray-500">{product.originalPrice} Lei</span>
                      </>
                    ) : (
                      <span className="text-3xl font-bold text-[#20BF55]">{product.price} Lei</span>
                    )}
                  </div>
                  <button
                    onClick={() => window.open(product.stripeLink, '_blank')}
                    className="inline-flex items-center bg-[#FF6B00] text-white px-8 py-3 rounded-md hover:bg-[#E05C00] transition-colors shadow-md text-lg font-semibold"
                  >
                    Cumpără acum
                  </button>
                </div>

                <p className="text-gray-600 text-sm text-center flex items-center justify-center">
                  <span className="mr-2">🔒</span>
                  Plata securizata prin
                  <img src="/images/iconstripe.png" alt="Stripe" className="ml-2 h-4" />
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/produse')}
            className="inline-flex items-center text-gray-600 hover:text-[#FF6B00] transition-colors"
          >
            ← Înapoi la toate produsele
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
