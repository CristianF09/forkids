import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Home from './pages/Home';
import DespreNoi from './pages/DespreNoi';
import Products from './pages/Products';
import Contact from './pages/Contact';
import TermeniSiConditii from './pages/TermeniSiConditii';
import PoliticaDeConfidentialitate from './pages/PoliticaDeConfidentialitate';
import PoliticaDeRetur from './pages/PoliticaDeRetur';
import MetodeDePlata from './pages/MetodeDePlata';
import FAQ from './components/FAQ';
import Success from './pages/Success';
import Cancel from './pages/Cancel';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function waitForBackend() {
      // Fast path: stop loader after 1.2s if backend is already up
      const fallbackTimer = setTimeout(() => {
        if (!cancelled) setIsLoading(false);
      }, 1200);

      try {
        const apiBase = process.env.REACT_APP_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:10000' : 'https://corcodusa.ro');
        const deadline = Date.now() + 7000; // up to 7s wait

        while (!cancelled && Date.now() < deadline) {
          try {
            const res = await fetch(`${apiBase}/api/health`, { cache: 'no-store' });
            if (res.ok) {
              clearTimeout(fallbackTimer);
              if (!cancelled) setIsLoading(false);
              return;
            }
          } catch (_) {
            // ignore and retry
          }
          await new Promise(r => setTimeout(r, 400));
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    waitForBackend();
    return () => { cancelled = true; };
  }, []);

if (isLoading) return <Loader title="Corcodusa.ro" subtitle="Se încarcă..." />;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/despre-noi" element={<DespreNoi />} />
          <Route path="/produse" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/termeni-si-conditii" element={<TermeniSiConditii />} />
          <Route path="/politica-de-confidentialitate" element={<PoliticaDeConfidentialitate />} />
          <Route path="/politica-de-retur" element={<PoliticaDeRetur />} />
          <Route path="/metode-de-plata" element={<MetodeDePlata />} />
          <Route path="/intrebari-frecvente" element={<FAQ />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
