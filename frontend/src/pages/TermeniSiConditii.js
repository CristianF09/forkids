import React from 'react';

const TermeniSiConditii = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Termeni & Condiții – Corcodusa.ro</h1>
      
      <div className="space-y-6 text-lg">
        <p className="text-gray-700">
          Prin accesarea și utilizarea site-ului <span className="font-semibold">www.corcodusa.ro</span>, precum și prin achiziționarea produselor digitale disponibile, confirmați că ați citit, înțeles și sunteți de acord cu termenii și condițiile prezentate în acest document.
        </p>
        <p className="text-gray-700">Utilizarea site-ului în orice alt scop decât cel de informare și achiziție de produse educative digitale este interzisă.</p>
        <p className="text-gray-700">Corcodusa.ro își rezervă dreptul de a modifica, în orice moment și fără notificare prealabilă, conținutul, structura sau accesibilitatea website-ului.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">1. Produsele</h2>
        <p className="text-gray-700">
          Produsele oferite prin <span className="font-semibold">www.corcodusa.ro</span> sunt materiale educative digitale (fișiere PDF și/sau imagini) disponibile pentru descărcare imediată după efectuarea plății.
        </p>
        <p className="text-gray-700">Întregul conținut al website-ului – imagini, texte, grafică, simboluri, scripturi, emailuri și alte date – este proprietatea Corcodusa.ro și este protejat de Legea nr. 8/1996 privind drepturile de autor și de legislația aferentă proprietății intelectuale.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">2. Licență de utilizare</h2>
        <p className="text-gray-700">Prin achiziționarea materialelor educative digitale disponibile pe <span className="font-semibold">www.corcodusa.ro</span>, utilizatorul primește o licență personală, neexclusivă și netransmisibilă pentru a descărca și utiliza fișierele în scopuri proprii și personale.</p>
        <p className="text-gray-700 font-semibold">✔ Este permis:</p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>descărcarea fișierelor și imprimarea acestora pentru uz personal sau familial;</li>
          <li>utilizarea materialelor în activități educative proprii (acasă sau în clasă).</li>
        </ul>
        <p className="text-gray-700 font-semibold">❌ Nu este permis:</p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>revânzarea, distribuirea, copierea sau partajarea materialelor, integral sau parțial, către terți;</li>
          <li>utilizarea materialelor în scopuri comerciale sau includerea lor în alte produse digitale/fizice destinate vânzării;</li>
          <li>publicarea materialelor (integral sau parțial) online, pe rețele sociale, site-uri, grupuri sau alte platforme publice, fără acordul scris al titularului de drepturi.</li>
        </ul>
        <p className="text-gray-700">Încălcarea acestor condiții atrage răspunderea civilă și penală, conform legislației în vigoare.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">3. Prețuri și plăți</h2>
        <p className="text-gray-700">Prețurile afișate pe site includ TVA și se aplică exclusiv produselor digitale.</p>
        <p className="text-gray-700">Plata produselor se realizează online, prin card bancar, în siguranță, prin intermediul platformei securizate <span className="font-semibold">Stripe.com</span>.</p>
        <p className="text-gray-700">Datele cardului nu sunt stocate de Corcodusa.ro. Tranzacțiile apar pe extrasul de cont sub denumirea <span className="font-semibold">Corcodusa.ro</span>.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">4. Politica de livrare</h2>
        <p className="text-gray-700">Fișierele digitale sunt disponibile pentru descărcare imediată după confirmarea plății.</p>
        <p className="text-gray-700">Nu există costuri de transport, întrucât produsele sunt livrate exclusiv în format digital.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">5. Politica de retur</h2>
        <p className="text-gray-700">Conform legislației în vigoare privind produsele digitale, fișierele descărcate nu pot fi returnate.</p>
        <p className="text-gray-700">Prin efectuarea plății, utilizatorul își exprimă acordul expres că renunță la dreptul de retragere după descărcarea produsului.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">6. Date cu caracter personal</h2>
        <p className="text-gray-700">Pentru finalizarea unei comenzi pe <span className="font-semibold">www.corcodusa.ro</span>, sunt necesare următoarele informații: nume, prenume, email și date de facturare.</p>
        <p className="text-gray-700">Prin completarea formularului de comandă, utilizatorul își exprimă acordul pentru colectarea și prelucrarea acestor date în conformitate cu legislația GDPR. Pentru detalii suplimentare, consultați <span className="underline">Politica de Confidențialitate</span>.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">7. Limitarea răspunderii</h2>
        <p className="text-gray-700">Corcodusa.ro depune toate eforturile pentru a oferi informații corecte și actualizate. Cu toate acestea, nu poate garanta absența erorilor și nu poate fi făcut responsabil pentru daunele directe sau indirecte rezultate din utilizarea site-ului sau a materialelor digitale descărcate.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">8. Contact</h2>
        <p className="text-gray-700">Pentru întrebări legate de termeni și condiții sau de utilizarea materialelor, ne puteți contacta la:</p>
        <p className="text-gray-800 font-semibold">📩 <a href="mailto:contact@corcodusa.ro" className="underline">contact@corcodusa.ro</a></p>
      </div>
    </div>
  );
};

export default TermeniSiConditii; 