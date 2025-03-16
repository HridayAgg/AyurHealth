import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, User, Moon } from 'lucide-react';
import { Button } from '../components/Button';
import { useTheme } from '../contexts/ThemeContext';

export const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2 text-gray-900 dark:text-white">
        <SettingsIcon className="h-8 w-8" />
        Settings
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
          <User className="h-5 w-5 text-emerald-600" />
          Profile Information
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date of Birth</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
          <Bell className="h-5 w-5 text-emerald-600" />
          Notifications
        </h2>
        <div className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-300">Enable notifications</span>
          <button
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notifications ? 'bg-emerald-600' : 'bg-gray-300 dark:bg-gray-600'
            }`}
            onClick={() => setNotifications(!notifications)}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notifications ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
          <Moon className="h-5 w-5 text-emerald-600" />
          Appearance
        </h2>
        <div className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
          <button
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              darkMode ? 'bg-emerald-600' : 'bg-gray-300 dark:bg-gray-600'
            }`}
            onClick={toggleDarkMode}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                darkMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
          <Shield className="h-5 w-5 text-emerald-600" />
          Privacy
        </h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <input type="checkbox" id="shareData" className="mr-2" />
            <label htmlFor="shareData" className="text-gray-700 dark:text-gray-300">Share anonymous data for research</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="publicProfile" className="mr-2" />
            <label htmlFor="publicProfile" className="text-gray-700 dark:text-gray-300">Make profile public</label>
          </div>
        </div>
      </div>

      <Button className="w-full">Save Changes</Button>
    </div>
  );
};