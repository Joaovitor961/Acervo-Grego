import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import GodsList from './pages/GodsList';
import GodDetail from './pages/GodDetail';
import HeroesList from './pages/HeroesList';
import HeroDetail from './pages/HeroDetail';

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <main className="flex-fill container py-4">
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/gods" element={<GodsList />} />
          <Route path="/gods/:id" element={<GodDetail />} />
          <Route path="/heroes" element={<HeroesList />} />
          <Route path="/heroes/:id" element={<HeroDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
