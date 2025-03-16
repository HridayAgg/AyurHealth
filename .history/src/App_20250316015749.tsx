import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Settings } from './pages/Settings';
import { Recommendations } from './pages/Recommendations';
import { ArticleDetail } from './pages/ArticleDetail';
import { GoogleFitAuth } from './pages/GoogleFitAuth';
import { Chat } from './pages/Chat';
import { ThemeProvider } from './contexts/ThemeContext';
import { Dashboard } from './pages/Dashboard';
import { Insights } from './pages/Insights';
import { Sidebar } from './components/Sidebar';
import { BarChart2 } from 'lucide-react';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
          <Sidebar>
            <Link
              to="/"
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
            >
              <span>Dashboard</span>
            </Link>
            <Link
              to="/insights"
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
            >
              <BarChart2 className="h-5 w-5" />
              <span>Insights</span>
            </Link>
          </Sidebar>

          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/insights" element={<Insights />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
