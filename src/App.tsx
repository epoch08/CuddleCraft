import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { SoundProvider } from './contexts/SoundContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Customize from './pages/Customize';
import ShoppingCart from './components/ShoppingCart';

function App() {
  return (
    <SoundProvider>
      <CartProvider>
        <Router>
          <div className="app">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/customize" element={<Customize />} />
              </Routes>
            </main>
            <ShoppingCart />
          </div>
        </Router>
      </CartProvider>
    </SoundProvider>
  );
}

export default App;