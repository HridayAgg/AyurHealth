import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, CheckCircle, XCircle, Loader2, Shield, Database } from 'lucide-react';
import { Button } from '../components/Button';

// Simulated connection steps
const CONNECTION_STEPS = [
  { id: 'auth', label: 'Authenticating with Google Fit...', duration: 1500 },
  { id: 'permissions', label: 'Requesting data access permissions...', duration: 1000 },
  { id: 'sync', label: 'Syncing health data...', duration: 2000 },
  { id: 'process', label: 'Processing Ayurvedic insights...', duration: 1500 },
];

export const GoogleFitAuth: React.FC = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'success' | 'error'>('idle');
  const [currentStep, setCurrentStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  // Simulate the connection process
  const simulateConnectionSteps = async () => {
    setIsConnecting(true);
    setConnectionStatus('connecting');
    
    try {
      // Process each connection step
      for (let i = 0; i < CONNECTION_STEPS.length; i++) {
        setCurrentStep(i);
        await new Promise(resolve => setTimeout(resolve, CONNECTION_STEPS[i].duration));
      }
      
      // Connection successful
      setConnectionStatus('success');
      
      // Redirect to insights after a brief delay
      setTimeout(() => {
        navigate('/insights');
      }, 1500);
    } catch (error) {
      setConnectionStatus('error');
      setErrorMessage('Failed to connect. Please try again.');
    }
  };

  const handleGoogleFitConnect = () => {
    simulateConnectionSteps();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
      <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 p-8 rounded-xl shadow-lg max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Activity className="h-16 w-16 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Connect Google Fit</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Link your Google Fit account to get personalized Ayurvedic insights based on your health data.
          </p>
        </div>

        <div className="space-y-4">
          {/* Data sync information */}
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
              <Database className="h-4 w-4" />
              We'll sync:
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>• Heart rate data</li>
              <li>• Sleep patterns</li>
              <li>• Activity levels</li>
              <li>• Step count</li>
            </ul>
          </div>

          {/* Connection progress */}
          {connectionStatus === 'connecting' && (
            <div className="space-y-4">
              {CONNECTION_STEPS.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border ${
                    index === currentStep
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                      : index < currentStep
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800'
                      : 'bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-800'
                  }`}
                >
                  {index === currentStep ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : index < currentStep ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-current" />
                  )}
                  <span>{step.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Success message */}
          {connectionStatus === 'success' && (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <CheckCircle className="h-5 w-5" />
              <span className="dark:text-green-400">Successfully connected to Google Fit!</span>
            </div>
          )}

          {/* Error message */}
          {connectionStatus === 'error' && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
              <XCircle className="h-5 w-5" />
              <span className="dark:text-red-400">{errorMessage}</span>
            </div>
          )}

          {/* Connect button */}
          {connectionStatus === 'idle' && (
            <Button
              onClick={handleGoogleFitConnect}
              disabled={isConnecting}
              className="w-full"
            >
              Connect Google Fit
            </Button>
          )}

          {/* Privacy notice */}
          <div className="text-sm text-gray-500 dark:text-gray-400 text-center flex items-center justify-center gap-2">
            <Shield className="h-4 w-4" />
            <p>Your data is encrypted and securely stored</p>
          </div>
        </div>
      </div>
    </div>
  );
};