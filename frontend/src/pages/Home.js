import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Smile, Check, Download, Star, BookOpen, HelpCircle } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import DownloadModal from '../components/DownloadModal';

const Home = () => {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);

  const testimonials = [
    {
      id: 1,
      text: "Fetița mea de 4 ani adoră activitățile din Alfabetul în Joacă. A învățat literele într-un mod distractiv!",
      author: "Andreea M.",
      role: "mamă a unui copil de 4 ani",
      rating: 5
    },
    {
      id: 2,
      text: "Ca educatoare, recomand cu drag aceste materiale. Sunt bine structurate și foarte atractive pentru copii.",
      author: "Mihaela D.",
      role: "educatoare",
      rating: 5
    },
    {
      id: 3,
      text: "Băiețelul meu de 6 ani era foarte agitat. Activitățile l-au captivat și a devenit mai atent. Recomand!",
      author: "Cristian P.",
      role: "tată a unui copil de 6 ani",
      rating: 5
    },
  ];

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Cine a realizat fișele educative de la Corcodușa.ro?",
      answer: "Fișele educative de la Corcodușa.ro sunt create de o echipă de specialiști în educație timpurie, ilustratori și părinți dedicați, care colaborează pentru a oferi materiale de înaltă calitate, adaptate vârstei și nevoilor copiilor."
    },
    {
      question: "Cum aleg fișele potrivite pentru vârsta copilului meu?",
      answer: "Fiecare carte digitală are menționată vârsta recomandată (ex: 3–5 ani, 4–6 ani, 3–7 ani). Alege în funcție de vârsta copilului și de abilitățile pe care vrei să le dezvolte: scris, logică, atenție, coordonare, recunoașterea formelor și culorilor."
    },
    {
      question: "Cum primesc fișele după achiziție?",
      answer: "După finalizarea plății, veți primi automat un email cu link-urile de descărcare pentru toate fișierele digitale achiziționate. Accesul este instant și permanent, iar fișierele pot fi descărcate oricând doriți."
    },
    {
      question: "Cât timp am acces la fișele cumpărate?",
      answer: "Accesul este nelimitat în timp. Odată descărcate, fișierele rămân în posesia dvs. și pot fi folosite oricând, fără termen de expirare."
    },
    {
      question: "Pot returna produsele digitale?",
      answer: "Conform legislației pentru produsele digitale, nu se pot face retururi odată ce fișierele au fost descărcate. Vă recomandăm să citiți cu atenție descrierea produselor înainte de achiziție."
    },
    {
      question: "Ce fac dacă întâmpin probleme tehnice?",
      answer: "Dacă aveți dificultăți la descărcare sau nu ați primit emailul de confirmare, ne puteți contacta la contact@corcodusa.ro sau prin formularul de contact de pe site. Echipa noastră vă va răspunde rapid pentru a remedia problema."
    },
    {
      question: "Este sigură plata pe Corcodușa.ro?",
      answer: "Da. Plățile sunt procesate prin Stripe, unul dintre cei mai siguri procesatori de plăți online din lume. Tranzacțiile sunt criptate și protejate, iar datele cardului dvs. nu sunt stocate pe site-ul nostru."
    },
    {
      question: "Pot folosi fișele în scopuri educaționale (ex: la grădiniță sau acasă)?",
      answer: "Da! Fișele sunt destinate uzului personal și educativ, acasă sau în mediul didactic (grădinițe, activități cu copii). Este interzisă doar revânzarea sau redistribuirea fișelor în scopuri comerciale."
    },
    {
      question: "Pot oferi fișele educative cadou?",
      answer: "Momentan nu există o opțiune automată de „trimitere cadou\", însă puteți achiziționa produsele și apoi oferi fișierele persoanei dragi."
    },
    {
      question: "Cine se află în spatele Corcodușa.ro?",
      answer: "Corcodușa.ro este un proiect educațional independent, realizat cu pasiune de o echipă de părinți, educatori și artiști care cred că învățarea trebuie să fie o joacă. Scopul nostru este să oferim materiale accesibile, frumoase și utile, care îi ajută pe cei mici să descopere lumea cu bucurie."
    }
  ];

  // Carousel images
  const carouselImages = [
    'AL1.png', 'AL2.png', 'AL3.png', 'AL4.png', 'AL5.png', 'AL6.png', 'AL7.png',
    'FC1.png', 'FC2.png', 'FC3.png', 'FC4.png', 'FC5.png', 'FC6.png', 'FC7.png', 'FC8.png',
    'NR1.png', 'NR2.png', 'NR3.png', 'NR4.png', 'NR5.png', 'NR6.png', 'NR7.png', 'NR8.png',
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Comprehensive Hero Section with Carousel */}
      <section className="bg-gradient-to-r from-[#25B838] to-[#FF6F00] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header Content */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Învățare distractivă pentru copii 3-7 ani
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90 leading-relaxed">
              <span className="bg-gradient-to-r from-[#2C5F7A] to-[#0A4D68] bg-clip-text text-transparent font-semibold">Descoperă</span> cărțile noastre interactive în <span className="bg-gradient-to-r from-[#2C5F7A] to-[#0A4D68] bg-clip-text text-transparent font-semibold">format PDF</span> care transformă <span className="bg-gradient-to-r from-[#2C5F7A] to-[#0A4D68] bg-clip-text text-transparent font-semibold">educația în joacă</span> și dezvoltă abilitățile <span className="bg-gradient-to-r from-[#2C5F7A] to-[#0A4D68] bg-clip-text text-transparent font-semibold">copilului tău</span> într-un mod creativ și captivant!
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              <div className="flex flex-col items-center bg-gradient-to-r from-[#2C5F7A] to-[#0A4D68] rounded-2xl p-6 text-white">
                <Zap className="w-10 h-10 text-white mb-3" />
                <h3 className="text-lg font-semibold mb-2">Dezvoltă gândirea</h3>
                <p className="text-sm opacity-90">Activități care stimulează gândirea critică și abilitățile cognitive.</p>
              </div>
              <div className="flex flex-col items-center bg-gradient-to-r from-[#2C5F7A] to-[#0A4D68] rounded-2xl p-6 text-white">
                <Smile className="w-10 h-10 text-white mb-3" />
                <h3 className="text-lg font-semibold mb-2">Încurajează creativitatea</h3>
                <p className="text-sm opacity-90">Desene și activități creative pentru imaginație și expresivitate.</p>
              </div>
              <div className="flex flex-col items-center bg-gradient-to-r from-[#2C5F7A] to-[#0A4D68] rounded-2xl p-6 text-white">
                <BookOpen className="w-10 h-10 text-white mb-3" />
                <h3 className="text-lg font-semibold mb-2">Învață prin joacă</h3>
                <p className="text-sm opacity-90">Educație distractivă pentru că copiii învață cel mai bine jucându-se.</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={() => setIsDownloadModalOpen(true)}
                className="bg-white text-[#FF6B00] hover:bg-gray-50 px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-300 shadow-xl transform hover:scale-105 inline-flex items-center group"
              >
                🎃 Descarcă GRATUIT E-book-ul 🎃
                <Download className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link
                to="/produse"
                className="bg-[#FF6B00] text-white hover:bg-[#E05C00] px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl inline-flex items-center group"
              >
                Vezi produsele
                <span className="ml-3 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>

          {/* Carousel Section */}
          <div className="bg-gradient-to-r from-[#2C5F7A]/80 to-[#0A4D68]/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
              Activități și materiale interactive
            </h2>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              className="w-full"
            >
              {carouselImages.map((img, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 p-4 flex flex-col items-center">
                    <div className="relative w-full h-48 mb-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                      <img
                        src={`/images/carousel/${img}`}
                        alt={`Activitate ${index + 1}`}
                        className="max-w-full w-full h-full object-contain rounded-xl transition-opacity duration-300"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* What You'll Find Section */}
      <section className="py-16 md:py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
            Ce vei găsi în cărțile noastre?
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            Iată câteva exemple din activitățile incluse în pachetele noastre educative
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
              <div className="w-full h-56 mb-4 bg-gray-100 rounded-md flex items-center justify-center">
                <img
                  src='/images/Alfabetul .jpg'
                  alt="Alfabetul Ilustrat"
                  className="max-w-xs w-full h-full object-contain rounded-md"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Alfabetul Ilustrat</h3>
              <p className="text-gray-600 text-center">Învățarea alfabetului în scriere de tipar și de mână.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
              <div className="w-full h-56 mb-4 bg-gray-100 rounded-md flex items-center justify-center">
                <img
                  src="/images/Numere.jpg"
                  alt="Învățarea Numerelor"
                  className="max-w-xs w-full h-full object-contain rounded-md"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Învățarea Numerelor</h3>
              <p className="text-gray-600 text-center">Exerciții interactive pentru recunoașterea și scrierea numerelor.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
              <div className="w-full h-56 mb-4 bg-gray-100 rounded-md flex items-center justify-center">
                <img
                  src="/images/Forme si culori.jpg"
                  alt="Activități de Coordonare"
                  className="max-w-xs w-full h-full object-contain rounded-md"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Activități de Coordonare</h3>
              <p className="text-gray-600 text-center">Dezvoltarea atenției și coordonării mână-ochi.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
              <div className="w-full h-56 mb-4 bg-gray-100 rounded-md flex items-center justify-center">
                <img
                  src="/images/Bonus - Fise de colorat.jpg"
                  alt="Planșe de Colorat"
                  className="max-w-xs w-full h-full object-contain rounded-md"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Planșe de Colorat</h3>
              <p className="text-gray-600 text-center">Zeci de planșe haioase ce așteaptă să fie colorate.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">Ce spun părinții despre noi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#20BF55] to-[#FF6B00] rounded-full flex items-center justify-center text-white font-bold mr-3">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - High Impact Design */}
      <section className="bg-gradient-to-r from-[#25B838] to-[#FF6F00] text-white py-20 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-[#25B838]/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#FF6B00]/20 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-[#25B838]/10 to-[#FF6B00]/10 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-white">
              Pachete Educative
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-[#2C5F7A] to-[#0A4D68] mx-auto mb-8 rounded-full"></div>
            <p className="text-xl md:text-2xl lg:text-3xl mb-8 max-w-5xl mx-auto font-light leading-relaxed text-white">
              Pregătit să oferi copilului tău o experiență educațională de neuitat?<br />
              <span className="font-semibold bg-gradient-to-r from-[#2C5F7A] to-[#0A4D68] bg-clip-text text-transparent">Fișele educative Corcodușa</span> dezvoltă logica, atenția și creativitatea copiilor.<br />
              <span className="bg-gradient-to-r from-[#2C5F7A] to-[#0A4D68] bg-clip-text text-transparent font-bold">📥 Descarcă-le acum în format PDF</span> și oferă-i copilului tău o experiență educațională care îl va face să iubească învățarea!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-stretch">
            {/* Carte Individuală Card - High Impact */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700] via-[#25B838] to-[#FF6B00] rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
                <div className="bg-gradient-to-r from-[#2C5F7A] to-[#0A4D68] p-8 text-white">
                  <div className="text-center">
                    <h3 className="text-3xl lg:text-4xl font-black tracking-tight">CARTE INDIVIDUALĂ</h3>
                  </div>
                </div>

                <div className="p-8">
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start text-gray-700">
                      <div className="bg-[#25B838] rounded-full p-1 mr-3 mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm font-medium">O carte la alegere din colecția noastră</span>
                    </li>
                    <li className="flex items-start text-gray-700">
                      <div className="bg-[#25B838] rounded-full p-1 mr-3 mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm font-medium">Peste 50 de pagini de activități</span>
                    </li>
                    <li className="flex items-start text-gray-700">
                      <div className="bg-[#25B838] rounded-full p-1 mr-3 mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm font-medium">Acces permanent la descărcări</span>
                    </li>
                    <li className="flex items-start text-gray-700">
                      <div className="bg-[#25B838] rounded-full p-1 mr-3 mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm font-medium">Activități adaptate vârstei</span>
                    </li>
                  </ul>

                  <div className="text-center mb-6">
                    <div className="text-5xl lg:text-6xl font-black text-[#25B838] mb-2">59 LEI</div>
                  </div>

                  <Link
                    to="/produse"
                    className="w-full bg-[#25B838] text-white py-4 px-8 rounded-2xl text-xl font-bold hover:bg-[#1e6b2e] transition-all duration-300 shadow-xl hover:shadow-2xl inline-block text-center transform hover:scale-105 mb-6"
                  >
                    Alege cartea
                  </Link>

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

            {/* Pachet Standard Card - High Impact */}
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
                      <span className="text-sm font-medium">Alfabetul în Joacă - activități de alfabetizare</span>
                    </li>
                    <li className="flex items-start text-gray-700">
                      <div className="bg-[#FF6B00] rounded-full p-1 mr-3 mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm font-medium">Matematică Distractivă - activități matematice</span>
                    </li>
                    <li className="flex items-start text-gray-700">
                      <div className="bg-[#FF6B00] rounded-full p-1 mr-3 mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm font-medium">Aventuri în Culori - activități artistice</span>
                    </li>
                    <li className="flex items-start text-gray-700">
                      <div className="bg-[#FF6B00] rounded-full p-1 mr-3 mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm font-medium">🎨 BONUS: 40 de pagini de colorat interactive</span>
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
                    <div className="text-2xl line-through text-gray-400">177 Lei</div>
                  </div>

                  <button
                    onClick={() => window.open('https://buy.stripe.com/28E3cwc3ceav0OD5hWeZ203', '_blank')}
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

            {/* Pachet Promo Card - High Impact */}
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
                    onClick={() => window.open('https://buy.stripe.com/your_promo_stripe_link', '_blank')}
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

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
            📘 Întrebări Frecvente
          </h2>
          <p className="text-lg text-gray-600 mb-12 text-center">
            Ai întrebări? Iată răspunsurile la cele mai comune întrebări despre Corcodușa.ro și fișele educative digitale.
          </p>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:bg-gray-50"
                >
                  <h3 className="text-lg font-semibold text-gray-800 flex-1">
                    {faq.question}
                  </h3>
                  <svg
                    className={`w-5 h-5 text-[#25B838] transform transition-transform duration-200 ml-4 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 border-t border-gray-100">
                    <p className="text-gray-600 pt-4 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Modal */}
      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />

    </div>
  );
};

export default Home;
