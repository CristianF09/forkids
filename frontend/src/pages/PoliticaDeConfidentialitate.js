import React from 'react';

const PoliticaDeConfidentialitate = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Politica de Confidențialitate</h1>
      
      <div className="space-y-6 text-lg">
        <p className="text-gray-700">
          La Corcodusa.ro respectăm confidențialitatea vizitatorilor și clienților noștri. Prezenta politică explică ce date colectăm, cum le folosim și ce drepturi aveți conform legislației în vigoare (Regulamentul (UE) 2016/679 – GDPR).
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">Ce date colectăm</h2>
        <p className="text-gray-700">Colectăm doar datele necesare pentru procesarea comenzilor și emiterea documentelor fiscale, prin intermediul platformei de plată Stripe:</p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Nume și prenume</li>
          <li>Adresă de e-mail</li>
          <li>Date de facturare (adresă, cod poștal – dacă este cerut de legislație fiscală)</li>
          <li>Date de plată (procesate securizat direct de Stripe; Corcodusa.ro nu stochează informații despre carduri bancare).
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">Cum colectăm datele</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Direct, prin formularul de comandă disponibil pe corcodusa.ro.</li>
          <li>Automat, prin cookie-uri esențiale pentru funcționarea site-ului.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">Scopurile prelucrării</h2>
        <p className="text-gray-700">Datele dvs. sunt utilizate exclusiv pentru:</p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Procesarea plăților și livrarea produselor digitale (fișe educative printabile).</li>
          <li>Emiterea documentelor fiscale.</li>
          <li>Comunicări legate strict de comanda dvs. (confirmare plată, acces la produse, eventuale probleme tehnice).</li>
        </ul>
        <p className="text-gray-700">Nu folosim datele pentru campanii promoționale sau publicitate personalizată, decât dacă v-ați abonat explicit la newsletter.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">Durata de stocare</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Datele fiscale sunt păstrate conform obligațiilor legale din Codul Fiscal (minimum 10 ani).
          </li>
          <li>Alte date (ex. e-mailul pentru newsletter) sunt păstrate până la retragerea consimțământului dvs.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">Divulgarea și transferul datelor</h2>
        <p className="text-gray-700">Datele dvs. nu sunt vândute și nu sunt divulgate către terți, cu excepția:</p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>procesatorului de plăți Stripe;</li>
          <li>autorităților fiscale, dacă este cazul conform legii.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">Securitatea datelor</h2>
        <p className="text-gray-700">Corcodusa.ro utilizează măsuri tehnice și organizatorice pentru a asigura protecția datelor personale.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">Drepturile dvs. conform GDPR</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Dreptul de acces și informare;</li>
          <li>Dreptul de rectificare sau ștergere;</li>
          <li>Dreptul de opoziție și restricționare a prelucrării;</li>
          <li>Dreptul la portabilitatea datelor;</li>
          <li>Dreptul de a depune plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP).
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">Cookie-uri</h2>
        <p className="text-gray-700">Corcodusa.ro folosește cookie-uri strict necesare pentru funcționarea site-ului și analiza traficului.</p>
        <p className="text-gray-700">Nu utilizăm cookie-uri de marketing fără acordul dvs. explicit.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">Contact</h2>
        <p className="text-gray-700">Pentru orice întrebare legată de datele dvs. personale, ne puteți contacta la:</p>
        <p className="text-gray-800 font-semibold">📧 contact@corcodusa.ro</p>
      </div>
    </div>
  );
};

export default PoliticaDeConfidentialitate; 