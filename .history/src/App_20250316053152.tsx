import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Settings } from './pages/Settings';
import { Recommendations } from './pages/Recommendations';
import { ArticleDetail } from './pages/ArticleDetail';
import { GoogleFitAuth } from './pages/GoogleFitAuth';
import { Chat } from './pages/Chat';
import { Dashboard } from './pages/Dashboard';
import { Insights } from './pages/Insights';
import { Marketplace } from './pages/Marketplace';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import { ContextMenu } from './components/ContextMenu';
import { BarChart2, Home as HomeIcon, Settings as SettingsIcon, BookOpen, Activity, ShoppingBag, User } from 'lucide-react';

function App() {
  const [contextMenu, setContextMenu] = useState({
    isOpen: false,
    position: { x: 0, y: 0 },
    selectedText: ''
  });

  const handleContextMenu = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    const selection = window.getSelection();
    const selectedText = selection?.toString().trim();

    if (selectedText) {
      setContextMenu({
        isOpen: true,
        position: { x: event.clientX, y: event.clientY },
        selectedText
      });
    }
  }, []);

  const closeContextMenu = useCallback(() => {
    setContextMenu(prev => ({ ...prev, isOpen: false }));
  }, []);

  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <div 
            className="flex h-screen bg-gray-50 dark:bg-black"
            onContextMenu={handleContextMenu}
          >
            <div className="w-64 h-full flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
              {/* App Logo */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <h1 className="text-xl font-bold text-emerald-600 dark:text-emerald-400">AyurHealth</h1>
              </div>

              {/* Main Navigation */}
              <nav className="flex-1 p-4 space-y-2">
                <Link
                  to="/"
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                >
                  <HomeIcon className="h-5 w-5" />
                  <span>Home</span>
                </Link>
                <Link
                  to="/insights"
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                >
                  <BarChart2 className="h-5 w-5" />
                  <span>Insights</span>
                </Link>
                <Link
                  to="/recommendations"
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Recommendations</span>
                </Link>
                <Link
                  to="/chat"
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                >
                  <Activity className="h-5 w-5" />
                  <span>Ayurveda Chat</span>
                </Link>
                <Link
                  to="/marketplace"
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span>Marketplace</span>
                </Link>
              </nav>

              {/* User Profile Section */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <Link
                  to="/profile"
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <User className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">User Profile</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">View your profile</p>
                  </div>
                </Link>
              </div>

              {/* Settings Section */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <Link
                  to="/settings"
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                >
                  <SettingsIcon className="h-5 w-5" />
                  <span>Settings</span>
                </Link>
              </div>
            </div>

            <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-black">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/recommendations" element={<Recommendations />} />
                <Route path="/article/:slug" element={<ArticleDetail />} />
                <Route path="/connect-google-fit" element={<GoogleFitAuth />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/marketplace" element={<Marketplace />} />

                {/* Catch-all route for unknown URLs */}
                <Route path="*" element={
                  <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-black text-gray-700 dark:text-gray-200">
                    <h1 className="text-6xl font-bold text-emerald-600">404</h1>
                    <p className="text-xl mt-2">Oops! Page not found.</p>
                  </div>
                } />
              </Routes>
            </main>

            <ContextMenu
              isOpen={contextMenu.isOpen}
              position={contextMenu.position}
              selectedText={contextMenu.selectedText}
              onClose={closeContextMenu}
            />
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
