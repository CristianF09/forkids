import React from 'react';
import { Heart, Star, Sparkles, BookOpen, Users, Target, Award, Check } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Despre Corcodușa
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Află povestea noastră și de ce suntem pasionați să facem educația distractivă pentru copiii tăi
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/images/corcodusa_character.png"
                alt="Corcodușa Character"
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Povestea noastră</h2>
              <p className="text-gray-700 mb-4">
                Corcodușa s-a născut din pasiunea pentru educație și din dorința de a oferi copiilor materiale de calitate care să îmbine învățarea cu distracția.
              </p>
              <p className="text-gray-700 mb-4">
                Totul a început în 2022, când am observat că există o nevoie crescută pentru materiale educative de calitate în format digital, care să fie accesibile tuturor părinților și educatorilor.
              </p>
              <p className="text-gray-700">
                Echipa noastră este formată din specialiști în educație timpurie, ilustratori pasionați și părinți dedicați, toți uniți de misiunea de a crea cele mai bune resurse educaționale pentru copiii între 3 și 7 ani.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Misiunea noastră</h2>
            <div className="bg-green-100 border-l-4 border-[#20BF55] text-green-800 p-4 mb-8 text-left italic max-w-3xl mx-auto">
              "Credem că fiecare copil are dreptul la o educație de calitate, prezentată într-un mod care să îi stârnească curiozitatea și pasiunea pentru învățare."
            </div>
            <p className="text-lg text-gray-700 mb-6">
              Prin materialele noastre, ne propunem să:
            </p>
            <ul className="list-none space-y-2 text-left inline-block">
              <li className="flex items-start text-gray-700">
                <Check className="w-5 h-5 text-[#20BF55] mr-2 flex-shrink-0 mt-1" />
                Dezvoltăm gândirea critică și creativitatea copiilor
              </li>
              <li className="flex items-start text-gray-700">
                <Check className="w-5 h-5 text-[#20BF55] mr-2 flex-shrink-0 mt-1" />
                Oferim activități educative adaptate nevoilor fiecărui copil
              </li>
              <li className="flex items-start text-gray-700">
                <Check className="w-5 h-5 text-[#20BF55] mr-2 flex-shrink-0 mt-1" />
                Facilităm procesul de învățare prin joc și distracție
              </li>
              <li className="flex items-start text-gray-700">
                <Check className="w-5 h-5 text-[#20BF55] mr-2 flex-shrink-0 mt-1" />
                Sprijinim părinții și educatorii cu resurse practice și eficiente
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Valorile noastre</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="bg-[#20BF55]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-[#20BF55]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Calitate</h3>
              <p className="text-gray-600">
                Toate materialele noastre sunt create împreună cu specialiști în educație și sunt testate cu copii înainte de a fi publicate.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="bg-[#FF6B00]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-[#FF6B00]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Accesibilitate</h3>
              <p className="text-gray-600">
                Credem că educația de calitate trebuie să fie accesibilă tuturor, indiferent de locație sau statut financiar.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="bg-[#20BF55]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-[#20BF55]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Inovație</h3>
              <p className="text-gray-600">
                Ne adaptăm constant metodele și conținutul pentru a ține pasul cu nevoile în continuă schimbare ale copiilor din lumea modernă.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 