import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white text-gray-700">
      <h1 className="text-6xl font-bold text-emerald-600">404</h1>
      <p className="text-xl mt-2">Oops! Page not found.</p>
      <Link 
        to="/" 
        className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
      >
        Go Home
      </Link>
    </div>
  );
};
