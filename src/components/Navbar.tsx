import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, MessageCircle } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-emerald-600" />
              <span className="text-xl font-bold text-emerald-600">AyurHealth</span>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/dashboard" className="text-gray-600 hover:text-emerald-600">Dashboard</Link>
            <Link to="/recommendations" className="text-gray-600 hover:text-emerald-600">Recommendations</Link>
            <Link to="/chat" className="text-gray-600 hover:text-emerald-600 flex items-center gap-1">
              <MessageCircle className="h-5 w-5" />
              AyurBot
            </Link>
            <Link to="/insights" className="text-gray-600 hover:text-emerald-600">Insights</Link>
            <Link to="/settings" className="text-gray-600 hover:text-emerald-600">Settings</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};