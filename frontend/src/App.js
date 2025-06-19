import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Contact from './pages/Contact';
import TermeniSiConditii from './pages/TermeniSiConditii';
import PoliticaDeConfidentialitate from './pages/PoliticaDeConfidentialitate';
import PoliticaDeRetur from './pages/PoliticaDeRetur';
import MetodeDePlata from './pages/MetodeDePlata';
import FAQ from './components/FAQ';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/despre-noi" element={<About />} />
          <Route path="/produse" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/termeni-si-conditii" element={<TermeniSiConditii />} />
          <Route path="/politica-de-confidentialitate" element={<PoliticaDeConfidentialitate />} />
          <Route path="/politica-de-retur" element={<PoliticaDeRetur />} />
          <Route path="/metode-de-plata" element={<MetodeDePlata />} />
          <Route path="/intrebari-frecvente" element={<FAQ />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App; 