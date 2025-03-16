import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Activity, Brain, Heart } from 'lucide-react';
import { Button } from '../components/Button';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Leaf className="h-16 w-16 text-emerald-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Balance Your Health with <span className="text-emerald-600">Ayurveda & AI!</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover your unique mind-body constitution and receive personalized wellness recommendations powered by ancient wisdom and modern technology.
          </p>
          <Button onClick={() => navigate('/connect-google-fit')}>
            Start Your Wellness Journey
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <Activity className="h-12 w-12 text-emerald-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Google Fit Integration</h3>
            <p className="text-gray-600">
              Seamlessly sync your health data to get more accurate wellness insights and recommendations.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <Brain className="h-12 w-12 text-emerald-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">AI-Driven Analysis</h3>
            <p className="text-gray-600">
              Advanced AI algorithms analyze your health patterns to determine your dosha balance.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <Heart className="h-12 w-12 text-emerald-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Personalized Care</h3>
            <p className="text-gray-600">
              Get tailored Ayurvedic recommendations based on your unique constitution and lifestyle.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};