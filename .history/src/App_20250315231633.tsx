import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Settings } from './pages/Settings';
import { Recommendations } from './pages/Recommendations';
import { GoogleFitAuth } from './pages/GoogleFitAuth';
import { Chat } from './pages/Chat';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/connect-google-fit" element={<GoogleFitAuth />} />
          <Route path="/chat" element={<Chat />} />

          {/* Catch-all route for unknown URLs */}
          <Route path="*" element={
            <div className="h-screen flex flex-col items-center justify-center bg-white text-gray-700">
              <h1 className="text-6xl font-bold text-emerald-600">404</h1>
              <p className="text-xl mt-2">Oops! Page not found.</p>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
