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
              <a href="https://www.facebook.com/corcodusa.ro" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF6B00] transition-colors" aria-label="Facebook">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/corcodusa.ro/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF6B00] transition-colors" aria-label="Instagram">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://www.tiktok.com/@corcodusa.ro1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF6B00] transition-colors" aria-label="TikTok">
                <img src="/images/stripe-circle-round-blue-logo-19777.png" alt="TikTok" className="w-6 h-6" />
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
            <span style={{ display: 'inline-flex', alignItems: 'center', height: '24px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 90 90"><g><circle cx="45" cy="45" r="45" fill="#635bff"/><path d="M75 45.417c0-4.267-2.067-7.633-6.017-7.633-3.967 0-6.367 3.367-6.367 7.6 0 5.017 2.833 7.55 6.9 7.55 1.983 0 3.483-.45 4.617-1.083v-3.333C73 49.083 71.7 49.433 70.05 49.433c-1.617 0-3.05-.567-3.233-2.533h8.15c0-.217.033-1.083.033-1.483zM66.767 43.833c0-1.883 1.15-2.667 2.2-2.667 1.017 0 2.1.783 2.1 2.667h-4.3z" fill="#f9f9f9"/><path d="M56.183 37.783c-1.633 0-2.683.767-3.267 1.3l-.217-1.033h-3.667v19.433l4.167-.833.017-4.717c.6.433 1.483 1.05 2.95 1.05 2.983 0 5.7-2.4 5.7-7.683 0-5.017-2.75-7.65-5.667-7.65zm-1 11.484c-.983 0-1.567-.35-1.967-.783l-.017-6.184c.433-.483 1.033-.817 1.983-.817 1.517 0 2.567 1.7 2.567 3.883 0 2.218-1.033 3.883-2.566 3.883z" fill="#f9f9f9"/><polygon points="43.3,36.8 47.48,35.9 47.48,32.52 43.3,33.4" fill="#f9f9f9"/><rect x="43.3" y="38.07" width="4.18" height="14.58" fill="#f9f9f9"/><path d="M38.817 39.3l-.267-1.233h-3.6V52.65h4.167v-9.883c.983-1.283 2.65-1.05 3.167-.867v-3.833c-1.534.1-3.484-.267-4.467 1.533z" fill="#f9f9f9"/><path d="M30.483 34.45l-4.067.867-.017 13.35c0 2.467 1.85 4.283 4.317 4.283 1.367 0 2.367-.25 2.917-.55v-3.383c-.534.866-3.167 1.633-3.167-.834v-5.917h3.167v-3.55h-3.167l-.001-4.566z" fill="#f9f9f9"/><path d="M19.217 42.3c0-.65.533-.9 1.417-.9 1.267 0 2.867.383 4.133 1.067V38.55c-1.383-.55-2.75-.767-4.133-.767-2.017 0-4.267 1.767-4.267 4.717 0 4.6 6.333 3.867 6.333 5.85 0 .767-.667 1.017-1.6 1.017-1.383 0-3.15-.567-4.55-1.333V52c1.55.667 3.117.95 4.55.95 3.467 0 5.85-1.717 5.85-4.7 0-4.967-6.35-4.083-6.35-5.95z" fill="#f9f9f9"/></g></svg>
            </span>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-[#FF6B00] text-white p-3 rounded-full shadow-lg hover:bg-[#E05C00] transition-colors z-50"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </footer>
  );
};

export default Footer; 