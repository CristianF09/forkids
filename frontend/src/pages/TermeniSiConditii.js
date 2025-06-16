import React from 'react';

const TermeniSiConditii = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Termeni & Condiții</h1>
      
      <div className="space-y-6 text-lg">
        <p className="text-gray-700">
          Prin accesarea și utilizarea site-ului www.corcodusa.ro, precum și prin achiziționarea produselor digitale disponibile, sunteți de acord, în mod implicit, cu termenii și condițiile prezentate în acest document. Utilizarea site-ului în orice alt scop decât cel de informare și achiziție de produse educative digitale este interzisă.
        </p>

        <p className="text-gray-700">
          Corcodusa.ro își rezervă dreptul de a modifica în orice moment conținutul, structura sau accesibilitatea website-ului www.corcodusa.ro, fără notificare prealabilă.
        </p>

        <p className="text-gray-700">
          Acest document este completat de prevederile legislației în vigoare, inclusiv:
        </p>

        <ul className="list-disc pl-6 text-gray-700">
          <li>OUG nr. 130/2000</li>
          <li>Legea nr. 296/2004</li>
          <li>Legea nr. 677/2001</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Produsele</h2>
        <p className="text-gray-700">
          Produsele digitale oferite prin corcodusa.ro sunt disponibile pentru descărcare imediată după efectuarea plății.
        </p>

        <p className="text-gray-700">
          Întregul conținut al website-ului – imagini, texte, grafică, simboluri, scripturi, emailuri și alte date – este proprietatea Corcodusa.ro și este protejat de Legea nr. 8/1996 privind drepturile de autor și de legislația aferentă proprietății intelectuale.
        </p>

        <p className="text-gray-700">
          Utilizarea, copierea, distribuirea sau reproducerea oricărui element fără acordul expres al deținătorului de drepturi este interzisă și se pedepsește conform legii.
        </p>

        <p className="text-gray-700">
          Informațiile de pe site sunt oferite „ca atare", fără alte garanții în afara celor prevăzute de legislație. Prețurile includ TVA, iar produsele nu implică costuri de livrare.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Date cu Caracter Personal</h2>
        <p className="text-gray-700">
          Pentru a finaliza o comandă pe www.corcodusa.ro, este necesar să furnizați informații precum: nume, prenume, email, adresă, date de facturare (inclusiv CNP și date firmă, dacă este cazul).
        </p>

        <p className="text-gray-700">
          Prin completarea formularului de comandă, vă exprimați acordul pentru colectarea și prelucrarea acestor date, în conformitate cu legislația în vigoare privind protecția datelor personale (GDPR).
        </p>

        <p className="text-gray-700">
          Pentru întrebări legate de modul în care vă sunt procesate datele sau pentru exercitarea drepturilor prevăzute de lege, ne puteți contacta oricând la:
          <br />
          <a href="mailto:contact@corcodusa.ro" className="text-blue-600 hover:text-blue-800">
            📩 contact@corcodusa.ro
          </a>
        </p>
      </div>
    </div>
  );
};

export default TermeniSiConditii; 