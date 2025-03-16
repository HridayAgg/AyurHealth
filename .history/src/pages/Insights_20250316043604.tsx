import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Activity, Heart, Moon, AlertCircle, CheckCircle2, Clock, Leaf, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import GoogleFitService from '../services/googleFit';

// Data that can be accessed from Google Fit
const weeklyActivityData = [
  { day: 'Mon', steps: 8500, activeMinutes: 45, heartRate: 72 },
  { day: 'Tue', steps: 10200, activeMinutes: 60, heartRate: 75 },
  { day: 'Wed', steps: 7800, activeMinutes: 35, heartRate: 70 },
  { day: 'Thu', steps: 9400, activeMinutes: 55, heartRate: 73 },
  { day: 'Fri', steps: 11000, activeMinutes: 65, heartRate: 76 },
  { day: 'Sat', steps: 6500, activeMinutes: 30, heartRate: 71 },
  { day: 'Sun', steps: 8900, activeMinutes: 50, heartRate: 74 },
];

const sleepData = [
  { date: '3/1', hours: 7.2, efficiency: 85 },
  { date: '3/2', hours: 6.8, efficiency: 75 },
  { date: '3/3', hours: 7.5, efficiency: 90 },
  { date: '3/4', hours: 6.5, efficiency: 70 },
  { date: '3/5', hours: 7.8, efficiency: 95 },
  { date: '3/6', hours: 7.0, efficiency: 80 },
  { date: '3/7', hours: 7.3, efficiency: 88 },
];

