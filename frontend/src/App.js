import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Autentificare from './pages/Autentificare';
import Inregistrare from './pages/Inregistrare';
import ContulMeu from './pages/ContulMeu';
import TermeniSiConditii from './pages/TermeniSiConditii';
import PoliticaDeConfidentialitate from './pages/PoliticaDeConfidentialitate';
import PoliticaDeRetur from './pages/PoliticaDeRetur';
import MetodeDePlata from './pages/MetodeDePlata';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/despre" element={<About />} />
              <Route path="/produse" element={<Products />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/autentificare" element={<Autentificare />} />
              <Route path="/inregistrare" element={<Inregistrare />} />
              <Route path="/contul-meu" element={<ContulMeu />} />
              <Route path="/termeni-si-conditii" element={<TermeniSiConditii />} />
              <Route path="/politica-de-confidentialitate" element={<PoliticaDeConfidentialitate />} />
              <Route path="/politica-de-retur" element={<PoliticaDeRetur />} />
              <Route path="/metode-de-plata" element={<MetodeDePlata />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 