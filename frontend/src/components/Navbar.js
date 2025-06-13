import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="bg-primary shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="h-12 w-auto"
                src="../images/img1"
                alt="Corcodușa Logo"
              />
              <span className="ml-3 text-white text-xl font-bold">Corcodușa</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-white hover:text-accent px-3 py-2 rounded-md text-sm font-medium">
              Acasă
            </Link>
            <Link to="/produse" className="text-white hover:text-accent px-3 py-2 rounded-md text-sm font-medium">
              Produse
            </Link>
            <Link to="/despre" className="text-white hover:text-accent px-3 py-2 rounded-md text-sm font-medium">
              Despre Noi
            </Link>
            <Link to="/contact" className="text-white hover:text-accent px-3 py-2 rounded-md text-sm font-medium">
              Contact
            </Link>
            {user ? (
              <>
                <Link to="/contul-meu" className="text-white hover:text-accent px-3 py-2 rounded-md text-sm font-medium">
                  Contul Meu
                </Link>
                <button
                  onClick={logout}
                  className="bg-secondary hover:bg-accent text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Deconectare
                </button>
              </>
            ) : (
              <>
                <Link to="/autentificare" className="text-white hover:text-accent px-3 py-2 rounded-md text-sm font-medium">
                  Autentificare
                </Link>
                <Link to="/inregistrare" className="bg-secondary hover:bg-accent text-white px-4 py-2 rounded-md text-sm font-medium">
                  Înregistrare
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-accent focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-white hover:text-accent block px-3 py-2 rounded-md text-base font-medium">
              Acasă
            </Link>
            <Link to="/produse" className="text-white hover:text-accent block px-3 py-2 rounded-md text-base font-medium">
              Produse
            </Link>
            <Link to="/despre" className="text-white hover:text-accent block px-3 py-2 rounded-md text-base font-medium">
              Despre Noi
            </Link>
            <Link to="/contact" className="text-white hover:text-accent block px-3 py-2 rounded-md text-base font-medium">
              Contact
            </Link>
            {user ? (
              <>
                <Link to="/contul-meu" className="text-white hover:text-accent block px-3 py-2 rounded-md text-base font-medium">
                  Contul Meu
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left bg-secondary hover:bg-accent text-white px-3 py-2 rounded-md text-base font-medium"
                >
                  Deconectare
                </button>
              </>
            ) : (
              <>
                <Link to="/autentificare" className="text-white hover:text-accent block px-3 py-2 rounded-md text-base font-medium">
                  Autentificare
                </Link>
                <Link to="/inregistrare" className="bg-secondary hover:bg-accent text-white block px-3 py-2 rounded-md text-base font-medium">
                  Înregistrare
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 