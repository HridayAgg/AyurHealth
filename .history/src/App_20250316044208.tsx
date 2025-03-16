import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Settings } from './pages/Settings';
import { Recommendations } from './pages/Recommendations';
import { ArticleDetail } from './pages/ArticleDetail';
import { GoogleFitAuth } from './pages/GoogleFitAuth';
import { Chat } from './pages/Chat';
import { Dashboard } from './pages/Dashboard';
import { Insights } from './pages/Insights';
import { ThemeProvider } from './contexts/ThemeContext';
import { Sidebar } from './components/Sidebar';
import { BarChart2, Home as HomeIcon, Settings as SettingsIcon, BookOpen, Activity } from 'lucide-react';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex h-screen bg-gray-50 dark:bg-black">
          <Sidebar>
            <Link
              to="/"
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors duration-200"
            >
              <HomeIcon className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link
              to="/insights"
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors duration-200"
            >
              <BarChart2 className="h-5 w-5" />
              <span>Insights</span>
            </Link>
            <Link
              to="/recommendations"
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors duration-200"
            >
              <BookOpen className="h-5 w-5" />
              <span>Recommendations</span>
            </Link>
            <Link
              to="/chat"
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors duration-200"
            >
              <Activity className="h-5 w-5" />
              <span>Ayurveda Chat</span>
            </Link>
            <Link
              to="/settings"
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors duration-200"
            >
              <SettingsIcon className="h-5 w-5" />
              <span>Settings</span>
            </Link>
          </Sidebar>

          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-black">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/article/:slug" element={<ArticleDetail />} />
              <Route path="/connect-google-fit" element={<GoogleFitAuth />} />
              <Route path="/chat" element={<Chat />} />

              {/* Catch-all route for unknown URLs */}
              <Route path="*" element={
                <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-black text-gray-700 dark:text-gray-200">
                  <h1 className="text-6xl font-bold text-emerald-600">404</h1>
                  <p className="text-xl mt-2">Oops! Page not found.</p>
                </div>
              } />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
