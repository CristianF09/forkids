import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navItems = [
    { to: '/', label: 'Acasă' },
    { to: '/despre-noi', label: 'Despre Noi' },
    { to: '/produse', label: 'Produse' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
        : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#20BF55] to-[#FF6B00] rounded-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <img
                src="/images/logo.png"
                alt="Corcodusa Logo"
                className="relative h-10 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold leading-tight">
                <span className="text-[#20BF55] group-hover:text-[#22c55e] transition-colors duration-300">Corcodusa</span>
                <span className="text-[#FF6B00] group-hover:text-[#ea580c] transition-colors duration-300">.ro</span>
              </span>
              <div className="flex items-center text-xs text-gray-500">
                <BookOpen className="w-3 h-3 mr-1" />
                <span>Educație distractivă</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  location.pathname === item.to
                    ? 'text-[#FF6B00] bg-[#FF6B00]/10'
                    : 'text-gray-700 hover:text-[#FF6B00] hover:bg-[#FF6B00]/5'
                }`}
              >
                <span>{item.label}</span>
                {location.pathname === item.to && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#FF6B00] rounded-full"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="relative p-2 rounded-lg text-gray-700 hover:text-[#FF6B00] hover:bg-[#FF6B00]/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20"
              aria-label="Deschide meniul"
            >
              <div className="relative w-6 h-6">
                <Menu className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`} />
                <X className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-2 pt-2 pb-4 space-y-1 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100">
            {navItems.map((item, index) => (
              <Link
                key={item.to}
                to={item.to}
                className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  location.pathname === item.to
                    ? 'text-[#FF6B00] bg-[#FF6B00]/10 border border-[#FF6B00]/20'
                    : 'text-gray-700 hover:text-[#FF6B00] hover:bg-[#FF6B00]/5'
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both'
                }}
                onClick={toggleMenu}
              >
                <span>{item.label}</span>
                {location.pathname === item.to && (
                  <div className="w-2 h-2 bg-[#FF6B00] rounded-full ml-auto"></div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
