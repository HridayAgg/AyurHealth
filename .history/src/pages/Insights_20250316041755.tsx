import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { Activity, Heart, Moon, Droplets, AlertCircle, CheckCircle2, Clock, Leaf, Brain, Sun, Battery, Flame, Wind, Cloud, Thermometer, Flower2, Waves } from 'lucide-react';
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

// Ayurvedic interpretation of Google Fit data
const getAyurvedicInterpretation = (data) => {
  const avgSteps = data.reduce((acc, day) => acc + day.steps, 0) / data.length;
  const avgActiveMinutes = data.reduce((acc, day) => acc + day.activeMinutes, 0) / data.length;
  const avgHeartRate = data.reduce((acc, day) => acc + day.heartRate, 0) / data.length;
  
  return {
    vataBalance: avgSteps < 7000 || avgActiveMinutes < 40,
    pittaBalance: avgHeartRate > 75,
    kaphaBalance: avgSteps < 5000 && avgActiveMinutes < 30
  };
};

const doshaBalance = [
  { name: 'Vata', value: 35 },
  { name: 'Pitta', value: 40 },
  { name: 'Kapha', value: 25 },
];

const DOSHA_COLORS = ['#8b5cf6', '#ec4899', '#10b981'];

// New data structures for enhanced Ayurvedic insights
const prakritiAssessment = {
  vata: {
    physical: 65,
    mental: 70,
    emotional: 75,
    characteristics: ['Light', 'Cold', 'Dry', 'Irregular', 'Quick'],
    recommendations: [
      'Regular oil massage (Abhyanga)',
      'Warm, nourishing foods',
      'Consistent daily routine',
      'Grounding meditation practices'
    ]
  },
  pitta: {
    physical: 55,
    mental: 80,
    emotional: 60,
    characteristics: ['Hot', 'Sharp', 'Light', 'Intense', 'Fluid'],
    recommendations: [
      'Cooling pranayama',
      'Moderate exercise',
      'Cool, sweet foods',
      'Moonlight meditation'
    ]
  },
  kapha: {
    physical: 45,
    mental: 50,
    emotional: 65,
    characteristics: ['Heavy', 'Slow', 'Cool', 'Oily', 'Smooth'],
    recommendations: [
      'Vigorous exercise',
      'Dry massage (Garshana)',
      'Light, spicy foods',
      'Dynamic meditation'
    ]
  }
};

const seasonalRecommendations = {
  spring: {
    dosha: 'Kapha',
    qualities: ['Warm', 'Light', 'Dry'],
    diet: ['Bitter greens', 'Sprouted grains', 'Honey'],
    lifestyle: ['Early rising', 'Dry brushing', 'Dynamic yoga'],
    herbs: ['Ginger', 'Turmeric', 'Triphala']
  },
  summer: {
    dosha: 'Pitta',
    qualities: ['Cool', 'Sweet', 'Liquid'],
    diet: ['Coconut water', 'Sweet fruits', 'Mint tea'],
    lifestyle: ['Moonlight walks', 'Swimming', 'Cooling breath'],
    herbs: ['Brahmi', 'Amalaki', 'Shatavari']
  },
  autumn: {
    dosha: 'Vata',
    qualities: ['Warm', 'Moist', 'Grounding'],
    diet: ['Root vegetables', 'Warm soups', 'Ghee'],
    lifestyle: ['Oil massage', 'Gentle yoga', 'Regular routine'],
    herbs: ['Ashwagandha', 'Licorice', 'Calamus']
  }
};

