import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Zap, Smile, Check, User, DollarSign, Download, CreditCard, HelpCircle, Star, BookOpen } from 'lucide-react';

const Home = () => {
  const testimonials = [
    {
      id: 1,
      text: "Fetița mea de 4 ani adoră activitățile din Alfabetul în Joacă. A învățat literele într-un mod distractiv și acum recunoaște aproape toate literele!",
      author: "Andreea M.",
      role: "mamă a unui copil de 4 ani",
      rating: 5
    },
    {
      id: 2,
      text: "Ca educatoare, recomand cu drag aceste materiale. Sunt bine structurate, adaptate vârstei și foarte atractive pentru copii. Folosim Matematica Distractivă în activitățile de la grădiniță.",
      author: "Mihaela D.",
      role: "educatoare",
      rating: 5
    },
    {
      id: 3,
      text: "Băiețelul meu de 6 ani era foarte agitat și greu de concentrat. Activitățile din pachetul complet l-au captivat și a început să fie mai atent și răbdător. Recomand!",
      author: "Cristian P.",
      role: "tată a unui copil de 6 ani",
      rating: 5
    },
  ];

  const faqs = [
    {
      question: "Cine a realizat fișele educative de la corcodusa.ro?",
      answer: "Fișele educative de la corcodusa.ro sunt create de o echipă de specialiști în educație timpurie, ilustratori și părinți dedicați, asigurând materiale de înaltă calitate și adaptate nevoilor copiilor."
    },
    {
      question: "Cum aleg fișele potrivite pentru vârsta copilului meu?",
      answer: "Fiecare carte digitală are specificată vârsta recomandată (ex: 3-5 ani, 4-6 ani, 3-7 ani). Puteți alege în funcție de vârsta copilului și de domeniile pe care doriți să le dezvoltați (alfabetizare, matematică, creativitate)."
    },
    {
      question: "Cum primesc fișele după achiziție?",
      answer: "Imediat după finalizarea plății, veți primi un email cu link-urile de descărcare pentru toate cărțile achiziționate. Accesul este instant și permanent."
    },
    {
      question: "Pot returna produsele digitale?",
      answer: "Conform legislației în vigoare pentru produsele digitale, nu se pot face retururi odată ce fișierul a fost descărcat. Vă rugăm să citiți cu atenție descrierea produselor înainte de achiziție."
    },
    {
      question: "Ce fac dacă întâmpin probleme tehnice?",
      answer: "În cazul în care întâmpinați dificultăți la descărcare sau accesarea fișelor, vă rugăm să ne contactați la adresa de email contact@corcodusa.ro sau prin formularul de contact de pe site. Vă vom asista prompt."
    },
    {
      question: "Pot folosi fișele în scopuri comerciale?",
      answer: "Nu, fișele educative achiziționate de pe corcodusa.ro sunt destinate exclusiv uzului personal și non-comercial. Reproducerea sau distribuirea în scopuri comerciale este strict interzisă."
    },
    {
      question: "Ce metode de plată sunt acceptate?",
      answer: "Acceptăm plăți securizate online prin card bancar, prin intermediul partenerului nostru EuPlatesc. Tranzacțiile sunt criptate și sigure."
    },
    {
      question: "Pot oferi fișele educative cadou?",
      answer: "Momentan nu oferim opțiunea de a achiziționa fișe educative sub formă de cadou. Însă, puteți achiziționa produsele pentru dvs. și le puteți oferi apoi persoanei dragi."
    },
    {
      question: "Cât timp am acces la fișele cumpărate?",
      answer: "Aveți acces permanent la fișele achiziționate. Odată descărcate, acestea sunt ale dumneavoastră și le puteți folosi oricând doriți, fără limită de timp."
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#20BF55] to-[#FF6B00] text-white py-20 md:py-28 lg:py-36 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Învățare distractivă pentru copii de 3-7 ani
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-10 max-w-4xl mx-auto opacity-90">
            Descoperă cărțile noastre interactive în format PDF care transformă educația în joacă și dezvoltă abilitățile copilului tău într-un mod creativ și captivant!
          </p>
          <Link
            to="/produse"
            className="bg-white text-[#FF6B00] hover:bg-gray-100 px-8 py-3 rounded-full text-lg font-semibold transition-colors shadow-lg inline-flex items-center group"
          >
            Vezi produsele
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
        <div className="absolute inset-0 z-0">
          <img
            src="/images/homepage.png"
            alt="Children learning with Corcodusa"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
      </section>

      {/* Why Choose Corcodusa Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
            De ce Corcodușa este alegerea perfectă?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-6 rounded-xl shadow-lg bg-gray-50">
              <div className="bg-[#20BF55]/20 p-4 rounded-full mb-4">
                <Zap className="w-8 h-8 text-[#20BF55]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Dezvoltă gândirea</h3>
              <p className="text-gray-600 text-center">
                Activitățile noastre stimulează gândirea critică și ajută la dezvoltarea abilităților cognitive într-un mod captivant.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-xl shadow-lg bg-gray-50">
              <div className="bg-[#FF6B00]/20 p-4 rounded-full mb-4">
                <Smile className="w-8 h-8 text-[#FF6B00]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Încurajează creativitatea</h3>
              <p className="text-gray-600 text-center">
                Desenele și activitățile creative dezvoltă imaginația și expresivitatea copilului tău.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-xl shadow-lg bg-gray-50">
              <div className="bg-[#20BF55]/20 p-4 rounded-full mb-4">
                <BookOpen className="w-8 h-8 text-[#20BF55]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Învață prin joacă</h3>
              <p className="text-gray-600 text-center">
                Transformăm educația într-o experiență distractivă, pentru că știm că copiii învață cel mai bine când se joacă.
              </p>
            </div>
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
              <img src="/public/products/Alfabetul.png" alt="Alfabetul Ilustrat" className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Alfabetul Ilustrat</h3>
              <p className="text-gray-600 text-center">Învățarea alfabetului în scriere de tipar și de mână.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
              <img src="/public/products/Numere.png" alt="Învățarea Numerelor" className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Învățarea Numerelor</h3>
              <p className="text-gray-600 text-center">Exerciții interactive pentru recunoașterea și scrierea numerelor.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
              <img src="/public/products/Forme si Culori.png" alt="Activități de Coordonare" className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Activități de Coordonare</h3>
              <p className="text-gray-600 text-center">Dezvoltarea atenției și coordonării mână-ochi.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
              <img src="/public/images/Products3_FormesiCulori.png" alt="Planșe de Colorat" className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Planșe de Colorat</h3>
              <p className="text-gray-600 text-center">Zeci de planșe haioase ce așteaptă să fie colorate.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
            Ce spun părinții despre noi
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            Peste 500 de familii au ales deja cărțile noastre pentru educația copiilor lor
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 p-6 rounded-xl shadow-lg text-left">
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#FFC107] fill-[#FFC107]" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">\"{testimonial.text}\"</p>
                <p className="font-semibold text-gray-800">{testimonial.author}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple & Fast Process Section */}
      <section className="py-16 md:py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
            Proces simplu și rapid
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="bg-[#20BF55]/20 p-4 rounded-full mb-4">
                <Check className="w-8 h-8 text-[#20BF55]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Alege cărțile</h3>
              <p className="text-gray-600">Selectează cărțile care se potrivesc nevoilor copilului tău sau alege pachetul complet pentru economii maxime.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="bg-[#FF6B00]/20 p-4 rounded-full mb-4">
                <CreditCard className="w-8 h-8 text-[#FF6B00]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Finalizează comanda</h3>
              <p className="text-gray-600">Plătește în siguranță prin sistemul securizat EuPlatesc și primești o confirmare imediată.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="bg-[#20BF55]/20 p-4 rounded-full mb-4">
                <MessageSquare className="w-8 h-8 text-[#20BF55]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Primești email-ul</h3>
              <p className="text-gray-600">În câteva minute vei primi un email cu linkul de descărcare pentru cărțile achiziționate.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="bg-[#FF6B00]/20 p-4 rounded-full mb-4">
                <Download className="w-8 h-8 text-[#FF6B00]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Bucură-te de cărți</h3>
              <p className="text-gray-600">Descarcă, printează sau folosește direct pe tabletă – cărțile sunt ale tale pentru totdeauna!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offer Section (moved to Home as requested) */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-[#20BF55] to-[#FF6B00] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Pregătit să oferi copilului tău o experiență educațională de neuitat?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Investește în educația copilului tău cu cărțile noastre interactive în format PDF.
            Descarcă-le acum și bucură-te de ele oricând dorești!
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Individual Books Card */}
            <div className="bg-white text-gray-800 rounded-xl shadow-xl p-8 flex flex-col justify-between transform transition-transform duration-300 hover:scale-105">
              <div>
                <h3 className="text-2xl font-bold mb-4">Cărți Individuale</h3>
                <p className="text-4xl font-bold text-[#FF6B00] mb-6">39 <span className="text-xl">Lei/carte</span></p>
                <ul className="space-y-3 text-left mb-8">
                  <li className="flex items-center text-gray-700"><Check className="w-5 h-5 text-[#20BF55] mr-2" /> O carte la alegere</li>
                  <li className="flex items-center text-gray-700"><Check className="w-5 h-5 text-[#20BF55] mr-2" /> Peste 50 de pagini de activități</li>
                  <li className="flex items-center text-gray-700"><Check className="w-5 h-5 text-[#20BF55] mr-2" /> Acces permanent la descărcări</li>
                </ul>
              </div>
              <Link
                to="/catalog"
                className="w-full bg-[#FF6B00] text-white py-3 rounded-md text-lg font-semibold hover:bg-[#E05C00] transition-colors shadow-lg"
              >
                Alege o carte
              </Link>
            </div>

            {/* Complete Package Card */}
            <div className="bg-orange-100 text-gray-800 rounded-xl shadow-xl p-8 flex flex-col justify-between relative border-4 border-[#FF6B00] transform transition-transform duration-300 hover:scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF6B00] text-white text-sm font-bold px-4 py-1 rounded-full shadow-md">
                Cea mai bună ofertă
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Pachet Complet</h3>
                <p className="text-5xl font-bold text-[#20BF55] mb-2">89 <span className="text-xl">Lei</span></p>
                <p className="text-lg line-through text-gray-500 mb-6">117 Lei</p>
                <ul className="space-y-3 text-left mb-8">
                  <li className="flex items-center text-gray-700"><Check className="w-5 h-5 text-[#20BF55] mr-2" /> Toate cele 3 cărți</li>
                  <li className="flex items-center text-gray-700"><Check className="w-5 h-5 text-[#20BF55] mr-2" /> Peste 150 de pagini de activități</li>
                  <li className="flex items-center text-gray-700"><Check className="w-5 h-5 text-[#20BF55] mr-2" /> Acces permanent la descărcări</li>
                  <li className="flex items-center text-gray-700"><Check className="w-5 h-5 text-[#20BF55] mr-2" /> BONUS: Jocuri educative extra</li>
                  <li className="flex items-center text-gray-700"><Check className="w-5 h-5 text-[#20BF55] mr-2" /> BONUS: Diplome speciale</li>
                </ul>
              </div>
              <Link
                to="/catalog"
                className="w-full bg-[#FF6B00] text-white py-3 rounded-md text-lg font-semibold hover:bg-[#E05C00] transition-colors shadow-lg"
              >
                Cumpără pachetul complet
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-700 flex flex-col items-center">
            <p className="text-base font-semibold text-white mb-2">Plată securizată prin</p>
            <img src="/images/stripe-logo.png" alt="Stripe" className="h-8 w-auto filter grayscale invert opacity-70" />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
            Întrebări Frecvente
          </h2>
          <p className="text-lg text-gray-600 mb-12 text-center">
            Ai întrebări? Iată răspunsurile la cele mai comune întrebări
          </p>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                  <HelpCircle className="w-6 h-6 text-[#20BF55] mr-3" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 pl-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 