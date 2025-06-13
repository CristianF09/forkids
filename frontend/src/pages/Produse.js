import React from 'react';

function Produse() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4">Produsele Noastre</h1>
      <p className="text-center text-gray-600 mb-12">
        Descoperă cărțile noastre educative care transformă învățarea în joacă și dezvoltă abilitățile copilului tău
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Alfabetul în Joacă */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">Alfabetul în Joacă</h2>
            <p className="text-sm text-gray-500 mb-4">3-5 ani</p>
            <p className="text-gray-600 mb-4">
              Această carte educativă îi ajută pe cei mici să descopere literele alfabetului printr-o serie de activități captivante și jocuri distractive.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li>• Învățarea literelor mari și mici de tipar</li>
              <li>• Recunoașterea sunetelor și asocierea cu literele</li>
              <li>• Exerciții de scris pentru dezvoltarea abilităților motorii fine</li>
              <li>• Activități de colorat pentru fiecare literă</li>
              <li>• Peste 50 de pagini de activități</li>
            </ul>
            <button className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
              Cumpără Acum
            </button>
          </div>
        </div>

        {/* Matematică Distractivă */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">Matematică Distractivă</h2>
            <p className="text-sm text-gray-500 mb-4">4-6 ani</p>
            <p className="text-gray-600 mb-4">
              Această carte ajută copiii să dezvolte abilități matematice de bază într-un mod distractiv și accesibil, prin jocuri și activități interactive.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li>• Recunoașterea și scrierea numerelor de la 1 la 20</li>
              <li>• Învățarea conceptelor de adunare și scădere</li>
              <li>• Jocuri de numărare și asociere</li>
              <li>• Activități de rezolvare a problemelor simple</li>
              <li>• Peste 50 de pagini de activități</li>
            </ul>
            <button className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
              Cumpără Acum
            </button>
          </div>
        </div>

        {/* Aventuri în Culori */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">Aventuri în Culori</h2>
            <p className="text-sm text-gray-500 mb-4">3-7 ani</p>
            <p className="text-gray-600 mb-4">
              O colecție de planșe de colorat și activități creative care stimulează imaginația și dezvoltă abilitățile artistice ale copiilor.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li>• Planșe de colorat tematice (animale, anotimpuri, povești)</li>
              <li>• Activități de desen ghidate pas cu pas</li>
              <li>• Jocuri de potrivire a culorilor</li>
              <li>• Labirinturi și activități de coordonare</li>
              <li>• Peste 50 de pagini de activități</li>
            </ul>
            <button className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
              Cumpără Acum
            </button>
          </div>
        </div>

        {/* Pachet Complet */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">Pachet Complet</h2>
            <p className="text-sm text-gray-500 mb-4">3-7 ani</p>
            <p className="text-gray-600 mb-4">
              Obține toate cele 3 cărți la un preț special, cu peste 150 de pagini de activități educative și distractive pentru copilul tău.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li>• Alfabetul în Joacă - activități de alfabetizare</li>
              <li>• Matematică Distractivă - activități matematice</li>
              <li>• Aventuri în Culori - activități artistice</li>
              <li>• BONUS: Jocuri Educative Extra - 20 de pagini de jocuri suplimentare</li>
              <li>• BONUS: Diplome personalizate pentru fiecare secțiune completată</li>
            </ul>
            <button className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
              Cumpără Acum
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Produse; 