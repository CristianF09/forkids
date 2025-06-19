import React from 'react';
import { BookOpen, Heart, Users, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Despre Noi
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Suntem dedicați dezvoltării educaționale a copiilor prin materiale interactive și distractive
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Misiunea Noastră</h2>
          <p className="text-gray-600 mb-8 text-lg">
            La Corcodusa.ro, credem că învățarea ar trebui să fie o experiență plăcută și captivantă pentru copii. 
            Misiunea noastră este să creăm materiale educaționale de înaltă calitate care să inspire și să motiveze 
            copiii să învețe într-un mod distractiv și interactiv.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
              <BookOpen className="w-10 h-10 text-[#20BF55] mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Educație Calitativă</h3>
              <p className="text-gray-600">
                Materiale create de specialiști în educație timpurie
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
              <Heart className="w-10 h-10 text-[#FF6B00] mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Pasiune</h3>
              <p className="text-gray-600">
                Dedicați dezvoltării copiilor prin învățare distractivă
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
              <Users className="w-10 h-10 text-[#20BF55] mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Comunitate</h3>
              <p className="text-gray-600">
                Sprijinim părinții și educatorii în procesul educațional
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
              <Award className="w-10 h-10 text-[#FF6B00] mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Excelență</h3>
              <p className="text-gray-600">
                Materiale testate și aprobate de experți în educație
              </p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Povestea Noastră</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <p className="text-gray-600 text-lg">
                Corcodusa.ro a început din pasiunea noastră pentru educație și dezvoltarea copiilor. 
                Am observat că există o nevoie reală pentru materiale educaționale interactive și distractive 
                care să ajute copiii să învețe într-un mod plăcut.
              </p>
              <p className="text-gray-600 text-lg">
                Echipa noastră este formată din educatori, psihologi și specialiști în dezvoltarea copiilor, 
                care lucrează împreună pentru a crea materiale educaționale de înaltă calitate.
              </p>
              <p className="text-gray-600 text-lg">
                Astăzi, suntem mândri să ajutăm mii de copii să învețe și să se dezvolte prin materialele 
                noastre interactive și distractive.
              </p>
            </div>
            <div className="relative h-[300px] md:h-[400px]">
              <img
                src="/images/homepage.png"
                alt="Copii învățând cu Corcodusa"
                className="w-full h-full object-cover rounded-xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/logo.png';
                }}
              />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Valorile Noastre</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Calitate</h3>
              <p className="text-gray-600 text-lg">
                Ne asigurăm că toate materialele noastre sunt create cu atenție la detalii și respectă 
                cele mai înalte standarde educaționale.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Inovație</h3>
              <p className="text-gray-600 text-lg">
                Continuăm să dezvoltăm și să îmbunătățim materialele noastre pentru a oferi cea mai bună 
                experiență de învățare.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Accesibilitate</h3>
              <p className="text-gray-600 text-lg">
                Ne străduim să facem educația de calitate accesibilă tuturor copiilor, indiferent de 
                circumstanțe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;