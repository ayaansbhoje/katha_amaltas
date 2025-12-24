import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FilmsPage from './pages/FilmsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/film" element={<FilmsPage />} />
      </Routes>
    </Router>
  );
};

export default App;