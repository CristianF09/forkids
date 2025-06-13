import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DespreNoi from './pages/DespreNoi';
import Produse from './pages/Produse';
import Contact from './pages/Contact';
import Autentificare from './pages/Autentificare';
import Inregistrare from './pages/Inregistrare';
import ContulMeu from './pages/ContulMeu';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/despre-noi" element={<DespreNoi />} />
              <Route path="/produse" element={<Produse />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/autentificare" element={<Autentificare />} />
              <Route path="/inregistrare" element={<Inregistrare />} />
              <Route path="/contul-meu" element={<ContulMeu />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 