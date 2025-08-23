import React from 'react';
import { BookOpen, Heart, Star, Check, ShieldCheck } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-4">
            Despre Noi
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            La Corcodusa.ro, credem că învățarea devine magică atunci când este îmbinată cu joaca și curiozitatea naturală a copiilor.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-200">
          <div className="flex items-start mb-6">
            <BookOpen className="w-10 h-10 text-[#20BF55] mr-4 flex-shrink-0" />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                Misiunea Noastră
              </h2>
              <p className="text-gray-600 text-lg">
                Ne dorim ca fiecare copil să descopere bucuria de a învăța prin materiale educative digitale simple, colorate și interactive. Creăm resurse de calitate, gândite pentru a-i ajuta pe cei mici să se dezvolte într-un mod distractiv, plăcut și adaptat vârstei lor.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gradient-to-r from-[#20BF55] to-[#FF6B00] text-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Valorile Noastre</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-6 bg-white/10 rounded-xl">
              <div className="bg-white/20 p-3 rounded-full mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Educație de Calitate</h3>
              <p className="text-white/90">
                Resurse realizate de specialiști în educația timpurie.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-white/10 rounded-xl">
              <div className="bg-white/20 p-3 rounded-full mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pasiune</h3>
              <p className="text-white/90">
                Dedicare în a transforma învățarea într-o aventură plină de culoare.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-white/10 rounded-xl">
              <div className="bg-white/20 p-3 rounded-full mb-4">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sprijin pentru Părinți și Educatori</h3>
              <p className="text-white/90">
                Fișe și materiale ușor de folosit acasă sau la grădiniță.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-white/10 rounded-xl">
              <div className="bg-white/20 p-3 rounded-full mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Accesibilitate</h3>
              <p className="text-white/90">
                Educație de calitate disponibilă oricui, indiferent de circumstanțe.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-white/10 rounded-xl">
              <div className="bg-white/20 p-3 rounded-full mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Excelență</h3>
              <p className="text-white/90">
                Fiecare material este testat și adaptat nevoilor reale ale copiilor.
              </p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-200">
          <div className="flex items-start mb-6">
            <BookOpen className="w-10 h-10 text-[#FF6B00] mr-4 flex-shrink-0" />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                Povestea Noastră
              </h2>
              <p className="text-gray-600 text-lg">
                Corcodusa.ro a luat naștere din dorința de a aduce un plus de valoare educației timpurii. Am observat nevoia părinților și educatorilor pentru resurse atractive și practice, care să îi ajute pe copii să învețe alfabetul, numerele, formele și culorile într-un mod jucăuș.
              </p>
              <p className="text-gray-600 text-lg mt-4">
                Astăzi, suntem mândri că sute de părinți și educatori folosesc materialele noastre – fișe educative digitale printabile, cărți de activități și resurse creative – toate create cu grijă, pasiune și profesionalism.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
