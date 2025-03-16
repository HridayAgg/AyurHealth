import React from 'react';
import { Activity, Heart, Calendar, Clock, User, Award, Droplets, Wind, Fire } from 'lucide-react';
import { Button } from '../components/Button';

export const Profile: React.FC = () => {
  // In a real app, this would come from your user context/state
  const userProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    dosha: {
      vata: 40,
      pitta: 35,
      kapha: 25
    },
    stats: {
      stepsToday: 8432,
      activeMinutes: 45,
      heartRate: 72,
      sleepHours: 7.5
    },
    joinedDate: new Date(2024, 0, 15), // January 15, 2024
    streakDays: 12
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Your Profile</h1>
          <p className="text-gray-600 dark:text-gray-300">
            View and manage your health journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Info Card */}
          <div className="col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-emerald-100 dark:border-gray-700 p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <User className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{userProfile.name}</h2>
                <p className="text-gray-500 dark:text-gray-400">{userProfile.email}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Calendar className="h-5 w-5" />
                <span>Joined {userProfile.joinedDate.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Award className="h-5 w-5" />
                <span>{userProfile.streakDays} day streak</span>
              </div>
            </div>
          </div>

          {/* Dosha Balance Card */}
          <div className="col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-emerald-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Dosha Balance</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wind className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-700 dark:text-gray-300">Vata</span>
                  </div>
                  <span className="text-gray-900 dark:text-white font-medium">{userProfile.dosha.vata}%</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                  <div 
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${userProfile.dosha.vata}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Fire className="h-5 w-5 text-red-500" />
                    <span className="text-gray-700 dark:text-gray-300">Pitta</span>
                  </div>
                  <span className="text-gray-900 dark:text-white font-medium">{userProfile.dosha.pitta}%</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                  <div 
                    className="h-full bg-red-500 rounded-full"
                    style={{ width: `${userProfile.dosha.pitta}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-emerald-500" />
                    <span className="text-gray-700 dark:text-gray-300">Kapha</span>
                  </div>
                  <span className="text-gray-900 dark:text-white font-medium">{userProfile.dosha.kapha}%</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                  <div 
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${userProfile.dosha.kapha}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Health Stats Card */}
          <div className="col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-emerald-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Today's Health Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Steps</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userProfile.stats.stepsToday.toLocaleString()}
                </p>
              </div>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Active</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userProfile.stats.activeMinutes}m
                </p>
              </div>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Heart Rate</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userProfile.stats.heartRate} bpm
                </p>
              </div>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Sleep</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userProfile.stats.sleepHours}h
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 