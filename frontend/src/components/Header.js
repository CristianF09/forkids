import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/images/logo.png" alt="Corcodusa Logo" className="h-8 w-auto" />
            <span className="text-2xl font-bold">
              <span className="text-[#20BF55]">Corcodusa</span>
              <span className="text-[#FF6B00]">.ro</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-800 hover:text-[#FF6B00] transition-colors">
              Acasă
            </Link>
            <Link to="/despre-noi" className="text-gray-800 hover:text-[#FF6B00] transition-colors">
              Despre Noi
            </Link>
            <Link to="/produse" className="text-gray-800 hover:text-[#FF6B00] transition-colors">
              Produse
            </Link>
            <Link to="/contact" className="text-gray-800 hover:text-[#FF6B00] transition-colors">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-800 hover:text-[#FF6B00] focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-800 hover:text-[#FF6B00] transition-colors"
                onClick={toggleMenu}
              >
                Acasă
              </Link>
              <Link
                to="/despre-noi"
                className="block px-3 py-2 text-gray-800 hover:text-[#FF6B00] transition-colors"
                onClick={toggleMenu}
              >
                Despre Noi
              </Link>
              <Link
                to="/produse"
                className="block px-3 py-2 text-gray-800 hover:text-[#FF6B00] transition-colors"
                onClick={toggleMenu}
              >
                Produse
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-gray-800 hover:text-[#FF6B00] transition-colors"
                onClick={toggleMenu}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header; 