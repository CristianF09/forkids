import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, ChevronDown, Gift } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-[#20BF55] to-[#01BAEF] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">
              <span className="text-[#20BF55]">Corcodușa</span>
              <span className="text-[#FF6B00]">.ro</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-bold hover:text-[#FF6B00] transition-colors">
              Acasă
            </Link>
            <Link to="/catalog" className="font-bold hover:text-[#FF6B00] transition-colors">
              Catalog
            </Link>
            <Link to="/about" className="font-bold hover:text-[#FF6B00] transition-colors">
              Despre Noi
            </Link>
            <Link to="/contact" className="font-bold hover:text-[#FF6B00] transition-colors">
              Contact
            </Link>
            {/* Promo Pack Indicator */}
            <div className="relative group">
              <button className="flex items-center space-x-1 bg-[#FF6B00] px-4 py-2 rounded-xl font-bold hover:bg-[#FF6B00]/90 transition-colors">
                <Gift className="w-5 h-5" />
                <span>Pachet Promo</span>
              </button>
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg p-4 hidden group-hover:block">
                <div className="text-gray-800">
                  <h3 className="font-bold text-lg mb-2">Pachet Complet - 89 Lei</h3>
                  <p className="text-sm text-gray-600 mb-2">Toate cele 3 cărți + Bonusuri</p>
                  <Link 
                    to="/catalog" 
                    className="block w-full bg-gradient-to-r from-[#20BF55] to-[#01BAEF] text-white text-center py-2 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Vezi Oferta
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <ShoppingCart className="w-6 h-6" />
            </Link>
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="flex items-center space-x-1 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <User className="w-6 h-6" />
                <ChevronDown className="w-4 h-4" />
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2">
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Autentificare
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Înregistrare
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-800 font-bold hover:bg-gray-100 rounded-md"
            >
              Acasă
            </Link>
            <Link
              to="/catalog"
              className="block px-3 py-2 text-gray-800 font-bold hover:bg-gray-100 rounded-md"
            >
              Catalog
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-gray-800 font-bold hover:bg-gray-100 rounded-md"
            >
              Despre Noi
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-gray-800 font-bold hover:bg-gray-100 rounded-md"
            >
              Contact
            </Link>
            <Link
              to="/cart"
              className="block px-3 py-2 text-gray-800 font-bold hover:bg-gray-100 rounded-md"
            >
              Coș
            </Link>
            <Link
              to="/login"
              className="block px-3 py-2 text-gray-800 font-bold hover:bg-gray-100 rounded-md"
            >
              Autentificare
            </Link>
            <Link
              to="/register"
              className="block px-3 py-2 text-gray-800 font-bold hover:bg-gray-100 rounded-md"
            >
              Înregistrare
            </Link>
            {/* Mobile Promo Pack */}
            <div className="px-3 py-2">
              <Link
                to="/catalog"
                className="flex items-center space-x-2 bg-[#FF6B00] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#FF6B00]/90 transition-colors"
              >
                <Gift className="w-5 h-5" />
                <span>Pachet Promo - 89 Lei</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 