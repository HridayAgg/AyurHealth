import React, { useState } from 'react';
import { Activity, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../components/Button';

export const GoogleFitAuth: React.FC = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleGoogleFitConnect = async () => {
    setIsConnecting(true);
    try {
      // Google Fit API integration will go here
      // For now, simulating the connection process
      await new Promise(resolve => setTimeout(resolve, 2000));
      setConnectionStatus('success');
    } catch (error) {
      setConnectionStatus('error');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Activity className="h-16 w-16 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Connect Google Fit</h1>
          <p className="text-gray-600">
            Link your Google Fit account to get personalized Ayurvedic insights based on your health data.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">We'll sync:</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Heart rate data</li>
              <li>• Sleep patterns</li>
              <li>• Activity levels</li>
              <li>• Step count</li>
            </ul>
          </div>

          {connectionStatus === 'success' && (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-lg">
              <CheckCircle className="h-5 w-5" />
              <span>Successfully connected to Google Fit!</span>
            </div>
          )}

          {connectionStatus === 'error' && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
              <XCircle className="h-5 w-5" />
              <span>Failed to connect. Please try again.</span>
            </div>
          )}

          <Button
            onClick={handleGoogleFitConnect}
            disabled={isConnecting || connectionStatus === 'success'}
            className="w-full"
          >
            {isConnecting ? 'Connecting...' : 'Connect Google Fit'}
          </Button>

          <p className="text-sm text-gray-500 text-center">
            By connecting, you agree to share your Google Fit data with AyurHealth for personalized recommendations.
          </p>
        </div>
      </div>
    </div>
  );
};