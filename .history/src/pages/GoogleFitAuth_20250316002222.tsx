import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '../components/Button';
import GoogleFitService from '../services/googleFit';

export const GoogleFitAuth: React.FC = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeGoogleFit = async () => {
      try {
        console.log('Checking Google Fit connection status...');
        const isSignedIn = GoogleFitService.getInstance().isSignedIn();
        console.log('Is signed in:', isSignedIn);
        if (isSignedIn) {
          setConnectionStatus('success');
        }
      } catch (error) {
        console.error('Error checking Google Fit status:', error);
        setErrorMessage('Failed to initialize Google Fit connection');
        setConnectionStatus('error');
      } finally {
        setIsLoading(false);
      }
    };

    initializeGoogleFit();
  }, []);

  const handleGoogleFitConnect = async () => {
    setIsConnecting(true);
    setErrorMessage('');
    
    try {
      console.log('Attempting to sign in to Google Fit...');
      await GoogleFitService.getInstance().signIn();
      console.log('Successfully signed in to Google Fit');
      setConnectionStatus('success');
      
      // Fetch initial data
      const now = Date.now();
      const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
      
      console.log('Fetching initial data...');
      // Fetch activity and heart rate data in parallel
      await Promise.all([
        GoogleFitService.getInstance().fetchActivityData(weekAgo, now),
        GoogleFitService.getInstance().fetchHeartRateData(weekAgo, now)
      ]);
      console.log('Successfully fetched initial data');

      // Redirect to dashboard after successful connection
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Failed to connect to Google Fit:', error);
      setConnectionStatus('error');
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : 'Failed to connect to Google Fit. Please make sure you have allowed pop-ups and try again.'
      );
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    setIsConnecting(true);
    try {
      console.log('Attempting to disconnect from Google Fit...');
      await GoogleFitService.getInstance().signOut();
      console.log('Successfully disconnected from Google Fit');
      setConnectionStatus('idle');
    } catch (error) {
      console.error('Failed to disconnect from Google Fit:', error);
      setErrorMessage('Failed to disconnect from Google Fit');
    } finally {
      setIsConnecting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Activity className="h-16 w-16 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Connect Google Fit</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Link your Google Fit account to get personalized Ayurvedic insights based on your health data.
          </p>
          {import.meta.env.VITE_GOOGLE_FIT_CLIENT_ID ? null : (
            <div className="mt-4 text-red-600 dark:text-red-400 text-sm">
              Warning: Google Fit Client ID is not configured. Please check your environment variables.
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">We'll sync:</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>• Heart rate data</li>
              <li>• Sleep patterns</li>
              <li>• Activity levels</li>
              <li>• Step count</li>
            </ul>
          </div>

          {connectionStatus === 'success' && (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <CheckCircle className="h-5 w-5" />
              <span className="dark:text-green-400">Successfully connected to Google Fit!</span>
            </div>
          )}

          {connectionStatus === 'error' && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <XCircle className="h-5 w-5" />
              <span className="dark:text-red-400">
                {errorMessage || 'Failed to connect. Please try again.'}
              </span>
            </div>
          )}

          {connectionStatus === 'success' ? (
            <Button
              onClick={handleDisconnect}
              disabled={isConnecting}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              {isConnecting ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Disconnecting...
                </div>
              ) : (
                'Disconnect Google Fit'
              )}
            </Button>
          ) : (
            <Button
              onClick={handleGoogleFitConnect}
              disabled={isConnecting || !import.meta.env.VITE_GOOGLE_FIT_CLIENT_ID}
              className="w-full"
            >
              {isConnecting ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Connecting...
                </div>
              ) : (
                'Connect Google Fit'
              )}
            </Button>
          )}

          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            By connecting, you agree to share your Google Fit data with AyurHealth for personalized recommendations.
          </p>
        </div>
      </div>
    </div>
  );
};