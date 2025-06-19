import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, ChevronUp } from 'lucide-react';

const Footer = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) { // Show button after scrolling 300px
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#20232A] text-white py-12 md:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img src="/images/logo.png" alt="Corcodușa Logo" className="h-8 w-auto" />
              <span className="text-2xl font-bold">
                <span className="text-[#20BF55]">Corcodusa</span>
                <span className="text-[#FF6B00]">.ro</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm">
              Materiale educative interactive pentru copii între 3 și 7 ani care transformă învățarea în joacă.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF6B00] transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://instagram.com/yourpage" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF6B00] transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Produse Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Produse</h3>
            <ul className="space-y-2">
              <li><Link to="/produse" className="text-gray-400 hover:text-white transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Toate produsele</Link></li>
              <li><Link to="/produse?category=alfabet" className="text-gray-400 hover:text-white transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Alfabetul în Joacă</Link></li>
              <li><Link to="/produse?category=matematica" className="text-gray-400 hover:text-white transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Matematică Distractivă</Link></li>
              <li><Link to="/produse?category=formesiculori" className="text-gray-400 hover:text-white transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Aventuri în Culori</Link></li>
              <li><Link to="/produse#pachet-complet" className="text-gray-400 hover:text-white transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Pachet Complet</Link></li>
            </ul>
          </div>

          {/* Informații Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Informații</h3>
            <ul className="space-y-2">
              <li><Link to="/despre-noi" className="text-gray-400 hover:text-white transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Despre Noi</Link></li>
              <li><Link to="/intrebari-frecvente" className="text-gray-400 hover:text-white transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Întrebări Frecvente</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Contact</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/termeni-si-conditii" className="text-gray-400 hover:text-white transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Termeni și Condiții</Link></li>
              <li><Link to="/politica-de-confidentialitate" className="text-gray-400 hover:text-white transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Politica de Confidențialitate</Link></li>
              <li><Link to="/metode-de-plata" className="text-gray-400 hover:text-white transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Metode de Plată</Link></li>
              <li><Link to="/politica-de-retur" className="text-gray-400 hover:text-white transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Politica de Retur</Link></li>
              <li><a href="https://anpc.ro" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">ANPC</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-500 text-center md:text-left mb-4 md:mb-0">
            © {new Date().getFullYear()} Corcodușa.ro. Toate drepturile rezervate.
          </p>
          <div className="flex items-center space-x-2">
            <p className="text-gray-500">Plată securizată prin</p>
            <i className="fab fa-cc-stripe text-gray-400 text-2xl"></i>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-[#FF6B00] text-white p-3 rounded-full shadow-lg hover:bg-[#E05C00] transition-colors z-50"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </footer>
  );
};

export default Footer; 