export const Insights: React.FC = () => {
  const [isGoogleFitConnected, setIsGoogleFitConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [healthData, setHealthData] = useState<any>(null);

  useEffect(() => {
    const checkGoogleFitConnection = async () => {
      try {
        const isConnected = GoogleFitService.getInstance().isSignedIn();
        setIsGoogleFitConnected(isConnected);

        if (isConnected) {
          // Fetch last week's data
          const now = Date.now();
          const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
          
          const [activityData, heartRateData] = await Promise.all([
            GoogleFitService.getInstance().fetchActivityData(weekAgo, now),
            GoogleFitService.getInstance().fetchHeartRateData(weekAgo, now)
          ]);

          setHealthData({ activityData, heartRateData });
        }
      } catch (error) {
        console.error('Error checking Google Fit connection:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkGoogleFitConnection();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your health insights...</p>
        </div>
      </div>
    );
  }

  if (!isGoogleFitConnected) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <Activity className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Connect Google Fit
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            To view your personalized Ayurvedic insights, please connect your Google Fit account. We'll analyze your activity, sleep, and heart rate data to provide tailored recommendations.
          </p>
          <Link to="/connect-google-fit">
            <Button className="w-full">
              Connect Google Fit
            </Button>
          </Link>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Your data is securely processed and used only to provide personalized Ayurvedic insights.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold dark:text-white">Health & Wellness Insights</h1>
        <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
          <Clock className="h-5 w-5" />
          <span className="text-sm">Last updated: Today, 2:30 PM</span>
        </div>
      </div>

      {/* Key Insights & Actions Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Health Analysis */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 dark:text-white flex items-center">
              <Brain className="h-6 w-6 mr-2 text-emerald-600" />
              Health Analysis & Recommendations
            </h2>

            {/* Sleep Pattern Analysis */}
            {sleepData[sleepData.length - 1].efficiency < 85 && (
              <div className="border-l-4 border-purple-500 pl-4 py-2 bg-purple-50 dark:bg-purple-900/20 rounded-r-lg mb-4">
                <h3 className="font-semibold text-purple-700 dark:text-purple-300">Improve Sleep Quality</h3>
                <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
                  Your sleep efficiency is {sleepData[sleepData.length - 1].efficiency}%. Consider:
                </p>
                <ul className="mt-2 space-y-1">
                  <li className="text-sm text-purple-600 dark:text-purple-400 flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Take Ashwagandha before bedtime
                  </li>
                  <li className="text-sm text-purple-600 dark:text-purple-400 flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Practice 10 minutes of deep breathing
                  </li>
                  <li className="text-sm text-purple-600 dark:text-purple-400 flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Maintain a consistent sleep schedule
                  </li>
                </ul>
              </div>
            )}

            {/* Activity Level Analysis */}
            {weeklyActivityData[weeklyActivityData.length - 1].steps < 7500 && (
              <div className="border-l-4 border-emerald-500 pl-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-r-lg mb-4">
                <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">Increase Physical Activity</h3>
                <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
                  Your daily steps ({weeklyActivityData[weeklyActivityData.length - 1].steps}) are below the recommended 7,500. Try:
                </p>
                <ul className="mt-2 space-y-1">
                  <li className="text-sm text-emerald-600 dark:text-emerald-400 flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Morning walk with Triphala tea
                  </li>
                  <li className="text-sm text-emerald-600 dark:text-emerald-400 flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Post-meal gentle strolls
                  </li>
                  <li className="text-sm text-emerald-600 dark:text-emerald-400 flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Evening yoga routine
                  </li>
                </ul>
              </div>
            )}

            {/* Heart Rate Analysis */}
            {weeklyActivityData[weeklyActivityData.length - 1].heartRate > 75 && (
              <div className="border-l-4 border-red-500 pl-4 py-2 bg-red-50 dark:bg-red-900/20 rounded-r-lg mb-4">
                <h3 className="font-semibold text-red-700 dark:text-red-300">Balance Heart Rate</h3>
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                  Your average heart rate ({weeklyActivityData[weeklyActivityData.length - 1].heartRate} BPM) is elevated. Consider:
                </p>
                <ul className="mt-2 space-y-1">
                  <li className="text-sm text-red-600 dark:text-red-400 flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Take Brahmi supplement
                  </li>
                  <li className="text-sm text-red-600 dark:text-red-400 flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Practice cooling pranayama
                  </li>
                  <li className="text-sm text-red-600 dark:text-red-400 flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Reduce caffeine intake
                  </li>
                </ul>
              </div>
            )}

            {/* Stress Level Analysis */}
            {weeklyActivityData[weeklyActivityData.length - 1].heartRate > 80 && (
              <div className="border-l-4 border-amber-500 pl-4 py-2 bg-amber-50 dark:bg-amber-900/20 rounded-r-lg mb-4">
                <h3 className="font-semibold text-amber-700 dark:text-amber-300">Manage Stress Levels</h3>
                <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">
                  Your heart rate patterns suggest elevated stress. Try:
                </p>
                <ul className="mt-2 space-y-1">
                  <li className="text-sm text-amber-600 dark:text-amber-400 flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Take Ashwagandha for anxiety
                  </li>
                  <li className="text-sm text-amber-600 dark:text-amber-400 flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Practice meditation daily
                  </li>
                  <li className="text-sm text-amber-600 dark:text-amber-400 flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Use calming essential oils
                  </li>
                </ul>
              </div>
            )}

            {/* Comprehensive Analysis & Conclusions */}
            <div className="mt-6 border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 dark:text-white flex items-center">
                <Leaf className="h-5 w-5 mr-2 text-emerald-600" />
                Comprehensive Analysis
              </h3>
              
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Weekly Trends</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your activity levels show {
                      weeklyActivityData.reduce((acc, day) => acc + day.steps, 0) / 7 > 8000 
                        ? 'consistent movement throughout the week' 
                        : 'room for improvement in daily movement'
                    }. Sleep patterns indicate {
                      sleepData.reduce((acc, day) => acc + day.efficiency, 0) / 7 > 85
                        ? 'generally good rest quality'
                        : 'potential disruptions in sleep cycles'
                    }.
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Dosha Influence</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {weeklyActivityData[weeklyActivityData.length - 1].heartRate > 75
                      ? 'Current patterns suggest a Pitta imbalance, indicating a need for cooling and calming practices.'
                      : weeklyActivityData[weeklyActivityData.length - 1].steps < 7000
                      ? 'Signs of Kapha dominance suggest incorporating more dynamic activities.'
                      : 'Your patterns show balanced dosha expression with slight Vata influence.'}
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Priority Actions</h4>
                  <ul className="space-y-2">
                    {weeklyActivityData[weeklyActivityData.length - 1].heartRate > 75 && (
                      <li className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                        <AlertCircle className="h-4 w-4 mr-2 mt-0.5 text-red-500" />
                        Focus on stress reduction as your primary goal
                      </li>
                    )}
                    {sleepData[sleepData.length - 1].efficiency < 85 && (
                      <li className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                        <AlertCircle className="h-4 w-4 mr-2 mt-0.5 text-purple-500" />
                        Prioritize sleep quality improvement
                      </li>
                    )}
                    {weeklyActivityData[weeklyActivityData.length - 1].steps < 7500 && (
                      <li className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                        <AlertCircle className="h-4 w-4 mr-2 mt-0.5 text-emerald-500" />
                        Gradually increase daily activity levels
                      </li>
                    )}
                  </ul>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Daily Schedule Recommendation</h4>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Morning (6-10 AM):</span> {
                        weeklyActivityData[weeklyActivityData.length - 1].heartRate > 75
                          ? 'Start with gentle stretching and breathing exercises'
                          : 'Begin with energizing yoga and brisk walk'
                      }
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Mid-day (10 AM-2 PM):</span> Focus on main tasks and physical activity
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Afternoon (2-6 PM):</span> {
                        weeklyActivityData[weeklyActivityData.length - 1].steps < 7500
                          ? 'Include short walking breaks between tasks'
                          : 'Maintain current activity pattern'
                      }
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Evening (6-10 PM):</span> {
                        sleepData[sleepData.length - 1].efficiency < 85
                          ? 'Focus on relaxation and sleep preparation'
                          : 'Light activity and relaxation'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Charts and Stats */}
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <h3 className="font-semibold text-purple-600 dark:text-purple-400">Daily Steps</h3>
              </div>
              <p className="text-2xl font-bold mt-2 text-purple-700 dark:text-purple-300">
                {weeklyActivityData[weeklyActivityData.length - 1].steps.toLocaleString()}
              </p>
            </div>

            <div className="bg-pink-100 dark:bg-pink-900/30 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                <h3 className="font-semibold text-pink-600 dark:text-pink-400">Heart Rate</h3>
              </div>
              <p className="text-2xl font-bold mt-2 text-pink-700 dark:text-pink-300">
                {weeklyActivityData[weeklyActivityData.length - 1].heartRate} BPM
              </p>
            </div>

            <div className="bg-emerald-100 dark:bg-emerald-900/30 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Moon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="font-semibold text-emerald-600 dark:text-emerald-400">Sleep</h3>
              </div>
              <p className="text-2xl font-bold mt-2 text-emerald-700 dark:text-emerald-300">
                {sleepData[sleepData.length - 1].hours} hrs
              </p>
              <p className="text-sm text-emerald-600 dark:text-emerald-400">
                {sleepData[sleepData.length - 1].efficiency}% efficiency
              </p>
            </div>

            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-semibold text-blue-600 dark:text-blue-400">Active Minutes</h3>
              </div>
              <p className="text-2xl font-bold mt-2 text-blue-700 dark:text-blue-300">
                {weeklyActivityData[weeklyActivityData.length - 1].activeMinutes} min
              </p>
            </div>
          </div>

          {/* Activity Chart */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Weekly Activity</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="steps" fill="#8b5cf6" name="Steps" />
                  <Bar dataKey="activeMinutes" fill="#ec4899" name="Active Minutes" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sleep Chart */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Sleep Pattern</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sleepData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="hours" stroke="#10b981" name="Sleep Duration" />
                  <Line type="monotone" dataKey="efficiency" stroke="#8b5cf6" name="Sleep Efficiency" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 