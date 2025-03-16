import React, { useState, useEffect } from 'react';
import { User, Settings, Moon, Sun, Wind, Flame, Droplets, Edit2, Save, X } from 'lucide-react';
import { Button } from '../components/Button';
import MemoryService from '../services/memoryService';

interface UserData {
  name: string;
  email: string;
  age: number;
  gender: 'male' | 'female' | 'other' | '';
  phone: string;
  primaryDosha: 'vata' | 'pitta' | 'kapha' | '';
  secondaryDosha: 'vata' | 'pitta' | 'kapha' | '';
  dietaryPreferences: string[];
  healthConditions: string[];
  dailyRoutine: {
    wakeUpTime: string;
    bedTime: string;
    meditationTime: string;
  };
  preferences: {
    notifications: boolean;
    darkMode: boolean;
    language: 'english' | 'sanskrit';
  };
}

export const UserProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    age: 0,
    gender: '',
    phone: '',
    primaryDosha: '',
    secondaryDosha: '',
    dietaryPreferences: [],
    healthConditions: [],
    dailyRoutine: {
      wakeUpTime: '06:00',
      bedTime: '22:00',
      meditationTime: '07:00',
    },
    preferences: {
      notifications: true,
      darkMode: false,
      language: 'english',
    },
  });

  const memoryService = MemoryService.getInstance();

  useEffect(() => {
    // Load user data from memory service
    const savedData = memoryService.getUserProfile();
    if (savedData) {
      setUserData(savedData);
    }
  }, []);

  const handleSave = () => {
    memoryService.saveUserProfile(userData);
    setIsEditing(false);
  };

  const getDoshaIcon = (dosha: string) => {
    switch (dosha) {
      case 'vata':
        return <Wind className="h-6 w-6 text-purple-500" />;
      case 'pitta':
        return <Flame className="h-6 w-6 text-red-500" />;
      case 'kapha':
        return <Droplets className="h-6 w-6 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
              <User className="h-8 w-8 text-emerald-600 dark:text-emerald-300" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {userData.name || 'Your Profile'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">{userData.email}</p>
            </div>
          </div>
          <Button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            variant="secondary"
            className="flex items-center gap-2"
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            ) : (
              <>
                <Edit2 className="h-4 w-4" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Basic Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Basic Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900 dark:text-white">{userData.name || 'Not set'}</p>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900 dark:text-white">{userData.email || 'Not set'}</p>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Age</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={userData.age || ''}
                    onChange={(e) => setUserData({ ...userData, age: parseInt(e.target.value) || 0 })}
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900 dark:text-white">{userData.age || 'Not set'}</p>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Gender</label>
                {isEditing ? (
                  <select
                    value={userData.gender}
                    onChange={(e) => setUserData({ ...userData, gender: e.target.value as UserData['gender'] })}
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  <p className="mt-1 text-gray-900 dark:text-white capitalize">{userData.gender || 'Not set'}</p>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={userData.phone}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900 dark:text-white">{userData.phone || 'Not set'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Dosha Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Dosha Profile
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Primary Dosha</label>
                {isEditing ? (
                  <select
                    value={userData.primaryDosha}
                    onChange={(e) => setUserData({ ...userData, primaryDosha: e.target.value as UserData['primaryDosha'] })}
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500"
                  >
                    <option value="">Select Dosha</option>
                    <option value="vata">Vata</option>
                    <option value="pitta">Pitta</option>
                    <option value="kapha">Kapha</option>
                  </select>
                ) : (
                  <div className="flex items-center gap-2 mt-1">
                    {getDoshaIcon(userData.primaryDosha)}
                    <span className="text-gray-900 dark:text-white capitalize">
                      {userData.primaryDosha || 'Not set'}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Secondary Dosha</label>
                {isEditing ? (
                  <select
                    value={userData.secondaryDosha}
                    onChange={(e) => setUserData({ ...userData, secondaryDosha: e.target.value as UserData['secondaryDosha'] })}
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500"
                  >
                    <option value="">Select Dosha</option>
                    <option value="vata">Vata</option>
                    <option value="pitta">Pitta</option>
                    <option value="kapha">Kapha</option>
                  </select>
                ) : (
                  <div className="flex items-center gap-2 mt-1">
                    {getDoshaIcon(userData.secondaryDosha)}
                    <span className="text-gray-900 dark:text-white capitalize">
                      {userData.secondaryDosha || 'Not set'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Daily Routine */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Daily Routine (Dinacharya)
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Wake Up Time</label>
                {isEditing ? (
                  <input
                    type="time"
                    value={userData.dailyRoutine.wakeUpTime}
                    onChange={(e) => setUserData({
                      ...userData,
                      dailyRoutine: { ...userData.dailyRoutine, wakeUpTime: e.target.value }
                    })}
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900 dark:text-white">{userData.dailyRoutine.wakeUpTime}</p>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Meditation Time</label>
                {isEditing ? (
                  <input
                    type="time"
                    value={userData.dailyRoutine.meditationTime}
                    onChange={(e) => setUserData({
                      ...userData,
                      dailyRoutine: { ...userData.dailyRoutine, meditationTime: e.target.value }
                    })}
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900 dark:text-white">{userData.dailyRoutine.meditationTime}</p>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400">Bed Time</label>
                {isEditing ? (
                  <input
                    type="time"
                    value={userData.dailyRoutine.bedTime}
                    onChange={(e) => setUserData({
                      ...userData,
                      dailyRoutine: { ...userData.dailyRoutine, bedTime: e.target.value }
                    })}
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500"
                  />
                ) : (
                  <p className="mt-1 text-gray-900 dark:text-white">{userData.dailyRoutine.bedTime}</p>
                )}
              </div>
            </div>
          </div>

          {/* Dietary Preferences */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Dietary Preferences
            </h2>
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Add dietary preference and press Enter"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value) {
                      setUserData({
                        ...userData,
                        dietaryPreferences: [...userData.dietaryPreferences, e.currentTarget.value]
                      });
                      e.currentTarget.value = '';
                    }
                  }}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {userData.dietaryPreferences.map((pref, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 px-2 py-1 rounded-full text-sm"
                    >
                      <span>{pref}</span>
                      <button
                        onClick={() => setUserData({
                          ...userData,
                          dietaryPreferences: userData.dietaryPreferences.filter((_, i) => i !== index)
                        })}
                        className="hover:text-emerald-600 dark:hover:text-emerald-400"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {userData.dietaryPreferences.map((pref, index) => (
                  <span
                    key={index}
                    className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 px-3 py-1 rounded-full text-sm"
                  >
                    {pref}
                  </span>
                ))}
                {userData.dietaryPreferences.length === 0 && (
                  <p className="text-gray-500 dark:text-gray-400">No dietary preferences set</p>
                )}
              </div>
            )}
          </div>

          {/* Health Conditions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Health Conditions
            </h2>
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Add health condition and press Enter"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value) {
                      setUserData({
                        ...userData,
                        healthConditions: [...userData.healthConditions, e.currentTarget.value]
                      });
                      e.currentTarget.value = '';
                    }
                  }}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {userData.healthConditions.map((condition, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 px-2 py-1 rounded-full text-sm"
                    >
                      <span>{condition}</span>
                      <button
                        onClick={() => setUserData({
                          ...userData,
                          healthConditions: userData.healthConditions.filter((_, i) => i !== index)
                        })}
                        className="hover:text-emerald-600 dark:hover:text-emerald-400"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {userData.healthConditions.map((condition, index) => (
                  <span
                    key={index}
                    className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 px-3 py-1 rounded-full text-sm"
                  >
                    {condition}
                  </span>
                ))}
                {userData.healthConditions.length === 0 && (
                  <p className="text-gray-500 dark:text-gray-400">No health conditions added</p>
                )}
              </div>
            )}
          </div>

          {/* Preferences */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm md:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Preferences
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Notifications</span>
                  <button
                    type="button"
                    disabled={!isEditing}
                    onClick={() => setUserData({
                      ...userData,
                      preferences: {
                        ...userData.preferences,
                        notifications: !userData.preferences.notifications
                      }
                    })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      !isEditing ? 'cursor-not-allowed opacity-50' : ''
                    } ${
                      userData.preferences.notifications
                        ? 'bg-emerald-500'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        userData.preferences.notifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </label>
              </div>

              <div>
                <label className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
                  <button
                    type="button"
                    disabled={!isEditing}
                    onClick={() => setUserData({
                      ...userData,
                      preferences: {
                        ...userData.preferences,
                        darkMode: !userData.preferences.darkMode
                      }
                    })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      !isEditing ? 'cursor-not-allowed opacity-50' : ''
                    } ${
                      userData.preferences.darkMode
                        ? 'bg-emerald-500'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        userData.preferences.darkMode ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </label>
              </div>

              <div>
                <label className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Language</span>
                  {isEditing ? (
                    <select
                      value={userData.preferences.language}
                      onChange={(e) => setUserData({
                        ...userData,
                        preferences: {
                          ...userData.preferences,
                          language: e.target.value as 'english' | 'sanskrit'
                        }
                      })}
                      className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1 text-gray-900 dark:text-white focus:border-emerald-500 focus:ring-emerald-500"
                    >
                      <option value="english">English</option>
                      <option value="sanskrit">Sanskrit</option>
                    </select>
                  ) : (
                    <span className="text-gray-900 dark:text-white capitalize">
                      {userData.preferences.language}
                    </span>
                  )}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 