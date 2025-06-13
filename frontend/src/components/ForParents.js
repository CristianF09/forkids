import React from 'react';
import { Lightbulb, MessageSquare, Activity, Heart } from 'lucide-react';

const ForParents = () => {
  const pillars = [
    {
      icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
      title: "Abilități cognitive",
      description: "Dezvoltarea gândirii critice și a capacității de rezolvare a problemelor"
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-blue-500" />,
      title: "Competențe lingvistice",
      description: "Îmbunătățirea comunicării și a vocabularului"
    },
    {
      icon: <Activity className="w-8 h-8 text-green-500" />,
      title: "Motricitate și sănătate",
      description: "Dezvoltarea abilităților fizice și a coordonării"
    },
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Inteligență emoțională și socializare",
      description: "Învățarea sănătoasă a relaționării cu ceilalți"
    }
  ];

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">👉 Pentru părinți: O provocare contemporană</h2>
        
        <p className="text-gray-600 text-lg mb-8 text-center">
          Într-o eră digitală unde expunerea copiilor la ecrane depășește frecvent 5 ore/zi (jocuri video, dispozitive mobile), impactul asupra dezvoltării lor devine subiect de dezbatere.
        </p>

        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <h3 className="text-xl font-semibold mb-4">Pe corcodusa.ro, am conceput resurse educaționale care:</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-pink-600 mr-2">•</span>
              <span>Înlocuiesc pasivitatea digitală cu învățare interactivă</span>
            </li>
            <li className="flex items-start">
              <span className="text-pink-600 mr-2">•</span>
              <span>Stimulează integral cele 4 piloni de dezvoltare:</span>
            </li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {pillars.map((pillar, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                {pillar.icon}
                <h4 className="text-lg font-semibold ml-3">{pillar.title}</h4>
              </div>
              <p className="text-gray-600">{pillar.description}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-600 mt-8 italic">
          Transformăm joaca în experiențe educative autentice – revenind la esența copilăriei, un ecran la rândul.
        </p>
      </div>
    </section>
  );
};

export default ForParents; 