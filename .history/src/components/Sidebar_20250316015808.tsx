import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface SidebarProps {
  children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="w-64 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="p-4">
        <h1 className="text-xl font-bold text-emerald-600 dark:text-emerald-400">AyurHealth</h1>
      </div>
      
      <nav className="mt-4 space-y-2 px-2">
        {children}
      </nav>

      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={toggleTheme}
          className="flex items-center space-x-2 w-full px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
        >
          {theme === 'dark' ? (
            <>
              <Sun className="h-5 w-5" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="h-5 w-5" />
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}; 