import React from 'react';

const FAQ = () => {
  const faqItems = [
    {
      question: "Cine a realizat fișele educative de la corcodusa.ro?",
      answer: "Fișele educative de pe corcodusa.ro sunt realizate de o absolventă a Facultății de Litere, cu modul psihopedagogic finalizat, în colaborare cu cadre didactice cu experiență. Activitățile sunt concepute pentru a fi atractive și adaptate vârstei copiilor."
    },
    {
      question: "Cum aleg fișele potrivite pentru vârsta copilului meu?",
      answer: "Fișele sunt potrivite pentru copiii cu vârste între 3 și 7 ani. Fiecare activitate are menționată vârsta recomandată. Mai mult, materialele sunt actualizate periodic, fără costuri suplimentare."
    },
    {
      question: "Cum primesc fișele după achiziție?",
      answer: "După finalizarea plății, primiți un e-mail cu linkul de descărcare. Vă rugăm să verificați și folderul spam."
    },
    {
      question: "Pot returna produsele digitale?",
      answer: "Conform OUG nr. 34/2014, produsele digitale nu pot fi returnate sau rambursate după descărcare."
    },
    {
      question: "Ce fac dacă întâmpin probleme tehnice?",
      answer: "Ne puteți contacta la contact@corcodusa.ro și vom reveni cât mai repede posibil."
    },
    {
      question: "Pot folosi fișele în scopuri comerciale?",
      answer: "Fișele sunt pentru uz personal. Este interzisă reproducerea sau distribuirea în scopuri comerciale."
    },
    {
      question: "Ce metode de plată sunt acceptate?",
      answer: "Acceptăm plata cu card (VISA, Mastercard) și alte metode disponibile în platformă. Toate tranzacțiile sunt securizate."
    },
    {
      question: "Pot oferi fișele educative cadou?",
      answer: "Da, puteți introduce adresa de e-mail a destinatarului la finalizarea comenzii sau puteți transmite fișierul descărcat ulterior."
    },
    {
      question: "Cât timp am acces la fișele cumpărate?",
      answer: "Accesul este nelimitat. Puteți folosi fișele oricând, iar actualizările viitoare sunt incluse."
    }
  ];

  return (
    <section className="bg-white py-10 px-4 md:px-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">Întrebări frecvente</h2>

      <div className="space-y-4" id="faq">
        {faqItems.map((item, index) => (
          <details key={index} className="group border rounded-xl p-4">
            <summary className="flex justify-between items-center cursor-pointer text-lg font-medium text-gray-800">
              {item.question}
              <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="mt-2 text-gray-600">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
};

export default FAQ; 