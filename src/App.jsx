import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FiltrosCarros from './components/FiltrosCarros';
import CarDetails from './pages/CarDetails';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FiltrosCarros />} />
        <Route path="/details" element={<CarDetails />} />
      </Routes>
    </BrowserRouter>
  );
}