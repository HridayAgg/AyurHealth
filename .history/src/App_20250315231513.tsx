import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { NotFound } from './pages/NotFound';

const Home = lazy(() => import('./pages/Home'));
const Settings = lazy(() => import('./pages/Settings'));
const Recommendations = lazy(() => import('./pages/Recommendations'));
const GoogleFitAuth = lazy(() => import('./pages/GoogleFitAuth'));
const Chat = lazy(() => import('./pages/Chat'));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Suspense
          fallback={
            <div className="h-screen flex items-center justify-center text-emerald-600 text-2xl">
              Loading...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/connect-google-fit" element={<GoogleFitAuth />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
