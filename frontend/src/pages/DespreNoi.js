import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpenCheck,
  Heart,
  Star,
  ArrowRight,
  Target,
  Users,
  Award,
  Lightbulb,
  Shield,
  MessageCircle,
  Sparkles,
  CheckCircle
} from 'lucide-react';

const DespreNoi = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#25B838]/10 via-white to-[#FF6B00]/10 py-12 md:py-16 lg:py-20">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-[#25B838]/20 to-[#FF6B00]/20 rounded-full animate-float opacity-20"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-[#FF6B00]/20 to-[#FFD700]/20 rounded-full animate-float-delayed opacity-20"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-r from-[#2C5F7A]/20 to-[#0A4D68]/20 rounded-full animate-float opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 md:mb-6">
            Despre Noi
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-gray-600 text-center">
              La Corcodușa.ro, credem că învățarea devine cu adevărat magică atunci când este îmbinată cu joaca, imaginația și curiozitatea naturală a copiilor.
              Fiecare fișă, carte sau activitate pe care o creăm este o invitație la descoperire, zâmbete și dezvoltare armonioasă.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-to-r from-[#25B838] to-[#FF6B00] text-white rounded-3xl p-8 md:p-12 mb-16 shadow-2xl">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Misiunea Noastră</h2>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
              Ne dorim ca fiecare copil să descopere bucuria de a învăța prin materiale digitale simple, colorate și interactive.
              Punem la dispoziția părinților și educatorilor resurse educative de înaltă calitate, create cu grijă, care transformă timpul petrecut la învățare într-o aventură distractivă și plină de sens.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Valorile Noastre</h2>
            <p className="text-xl text-gray-600">Principiile care ne ghidează în fiecare proiect</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-purple-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">✨ Educație de Calitate</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Materialele noastre sunt create de specialiști în educația timpurie și adaptate fiecărei etape de dezvoltare.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border border-pink-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">❤️ Pasiune și Creativitate</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Punem suflet în fiecare pagină, pentru ca învățarea să fie o experiență plăcută, nu o obligație.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border border-orange-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">👨‍👩‍👧 Sprijin pentru Părinți și Educatori</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Resursele noastre pot fi folosite cu ușurință acasă, la grădiniță sau în activitățile zilnice.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">🏆 Excelență și Inspirație</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Fiecare material este testat și perfecționat pentru a răspunde nevoilor reale ale copiilor.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">🌍 Accesibilitate pentru Toți</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Credem că fiecare copil merită șansa de a învăța prin joacă, indiferent de locul din care pornește.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl border border-yellow-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">📖 Povestea Noastră</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Corcodușa.ro s-a născut din dorința sinceră de a aduce un plus de valoare în educația timpurie.
              </p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-gradient-to-r from-[#25B838] via-[#FF6B00] to-[#FFD700] text-white rounded-3xl p-8 md:p-12 mb-16 shadow-2xl">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">📖 Povestea Noastră</h2>
            <div className="text-xl md:text-2xl leading-relaxed space-y-6">
              <p>
                Corcodușa.ro s-a născut din dorința sinceră de a aduce un plus de valoare în educația timpurie.
                Am pornit de la o întrebare simplă: <strong>Cum putem transforma învățarea într-o bucurie pentru copii și o ușurare pentru părinți și educatori?</strong>
              </p>
              <p>
                Așa au apărut fișele educative digitale, cărțile de activități și resursele creative care îi ajută pe cei mici să învețe alfabetul, numerele, formele și culorile într-un mod interactiv și vesel.
              </p>
              <p className="text-2xl font-bold">
                Astăzi, suntem mândri că mii de copii cresc, se joacă și descoperă lumea învățării alături de Corcodușa – un prieten de încredere în călătoria lor spre cunoaștere.
              </p>
            </div>
          </div>
        </div>

        {/* What We Offer */}
        <div className="bg-white rounded-3xl p-8 md:p-12 mb-16 shadow-xl border border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Ce Oferim</h2>
            <p className="text-xl text-gray-600">Materiale educative de înaltă calitate pentru dezvoltarea armonioasă a copiilor</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Cărți Educative</h3>
              <p className="text-gray-600">Fișe digitale interactive pentru învățarea alfabetului, numerelor și formelor</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl border border-pink-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Activități Creative</h3>
              <p className="text-gray-600">Jocuri distractive și activități care stimulează imaginația și creativitatea</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl border border-orange-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Diplome Personalizate</h3>
              <p className="text-gray-600">Certificate de absolvire pentru fiecare secțiune completată cu succes</p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-3xl p-8 md:p-12 mb-16 shadow-2xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">De ce să ne alegi?</h2>
            <p className="text-xl opacity-90">Avantajele care ne fac diferiți</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <CheckCircle className="w-8 h-8 text-green-300 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Materiale Testate</h3>
                <p className="opacity-90">Fiecare resursă este testată și validată de specialiști în educație timpurie</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <CheckCircle className="w-8 h-8 text-green-300 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Acces Permanent</h3>
                <p className="opacity-90">O dată achiziționat, materialul rămâne al tău pentru totdeauna</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <CheckCircle className="w-8 h-8 text-green-300 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Suport Dedicat</h3>
                <p className="opacity-90">Echipa noastră este întotdeauna pregătită să te ajute cu orice întrebare</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <CheckCircle className="w-8 h-8 text-green-300 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Plăți Securizate</h3>
                <p className="opacity-90">Procesăm plățile prin Stripe, cea mai sigură platformă de plăți online</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-[#25B838] via-[#FF6B00] to-[#FFD700] text-white rounded-3xl p-12 md:p-16 shadow-2xl">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ești gata să începi aventura?
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              Alătură-te miilor de copii care descoperă bucuria învățării alături de Corcodușa!
              Transformă educația copilului tău într-o experiență magică și plină de culoare.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/produse"
                className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-bold rounded-2xl text-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Descoperă Materialele
                <ArrowRight className="ml-3 w-6 h-6" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold rounded-2xl text-xl hover:bg-white/30 transition-all duration-300"
              >
                Contactează-ne
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
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

export default DespreNoi;
