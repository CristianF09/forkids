import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import DownloadModal from '../components/DownloadModal';
import PurchaseSteps from '../components/PurchaseSteps';

const Home = () => {
  // const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

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
      {/* Hero Section - KidLearn Style */}
      <section className="bg-gradient-to-br from-[#25B838] via-[#FF6B00] to-[#FFD700] text-white py-20 md:py-32 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">


              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
                <span className="block">Învățarea devine o</span>
                <span className="block bg-gradient-to-r from-[#2C5F7A] to-[#0A4D68] bg-clip-text text-transparent">Aventură</span>
                <span className="block">alături de Corcodușa</span>
              </h1>

              <p className="text-xl sm:text-2xl md:text-3xl mb-8 max-w-2xl opacity-90 leading-relaxed">
                Alătură-te miilor de copii care explorează matematica, cititul și științele prin jocuri interactive distractive și activități captivante
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                {/* <button
                  onClick={() => setIsDownloadModalOpen(true)}
                  className="bg-gradient-to-r from-[#FF6B00] to-[#8B4513] text-white hover:from-[#E05C00] hover:to-[#6B3410] px-8 py-4 rounded-2xl text-xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 inline-flex items-center justify-center group border-4 border-white"
                >
                  🎃 Descarcă GRATUIT E-book-ul Halloween! 🎃
                </button> */}
                <button
                  onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-to-r from-[#0A4D68] to-[#2C5F7A] text-white hover:from-[#083756] hover:to-[#1e3a5f] px-8 py-4 rounded-2xl text-xl font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 border-4 border-white"
                >
                  Pentru Părinți
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="text-2xl">⭐</span>
                  <span className="font-semibold">5/5 Rating</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="text-2xl">📚</span>
                  <span className="font-semibold">150+ Activități</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="text-2xl">🎯</span>
                  <span className="font-semibold">100% Interactive</span>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src="/images/homepage.png"
                  alt="Copil învățând cu materiale Corcodusa"
                  className="w-full h-auto rounded-2xl"
                />

                {/* Speech Bubble */}
                <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-lg">
                  <p className="text-gray-800 font-semibold">Să învățăm împreună!</p>
                  <div className="absolute bottom-0 right-8 transform translate-y-full">
                    <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-[#2C5F7A] to-[#0A4D68] text-white rounded-2xl p-4 shadow-lg">
                  <div className="text-2xl mb-1">🦉</div>
                  <p className="text-sm font-semibold">Înțelept ca o bufniță!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impactful Carousel Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#2C5F7A]/90 to-[#0A4D68]/90 backdrop-blur-md rounded-3xl p-10 shadow-2xl border-4 border-white/20 mb-12">
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Descoperă Activitățile Noastre
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                Fiecare imagine reprezintă o aventură educațională unică care va captiva imaginația copilului tău
              </p>
            </div>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              spaceBetween={30}
              slidesPerView={1}
              centeredSlides={true}
              breakpoints={{
                640: { slidesPerView: 2, centeredSlides: false },
                768: { slidesPerView: 3, centeredSlides: false },
                1024: { slidesPerView: 4, centeredSlides: false },
              }}
              className="w-full"
            >
              {carouselImages.map((img, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 p-6 flex flex-col items-center border-4 border-gradient-to-r from-[#2C5F7A] to-[#0A4D68]">
                    <div className="relative w-full h-56 mb-6 bg-gradient-to-br from-[#2C5F7A]/10 to-[#0A4D68]/10 rounded-2xl flex items-center justify-center overflow-hidden border-2 border-white/50">
                      <img
                        src={`/images/carousel/${img}`}
                        alt={`Activitate ${index + 1}`}
                        className="max-w-full w-full h-full object-contain rounded-xl transition-all duration-500 hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                    </div>
                    <div className="text-center">
                      <span className="inline-block bg-gradient-to-r from-[#2C5F7A] to-[#0A4D68] text-white text-sm font-bold px-3 py-1 rounded-full">
                        Activitate {index + 1}
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Secondary CTA - Products */}
          <div className="text-center">
            {/* <Link
              to="/produse"
              className="inline-block bg-white text-[#FF6B00] hover:bg-gray-50 px-10 py-5 rounded-2xl text-xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 border-4 border-[#FF6B00]"
            >
              VEZI TOATE PRODUSELE
            </Link> */}
          </div>
        </div>
      </section>

      {/* What You'll Find Section - Commented Out */}
      {/* <section className="py-16 md:py-20 bg-gray-100">
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
      </section> */}

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

      {/* Purchase Steps Section */}
      <PurchaseSteps />

      {/* Pricing Section - High Impact Design */}
      <section id="products" className="bg-gradient-to-r from-[#25B838] to-[#FF6F00] text-white py-20 relative overflow-hidden">
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
              <span className="bg-gradient-to-r from-[#2C5F7A] to-[#0A4D68] bg-clip-text text-transparent font-bold">Descarcă-le acum în format PDF</span> și oferă-i copilului tău o experiență educațională care îl va face să iubească învățarea!
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
                      <span className="text-sm font-medium">Carte de Colorat - activități de colorat</span>
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

      {/* FAQ Section */}
      <section id="faq-section" className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
            Întrebări Frecvente
          </h2>
          <p className="text-lg text-gray-600 mb-12 text-center">
            Întrebări? Iată răspunsurile la cele mai comune întrebări despre Corcodușa.ro și fișele educative digitale.
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
      {/* <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      /> */}

    </div>
  );
};

export default Home;
