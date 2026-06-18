import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Predict from './pages/Predict';
import Performance from './pages/Performance';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/performance" element={<Performance />} />
      </Routes>
    </Router>
  );
}

export default App;
