import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/90 backdrop-blur-md fixed w-full z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <img
                className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
                src="/images/logo.png"
                alt="Corcodușa Logo"
              />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-[#ff5c18] to-[#16610E] bg-clip-text text-transparent">
                Corcodușa
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              to="/" 
              className="relative text-gray-700 hover:text-[#ff5c18] px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 hover:bg-orange-50 group"
            >
              <span>Acasă</span>
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#ff5c18] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link 
              to="/produse" 
              className="relative text-gray-700 hover:text-[#ff5c18] px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 hover:bg-orange-50 group"
            >
              <span>Produse</span>
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#ff5c18] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link to="/despre" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Despre Noi
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#ff5c18] focus:outline-none transition-colors duration-300"
              aria-label="Deschide meniul"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`
        md:hidden fixed inset-x-0 top-20 bg-white/90 backdrop-blur-md transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
      `}>
        <div className="px-4 pt-2 pb-3 space-y-1">
          <Link 
            to="/" 
            className="text-gray-700 hover:text-[#ff5c18] hover:bg-orange-50 block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            Acasă
          </Link>
          <Link 
            to="/produse" 
            className="text-gray-700 hover:text-[#ff5c18] hover:bg-orange-50 block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            Produse
          </Link>
          <Link 
            to="/despre" 
            className="text-gray-700 hover:text-[#ff5c18] hover:bg-orange-50 block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            Despre Noi
          </Link>
          <Link 
            to="/contact" 
            className="text-gray-700 hover:text-[#ff5c18] hover:bg-orange-50 block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 