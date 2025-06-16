import React from 'react';
import { Heart, Star, Sparkles, BookOpen, Users, Target, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#20BF55] to-[#01BAEF]">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white/10 rounded-full animate-float"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/images/logo.png"
                alt="Corcodușa Logo"
                className="w-48 h-48 object-contain mb-8"
              />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                Despre Corcodușa
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Suntem o echipă de educatori și părinți pasionați, dedicați să facem educația distractivă și accesibilă pentru toți copiii.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Character Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="/images/corcodusa.png"
                  alt="Corcodușa"
                  className="w-full h-auto rounded-xl shadow-lg"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Povestea Noastră</h2>
                <p className="text-gray-600 mb-6">
                  Corcodușa a luat naștere din dorința noastră de a transforma educația într-o experiență plăcută și eficientă. Echipa noastră, formată din educatori cu experiență și părinți dedicați, lucrează împreună pentru a crea materiale educaționale de calitate care să inspire și să încurajeze învățarea.
                </p>
                <p className="text-gray-600">
                  Fiecare material pe care îl creăm este gândit cu atenție pentru a se potrivi nevoilor copiilor de azi, combinând metode tradiționale cu abordări moderne și tehnologii interactive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Misiunea Noastră</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              "Fiecare copil are dreptul la o educație de calitate, adaptată stilului său de învățare și nevoilor sale specifice."
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
              <div className="bg-[#20BF55]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-[#20BF55]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Educație de Calitate</h3>
              <p className="text-gray-600">
                Creăm materiale educaționale de înaltă calitate, verificate de experți în domeniu.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
              <div className="bg-[#01BAEF]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-[#01BAEF]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Accesibilitate</h3>
              <p className="text-gray-600">
                Ne străduim să facem educația accesibilă pentru toți copiii, indiferent de locație sau resurse.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
              <div className="bg-[#20BF55]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-[#20BF55]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Inovație</h3>
              <p className="text-gray-600">
                Implementăm metode inovatoare de învățare care să capteze atenția și interesul copiilor.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
              <div className="bg-[#01BAEF]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-[#01BAEF]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Comunitate</h3>
              <p className="text-gray-600">
                Construim o comunitate de părinți și educatori dedicați dezvoltării copiilor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Valorile Noastre</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Aceste valori ne ghidează în tot ce facem și ne ajută să oferim cea mai bună experiență de învățare.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
              <div className="bg-[#20BF55]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-[#20BF55]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Calitate</h3>
              <p className="text-gray-600">
                Ne angajăm să oferim materiale educaționale de cea mai înaltă calitate, verificate și testate.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
              <div className="bg-[#01BAEF]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-[#01BAEF]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Pasiune</h3>
              <p className="text-gray-600">
                Suntem pasionați de educație și ne dedicăm cu entuziasm dezvoltării materialelor noastre.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
              <div className="bg-[#20BF55]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Star className="w-8 h-8 text-[#20BF55]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Excelență</h3>
              <p className="text-gray-600">
                Ne străduim să atingem excelența în tot ce facem, de la conținut până la experiența utilizatorului.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default About; 