const herbDoshaRelationships = [
  { herb: 'Ashwagandha', vata: 80, pitta: 40, kapha: 60 },
  { herb: 'Brahmi', vata: 70, pitta: 75, kapha: 50 },
  { herb: 'Shatavari', vata: 65, pitta: 80, kapha: 45 },
  { herb: 'Triphala', vata: 70, pitta: 65, kapha: 75 }
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

  const ayurvedicInsights = getAyurvedicInterpretation(weeklyActivityData);
  
  // Get current season
  const getCurrentSeason = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'autumn';
    return 'winter';
  };

  const currentSeason = getCurrentSeason();

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
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4 dark:text-white flex items-center">
          <Brain className="h-6 w-6 mr-2 text-emerald-600 dark:text-emerald-400" />
          Ayurvedic Health Insights
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Priority Insights */}
          <div className="space-y-4">
            {ayurvedicInsights.vataBalance && (
              <div className="border-l-4 border-purple-500 pl-4 py-2 bg-purple-50 dark:bg-purple-900/20 rounded-r-lg">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-purple-500 mr-2" />
                  <h3 className="font-semibold text-purple-700 dark:text-purple-300">Vata Balance Needed</h3>
                </div>
                <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
                  Your activity levels indicate Vata imbalance. Consider adding regular, gentle movement to your routine.
                </p>
              </div>
            )}

            {ayurvedicInsights.pittaBalance && (
              <div className="border-l-4 border-red-500 pl-4 py-2 bg-red-50 dark:bg-red-900/20 rounded-r-lg">
                <div className="flex items-center">
                  <Sun className="h-5 w-5 text-red-500 mr-2" />
                  <h3 className="font-semibold text-red-700 dark:text-red-300">Pitta Management</h3>
                </div>
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                  Elevated heart rate suggests Pitta aggravation. Focus on cooling activities and stress management.
                </p>
              </div>
            )}

            {ayurvedicInsights.kaphaBalance && (
              <div className="border-l-4 border-emerald-500 pl-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-r-lg">
                <div className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-2" />
                  <h3 className="font-semibold text-emerald-700 dark:text-emerald-300">Kapha Activation Needed</h3>
                </div>
                <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
                  Low activity levels indicate Kapha stagnation. Increase movement and energetic activities.
                </p>
              </div>
            )}
          </div>

          {/* Action Steps based on Google Fit data */}
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3 dark:text-white flex items-center">
              <Leaf className="h-5 w-5 mr-2 text-emerald-600 dark:text-emerald-400" />
              Recommended Actions
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">1</span>
                </div>
                <div>
                  <p className="text-sm font-medium dark:text-white">Activity Goals</p>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-4 mt-1">
                    <li>Aim for 10,000 steps daily</li>
                    <li>30 minutes of moderate activity</li>
                    <li>Regular movement breaks</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">2</span>
                </div>
                <div>
                  <p className="text-sm font-medium dark:text-white">Heart Rate Management</p>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-4 mt-1">
                    <li>Practice deep breathing</li>
                    <li>Monitor exercise intensity</li>
                    <li>Regular rest periods</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">3</span>
                </div>
                <div>
                  <p className="text-sm font-medium dark:text-white">Sleep Optimization</p>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-4 mt-1">
                    <li>Maintain 7-8 hours sleep</li>
                    <li>Consistent sleep schedule</li>
                    <li>Pre-sleep relaxation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards with Google Fit data */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <h3 className="font-semibold text-purple-600 dark:text-purple-400">Daily Steps</h3>
          </div>
          <p className="text-2xl font-bold mt-2 text-purple-700 dark:text-purple-300">
            {weeklyActivityData[weeklyActivityData.length - 1].steps.toLocaleString()}
          </p>
          <p className="text-sm text-purple-600 dark:text-purple-400">Today's count</p>
        </div>

        <div className="bg-pink-100 dark:bg-pink-900/30 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-pink-600 dark:text-pink-400" />
            <h3 className="font-semibold text-pink-600 dark:text-pink-400">Heart Rate</h3>
          </div>
          <p className="text-2xl font-bold mt-2 text-pink-700 dark:text-pink-300">
            {weeklyActivityData[weeklyActivityData.length - 1].heartRate} BPM
          </p>
          <p className="text-sm text-pink-600 dark:text-pink-400">Average</p>
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
          <p className="text-sm text-blue-600 dark:text-blue-400">Today's activity</p>
        </div>
      </div>

      {/* Charts Section with Google Fit data */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Weekly Activity</h3>
          <div className="h-[300px]">
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

        {/* Heart Rate Trends */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Heart Rate Trend</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="heartRate" stroke="#ec4899" name="Heart Rate (BPM)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sleep Pattern */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow md:col-span-2">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Sleep Pattern</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sleepData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="hours"
                  stroke="#10b981"
                  name="Sleep Duration"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="efficiency"
                  stroke="#8b5cf6"
                  name="Sleep Efficiency"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* New Prakriti Assessment Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4 dark:text-white flex items-center">
          <Waves className="h-6 w-6 mr-2 text-emerald-600 dark:text-emerald-400" />
          Prakriti Assessment & Balance
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {Object.entries(prakritiAssessment).map(([dosha, data]) => (
            <div key={dosha} className={`p-4 rounded-lg ${
              dosha === 'vata' ? 'bg-purple-50 dark:bg-purple-900/20' :
              dosha === 'pitta' ? 'bg-red-50 dark:bg-red-900/20' :
              'bg-green-50 dark:bg-green-900/20'
            }`}>
              <h3 className={`text-lg font-semibold capitalize ${
                dosha === 'vata' ? 'text-purple-700 dark:text-purple-300' :
                dosha === 'pitta' ? 'text-red-700 dark:text-red-300' :
                'text-green-700 dark:text-green-300'
              }`}>{dosha}</h3>
              <div className="mt-3 space-y-2">
                {['physical', 'mental', 'emotional'].map(aspect => (
                  <div key={aspect} className="flex items-center">
                    <span className="text-sm w-24 capitalize">{aspect}</span>
                    <div className="flex-1 ml-2">
                      <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className={`h-full rounded-full ${
                            dosha === 'vata' ? 'bg-purple-500' :
                            dosha === 'pitta' ? 'bg-red-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${data[aspect]}%` }}
                        />
                      </div>
                    </div>
                    <span className="ml-2 text-sm">{data[aspect]}%</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Seasonal Wisdom Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4 dark:text-white flex items-center">
          <Sun className="h-6 w-6 mr-2 text-emerald-600 dark:text-emerald-400" />
          Seasonal Wisdom ({currentSeason.charAt(0).toUpperCase() + currentSeason.slice(1)})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
            <h3 className="font-semibold text-amber-700 dark:text-amber-300 flex items-center">
              <Flame className="h-5 w-5 mr-2" />
              Dominant Dosha
            </h3>
            <p className="mt-2 text-amber-600 dark:text-amber-400">
              {seasonalRecommendations[currentSeason].dosha}
            </p>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="font-semibold text-blue-700 dark:text-blue-300 flex items-center">
              <Wind className="h-5 w-5 mr-2" />
              Qualities
            </h3>
            <ul className="mt-2 space-y-1">
              {seasonalRecommendations[currentSeason].qualities.map(quality => (
                <li key={quality} className="text-blue-600 dark:text-blue-400">{quality}</li>
              ))}
            </ul>
          </div>
          <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
            <h3 className="font-semibold text-emerald-700 dark:text-emerald-300 flex items-center">
              <Leaf className="h-5 w-5 mr-2" />
              Recommended Diet
            </h3>
            <ul className="mt-2 space-y-1">
              {seasonalRecommendations[currentSeason].diet.map(item => (
                <li key={item} className="text-emerald-600 dark:text-emerald-400">{item}</li>
              ))}
            </ul>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <h3 className="font-semibold text-purple-700 dark:text-purple-300 flex items-center">
              <Flower2 className="h-5 w-5 mr-2" />
              Seasonal Herbs
            </h3>
            <ul className="mt-2 space-y-1">
              {seasonalRecommendations[currentSeason].herbs.map(herb => (
                <li key={herb} className="text-purple-600 dark:text-purple-400">{herb}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* New Herb-Dosha Relationship Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow md:col-span-2">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Herb-Dosha Relationships</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={herbDoshaRelationships}>
              <PolarGrid />
              <PolarAngleAxis dataKey="herb" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar name="Vata" dataKey="vata" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
              <Radar name="Pitta" dataKey="pitta" stroke="#ec4899" fill="#ec4899" fillOpacity={0.3} />
              <Radar name="Kapha" dataKey="kapha" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Recommendations */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mt-6">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Detailed Health Analysis</h3>
        <div className="space-y-4">
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <h4 className="font-semibold text-purple-700 dark:text-purple-300">Sleep & Recovery</h4>
            <p className="text-sm text-purple-600 dark:text-purple-400 mt-2">
              Your sleep efficiency is at 82%. To improve:
            </p>
            <ul className="text-sm text-purple-600 dark:text-purple-400 list-disc ml-5 mt-2">
              <li>Practice Nadi Shodhana pranayama before bed</li>
              <li>Apply warm sesame oil to feet and scalp</li>
              <li>Maintain consistent sleep-wake times</li>
            </ul>
          </div>

          <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
            <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">Physical Activity</h4>
            <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-2">
              Current activity pattern shows good momentum. Enhance with:
            </p>
            <ul className="text-sm text-emerald-600 dark:text-emerald-400 list-disc ml-5 mt-2">
              <li>15 minutes morning sun salutations</li>
              <li>Post-lunch gentle walking</li>
              <li>Evening stretching routine</li>
            </ul>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300">Mental Wellness</h4>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
              Stress indicators suggest need for balance. Recommended practices:
            </p>
            <ul className="text-sm text-blue-600 dark:text-blue-400 list-disc ml-5 mt-2">
              <li>10-minute morning meditation</li>
              <li>Afternoon aromatherapy with lavender</li>
              <li>Evening gratitude journaling</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}; 