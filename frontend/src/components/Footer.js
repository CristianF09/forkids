import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Footer = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const legalSections = [
    {
      id: 'terms',
      title: '1. Termeni & Condiții',
      content: (
        <div className="space-y-4">
          <p>
            Prin accesarea și utilizarea site-ului www.corcodusa.ro, precum și prin achiziționarea produselor digitale disponibile, sunteți de acord, în mod implicit, cu termenii și condițiile prezentate în acest document. Utilizarea site-ului în orice alt scop decât cel de informare și achiziție de produse educative digitale este interzisă.
          </p>
          <p>
            Corcodusa.ro își rezervă dreptul de a modifica în orice moment conținutul, structura sau accesibilitatea website-ului www.corcodusa.ro, fără notificare prealabilă.
          </p>
          <p>Acest document este completat de prevederile legislației în vigoare, inclusiv:</p>
          <ul className="list-disc list-inside">
            <li>OUG nr. 130/2000</li>
            <li>Legea nr. 296/2004</li>
            <li>Legea nr. 677/2001</li>
          </ul>
          <h3 className="font-semibold mt-4">Produsele</h3>
          <p>
            Produsele digitale oferite prin corcodusa.ro sunt disponibile pentru descărcare imediată după efectuarea plății.
          </p>
          <p>
            Întregul conținut al website-ului – imagini, texte, grafică, simboluri, scripturi, emailuri și alte date – este proprietatea Corcodusa.ro și este protejat de Legea nr. 8/1996 privind drepturile de autor și de legislația aferentă proprietății intelectuale.
          </p>
          <p>
            Utilizarea, copierea, distribuirea sau reproducerea oricărui element fără acordul expres al deținătorului de drepturi este interzisă și se pedepsește conform legii.
          </p>
          <p>
            Informațiile de pe site sunt oferite „ca atare", fără alte garanții în afara celor prevăzute de legislație. Prețurile includ TVA, iar produsele nu implică costuri de livrare.
          </p>
          <h3 className="font-semibold mt-4">Date cu Caracter Personal</h3>
          <p>
            Pentru a finaliza o comandă pe www.corcodusa.ro, este necesar să furnizați informații precum: nume, prenume, email, adresă, date de facturare (inclusiv CNP și date firmă, dacă este cazul).
          </p>
          <p>
            Prin completarea formularului de comandă, vă exprimați acordul pentru colectarea și prelucrarea acestor date, în conformitate cu legislația în vigoare privind protecția datelor personale (GDPR).
          </p>
          <p>
            Pentru întrebări legate de modul în care vă sunt procesate datele sau pentru exercitarea drepturilor prevăzute de lege, ne puteți contacta oricând la:
            <br />
            📩 contact@corcodusa.ro
          </p>
        </div>
      )
    },
    {
      id: 'payment',
      title: '2. Metode de Plată',
      content: (
        <div className="space-y-4">
          <p>
            Produsele de pe www.corcodusa.ro pot fi achiziționate prin următoarele metode:
          </p>
          <h3 className="font-semibold">💳 Plată cu cardul bancar</h3>
          <p>
            Puteți efectua plata online, în siguranță deplină, folosind un card emis sub sigla VISA (Classic sau Electron) sau MASTERCARD (inclusiv Maestro). Nu se percep comisioane suplimentare.
          </p>
          <p>
            Procesarea plăților este realizată de platforma securizată Stripe. Datele cardului nu sunt stocate și sunt criptate, transmise direct către banca procesatoare printr-o conexiune securizată.
          </p>
          <p>
            Toate plățile se efectuează în LEI, la cursul de schimb stabilit de banca emitentă. Tranzacțiile vor apărea pe extrasul de cont sub denumirea Corcodusa.ro
          </p>
          <h3 className="font-semibold mt-4">Drepturi și Reclamații Consumatori</h3>
          <p>
            Conform Ordinului ANPC nr. 433/2009, puteți transmite sesizări privind produsele sau serviciile noastre la:
            <br />
            ☎️ TEL INFO – CONSUMATOR: 0800 080 999 (apel gratuit)
          </p>
        </div>
      )
    },
    {
      id: 'privacy',
      title: '3. Politica de Confidențialitate',
      content: (
        <div className="space-y-4">
          <p>
            Știind cât de importantă este confidențialitatea pentru clienții noștri, vă sfătuim să vă luați timpul necesar parcurgerii prezentei politici de confidențialitate, al cărei scop este de a vă explica practicile noastre de colectare și prelucrare a datelor personale ale clienților.
          </p>
          <h3 className="font-semibold mt-4">Temeiuri legale de prelucrare a datelor</h3>
          <p>
            Începând cu 25 mai 2018, a intrat în vigoare Regulamentul (UE) 2016/679 privind protecția persoanelor fizice în ceea ce privește prelucrarea datelor cu caracter personal (GDPR).
          </p>
          <h3 className="font-semibold mt-4">Ce date colectăm</h3>
          <ul className="list-disc list-inside">
            <li>Informații pentru facturare și livrare: nume, prenume, CNP (dacă e cazul), adresă, cod poștal, e-mail, telefon, cont bancar.</li>
            <li>Informații furnizate pentru servicii de service sau garanție.</li>
            <li>Date pentru campanii promoționale: nume, prenume, e-mail, telefon, adrese pentru corespondență.</li>
          </ul>
          <h3 className="font-semibold mt-4">Drepturile dvs. conform GDPR</h3>
          <ul className="list-disc list-inside">
            <li>Dreptul la informare și acces</li>
            <li>Dreptul de a solicita rectificarea sau ștergerea datelor</li>
            <li>Dreptul de a restricționa prelucrarea</li>
            <li>Dreptul de portabilitate</li>
            <li>Dreptul de opoziție</li>
            <li>Dreptul de a nu fi supus unei decizii automate</li>
            <li>Dreptul de a depune o plângere la autoritățile competente</li>
          </ul>
        </div>
      )
    },
    {
      id: 'returns',
      title: '4. Politica de Retur',
      content: (
        <div className="space-y-4">
          <p>
            Conform legislației în vigoare (OUG nr. 34/2014), produsele digitale descărcabile achiziționate de pe site-ul nostru nu pot fi returnate și nu sunt eligibile pentru rambursare.
          </p>
          <p>
            Prin finalizarea comenzii și descărcarea materialelor digitale, vă exprimați acordul explicit cu privire la începerea execuției contractului digital și confirmați că renunțați la dreptul legal de retragere, odată ce produsul a fost accesat sau descărcat.
          </p>
          <p>
            În cazul în care întâmpinați dificultăți tehnice sau aveți întrebări legate de materialele achiziționate, vă rugăm să ne contactați la contact@corcodusa.ro, iar echipa noastră vă va sprijini cu promptitudine.
          </p>
          <p>
            Vă mulțumim pentru încredere și pentru că ați ales materialele educative digitale Corcodușa! 💛
          </p>
        </div>
      )
    }
  ];

  return (
    <footer className="bg-gray-50 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">LEGAL</h2>
        
        <div className="space-y-4">
          {legalSections.map((section) => (
            <div key={section.id} className="border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 flex justify-between items-center"
              >
                <span className="font-semibold">{section.title}</span>
                {openSection === section.id ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              
              {openSection === section.id && (
                <div className="px-6 py-4 bg-white border-t">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-gray-600">
          <p>© {new Date().getFullYear()} Corcodusa.ro. Toate drepturile rezervate.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 