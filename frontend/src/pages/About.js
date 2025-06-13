import React from 'react';
import { BookOpen, Users, Lightbulb, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-blue-900 mb-6">
            Despre Corcodușa
          </h1>
          <p className="text-2xl text-blue-700 max-w-3xl mx-auto">
            Află povestea noastră și de ce suntem pasionați să facem educația distractivă pentru copiii tăi
          </p>
        </div>

        {/* Character Section */}
        <div className="bg-white rounded-2xl shadow-xl p-10 mb-16 border border-blue-100">
          <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center">
            Corcodușa - Personajul nostru prietenos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xl text-blue-800 mb-8 leading-relaxed">
                Corcodușa s-a născut din pasiunea pentru educație și din dorința de a oferi copiilor materiale de calitate care să îmbine învățarea cu distracția.
              </p>
              <p className="text-xl text-blue-800 leading-relaxed">
                Totul a început în 2022, când am observat că există o nevoie crescută pentru materiale educative de calitate în format digital, care să fie accesibile tuturor părinților și educatorilor.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src="/images/img1.png"
                alt="Corcodușa"
                className="w-80 h-80 object-contain transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-xl p-10 mb-16 text-white">
          <h2 className="text-4xl font-bold mb-8 text-center">
            Povestea noastră
          </h2>
          <p className="text-xl mb-6 leading-relaxed text-center max-w-4xl mx-auto">
            Echipa noastră este formată din specialiști în educație timpurie, ilustratori pasionați și părinți dedicați, toți uniți de misiunea de a crea cele mai bune resurse educaționale pentru copiii între 3 și 7 ani.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-xl p-10 mb-16 border border-blue-100">
          <h2 className="text-4xl font-bold text-blue-900 mb-8 text-center">
            Misiunea noastră
          </h2>
          <p className="text-2xl text-blue-700 italic mb-12 text-center max-w-4xl mx-auto">
            "Credem că fiecare copil are dreptul la o educație de calitate, prezentată într-un mod care să îi stârnească curiozitatea și pasiunea pentru învățare."
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-blue-50 rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
              <BookOpen className="w-12 h-12 text-blue-600 mb-4" />
              <p className="text-lg text-blue-800">Dezvoltăm gândirea critică și creativitatea copiilor</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <p className="text-lg text-blue-800">Oferim activități educative adaptate nevoilor fiecărui copil</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
              <Lightbulb className="w-12 h-12 text-blue-600 mb-4" />
              <p className="text-lg text-blue-800">Facilităm procesul de învățare prin joc și distracție</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
              <Heart className="w-12 h-12 text-blue-600 mb-4" />
              <p className="text-lg text-blue-800">Sprijinim părinții și educatorii cu resurse practice și eficiente</p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-xl p-10 text-white">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Valorile noastre
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-center">Calitate</h3>
              <p className="text-lg text-center">
                Toate materialele noastre sunt create împreună cu specialiști în educație și sunt testate cu copii înainte de a fi publicate.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-center">Accesibilitate</h3>
              <p className="text-lg text-center">
                Credem că educația de calitate trebuie să fie accesibilă tuturor, indiferent de locație sau statut financiar.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-center">Inovație</h3>
              <p className="text-lg text-center">
                Ne adaptăm constant metodele și conținutul pentru a ține pasul cu nevoile în continuă schimbare ale copiilor din lumea modernă.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 