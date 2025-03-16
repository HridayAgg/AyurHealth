import React from 'react';
import { AyurvedaChat } from '../components/AyurvedaChat';

export const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Ayurvedic Health Assistant
        </h1>
        <div className="h-[calc(100vh-8rem)]">
          <AyurvedaChat />
        </div>
      </div>
    </div>
  );
}; 