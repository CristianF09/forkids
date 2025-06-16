import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin, BookOpen, Heart, Star } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#20BF55] to-[#01BAEF] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Star className="w-6 h-6 text-white" />
              <h3 className="text-xl font-bold">Despre Noi</h3>
            </div>
            <p className="text-white/90">
              Corcodușa este locul unde educația devine o aventură plină de bucurie și descoperiri pentru copiii tăi.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                 className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                 className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-6 h-6 text-white" />
              <h3 className="text-xl font-bold">Link-uri Rapide</h3>
            </div>
            <ul className="space-y-2">
              <li>
                <Link to="/catalog" className="text-white/90 hover:text-white transition-colors">
                  Catalog
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/90 hover:text-white transition-colors">
                  Despre Noi
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/90 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/termeni-si-conditii" className="text-white/90 hover:text-white transition-colors">
                  Termeni & Condiții
                </Link>
              </li>
              <li>
                <Link to="/politica-de-confidentialitate" className="text-white/90 hover:text-white transition-colors">
                  Politica de Confidențialitate
                </Link>
              </li>
              <li>
                <Link to="/politica-de-retur" className="text-white/90 hover:text-white transition-colors">
                  Politica de Retur
                </Link>
              </li>
              <li>
                <Link to="/metode-de-plata" className="text-white/90 hover:text-white transition-colors">
                  Metode de Plată
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-white" />
              <h3 className="text-xl font-bold">Contact</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 mt-1" />
                <span>contact@corcodusa.ro</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 mt-1" />
                <span>+40 755 123 456</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-1" />
                <span>București, România</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Newsletter</h3>
            <p className="text-white/90">
              Abonează-te la newsletter pentru a primi ultimele noutăți și oferte speciale.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Adresa ta de email"
                className="w-full px-4 py-2 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button
                type="submit"
                className="w-full bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl transition-colors"
              >
                Abonează-te
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/80">
              © {new Date().getFullYear()} Corcodușa. Toate drepturile rezervate.
            </p>
            <div className="flex space-x-6">
              <Link to="/termeni-si-conditii" className="text-white/80 hover:text-white transition-colors">
                Termeni & Condiții
              </Link>
              <Link to="/politica-de-confidentialitate" className="text-white/80 hover:text-white transition-colors">
                Politica de Confidențialitate
              </Link>
              <Link to="/politica-de-retur" className="text-white/80 hover:text-white transition-colors">
                Politica de Retur
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 