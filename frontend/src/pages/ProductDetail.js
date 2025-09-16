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
        title: 'ALFABETUL',
        pdfFile: 'Alfabetul .pdf',
        price: 49,
        image: '/images/Alfabetul .jpg',
        priceId: 'price_1RxRzjK6Qc2WK3kdz8eAiQjD',
        productId: 'prod_Sg7FSlYGXYLqIx',
        stripeLink: 'https://buy.stripe.com/14AaEY8R02rNfJxh0EeZ202',
        age: '3-7 ani',
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
        description: 'Cunoașterea formelor și a culorilor este esențială în dezvoltarea cognitivă timpurie a copiilor. Peste 50 de pagini de activități.',
        features: [
          'Învățarea formelor geometrice de bază',
          'Recunoașterea și numirea culorilor',
          'Activități de colorat și sortare',
          'Exerciții de asociere și clasificare',
          'Peste 50 de pagini de activități'
        ]
      }
    ];

    const foundProduct = productsData.find(p => p.category === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      window.scrollTo(0, 0);
    } else {
      navigate('/produse');
    }
  }, [productId, navigate]);

  if (!product) return null;

  return (
    <div className="min-h-screen bg-gray-100 py-12 md:py-16 lg:py-20">
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
                  <span className="text-3xl font-bold text-[#20BF55]">{product.price} Lei</span>
                  <button
                    onClick={() => window.open(product.stripeLink, '_blank')}
                    className="inline-flex items-center bg-[#FF6B00] text-white px-8 py-3 rounded-md hover:bg-[#E05C00] transition-colors shadow-md text-lg font-semibold"
                  >
                    Cumpără acum
                  </button>
                </div>

                <p className="text-gray-600 text-sm text-center flex items-center justify-center">
                  Plată securizată prin
                  <span className="ml-2" style={{ display: 'inline-flex', alignItems: 'center', height: '24px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 90 90">
                      <g>
                        <circle cx="45" cy="45" r="45" fill="#635bff"/>
                        <path d="M75 45.417c0-4.267-2.067-7.633-6.017-7.633-3.967 0-6.367 3.367-6.367 7.6 0 5.017 2.833 7.55 6.9 7.55 1.983 0 3.483-.45 4.617-1.083v-3.333C73 49.083 71.7 49.433 70.05 49.433c-1.617 0-3.05-.567-3.233-2.533h8.15c0-.217.033-1.083.033-1.483z" fill="#f9f9f9"/>
                        <path d="M56.183 37.783c-1.633 0-2.683.767-3.267 1.3l-.217-1.033h-3.667v19.433l4.167-.833.017-4.717c.6.433 1.483 1.05 2.95 1.05 2.983 0 5.7-2.4 5.7-7.683 0-5.017-2.75-7.65-5.667-7.65zm-1 11.484c-.983 0-1.567-.35-1.967-.783l-.017-6.184c.433-.483 1.033-.817 1.983-.817 1.517 0 2.567 1.7 2.567 3.883 0 2.218-1.033 3.883-2.566 3.883z" fill="#f9f9f9"/>
                      </g>
                    </svg>
                  </span>
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