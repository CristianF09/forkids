import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';

const Footer = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const location = useLocation();

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

  const scrollToTopWithOffset = () => {
    // Scroll to top with a small offset to ensure page title is visible below fixed header
    window.scrollTo({ top: 20, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#20232A] text-white py-12 md:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2" onClick={scrollToTopWithOffset}>
              <img src="/images/Icon.png" alt="Corcodușa Logo" className="h-8 w-auto" />
              <span className="text-2xl font-bold">
                <span className="text-[#20BF55]">Corcodusa</span>
                <span className="text-[#FF6B00]">.ro</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Materiale educative interactive pentru copii între 3 și 7 ani care transformă învățarea în joacă.
            </p>
            <div className="flex space-x-8">
              <a
                href="https://www.facebook.com/corcodusa.ro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#FF6B00] transition-colors"
                aria-label="Urmărește-ne pe Facebook"
              >
                <img src="/images/iconfacebook.svg" alt="Facebook" className="w-14 h-14" />
              </a>
              <a
                href="https://www.instagram.com/corcodusa.ro/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#FF6B00] transition-colors"
                aria-label="Urmărește-ne pe Instagram"
              >
                <img src="/images/iconinstagram.svg" alt="Instagram" className="w-14 h-14" />
              </a>
              <a
                href="https://www.tiktok.com/@corcodusa.ro1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#FF6B00] transition-colors"
                aria-label="Urmărește-ne pe TikTok"
              >
                <img src="/images/icontiktok.svg" alt="TikTok" className="w-14 h-14" />
              </a>
            </div>
          </div>

          {/* Produse Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Produse</h3>
            <ul className="space-y-2">
              <li><Link to="/produse#products" className="text-gray-400 hover:text-white transition-colors">Toate produsele</Link></li>
              <li><Link to="/produse/alfabet#products" className="text-gray-400 hover:text-white transition-colors">Alfabetul în Joacă</Link></li>
              <li><Link to="/produse/numere#products" className="text-gray-400 hover:text-white transition-colors">Matematică Distractivă</Link></li>
              <li><Link to="/produse/forme-si-culori#products" className="text-gray-400 hover:text-white transition-colors">Aventuri în Culori</Link></li>
              <li><Link to="/produse#pachete-educative" className="text-gray-400 hover:text-white transition-colors">Pachete Educative</Link></li>
            </ul>
          </div>

          {/* Informații Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Informații</h3>
            <ul className="space-y-2">
              <li><Link to="/despre-noi" className="text-gray-400 hover:text-white transition-colors" onClick={scrollToTopWithOffset}>Despre Noi</Link></li>
              <li>
                {location.pathname === '/' ? (
                  <button
                    onClick={() => document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-gray-400 hover:text-white transition-colors text-left"
                  >
                    Întrebări Frecvente
                  </button>
                ) : (
                  <Link to="/intrebari-frecvente" className="text-gray-400 hover:text-white transition-colors" onClick={scrollToTopWithOffset}>
                    Întrebări Frecvente
                  </Link>
                )}
              </li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors" onClick={scrollToTopWithOffset}>Contact</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/termeni-si-conditii" className="text-gray-400 hover:text-white transition-colors" onClick={scrollToTopWithOffset}>Termeni și Condiții</Link></li>
              <li><Link to="/politica-de-confidentialitate" className="text-gray-400 hover:text-white transition-colors" onClick={scrollToTopWithOffset}>Politica de Confidențialitate</Link></li>
              <li><Link to="/metode-de-plata" className="text-gray-400 hover:text-white transition-colors" onClick={scrollToTopWithOffset}>Metode de Plată</Link></li>
              <li><Link to="/politica-de-retur" className="text-gray-400 hover:text-white transition-colors" onClick={scrollToTopWithOffset}>Politica de Retur</Link></li>
              <li className="pt-2">
                <div>
                  <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener noreferrer nofollow" className="inline-block">
                    <img 
                      className="w-[250px] m-[5px]"
                      src="https://wpfitness.eu/wp-content/uploads/2022/10/anpc-sal.png" 
                      alt="Solutionarea Alternativa a Litigiilor"
                    />
                  </a>
                  <br/>
                  <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer nofollow" className="inline-block">
                    <img 
                      className="w-[250px] m-[5px]"
                      src="https://wpfitness.eu/wp-content/uploads/2022/10/anpc-sol.png" 
                      alt="Solutionarea Online a Litigiilor"
                    />
                  </a>
                </div>
              </li>
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
            <img src="/images/iconstripe.png" alt="Stripe" />
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
