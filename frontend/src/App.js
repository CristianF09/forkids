import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Home from './pages/Home';
import DespreNoi from './pages/DespreNoi';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
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
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function waitForBackend() {
      const fallbackTimer = setTimeout(() => {
        if (!cancelled) {
          setIsLoading(false);
          setIsInitialLoad(false);
        }
      }, 1500); // Increased to 1.5s to ensure smooth animation

      try {
        const apiBase = process.env.REACT_APP_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:10000' : 'https://api.corcodusa.ro');
        const deadline = Date.now() + 5000; // reduced to 5s for better UX

        while (!cancelled && Date.now() < deadline) {
          try {
            const res = await fetch(`${apiBase}/api/health`, { 
              cache: 'no-store',
              headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
              }
            });
            if (res.ok) {
              clearTimeout(fallbackTimer);
              if (!cancelled) {
                setIsLoading(false);
                setIsInitialLoad(false);
              }
              return;
            }
          } catch (_) {
            // ignore and retry
          }
          await new Promise(r => setTimeout(r, 300)); // reduced retry interval
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
          setIsInitialLoad(false);
        }
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
          <Route path="/produse/:category" element={<Products />} />
          <Route path="/produs/:productId" element={<ProductDetail />} />
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
