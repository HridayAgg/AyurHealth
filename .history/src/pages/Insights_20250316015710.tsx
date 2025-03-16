import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Activity, Heart, Moon, Droplets } from 'lucide-react';

// Dummy data for different metrics
const weeklyActivityData = [
  { day: 'Mon', steps: 8500, calories: 2100, activeMinutes: 45 },
  { day: 'Tue', steps: 10200, calories: 2300, activeMinutes: 60 },
  { day: 'Wed', steps: 7800, calories: 1950, activeMinutes: 35 },
  { day: 'Thu', steps: 9400, calories: 2200, activeMinutes: 55 },
  { day: 'Fri', steps: 11000, calories: 2400, activeMinutes: 65 },
  { day: 'Sat', steps: 6500, calories: 1800, activeMinutes: 30 },
  { day: 'Sun', steps: 8900, calories: 2150, activeMinutes: 50 },
];

const doshaBalance = [
  { name: 'Vata', value: 35 },
  { name: 'Pitta', value: 40 },
  { name: 'Kapha', value: 25 },
];

const sleepData = [
  { date: '3/1', hours: 7.2, quality: 85 },
  { date: '3/2', hours: 6.8, quality: 75 },
  { date: '3/3', hours: 7.5, quality: 90 },
  { date: '3/4', hours: 6.5, quality: 70 },
  { date: '3/5', hours: 7.8, quality: 95 },
  { date: '3/6', hours: 7.0, quality: 80 },
  { date: '3/7', hours: 7.3, quality: 88 },
];

const DOSHA_COLORS = ['#8b5cf6', '#ec4899', '#10b981'];

export const Insights: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Health & Wellness Insights</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <h3 className="font-semibold text-purple-600 dark:text-purple-400">Daily Activity</h3>
          </div>
          <p className="text-2xl font-bold mt-2 text-purple-700 dark:text-purple-300">8,945 steps</p>
          <p className="text-sm text-purple-600 dark:text-purple-400">+12% from yesterday</p>
        </div>

        <div className="bg-pink-100 dark:bg-pink-900/30 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-pink-600 dark:text-pink-400" />
            <h3 className="font-semibold text-pink-600 dark:text-pink-400">Heart Rate</h3>
          </div>
          <p className="text-2xl font-bold mt-2 text-pink-700 dark:text-pink-300">72 BPM</p>
          <p className="text-sm text-pink-600 dark:text-pink-400">Resting</p>
        </div>

        <div className="bg-emerald-100 dark:bg-emerald-900/30 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <Moon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-semibold text-emerald-600 dark:text-emerald-400">Sleep</h3>
          </div>
          <p className="text-2xl font-bold mt-2 text-emerald-700 dark:text-emerald-300">7.2 hrs</p>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">85% quality</p>
        </div>

        <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <Droplets className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-semibold text-blue-600 dark:text-blue-400">Hydration</h3>
          </div>
          <p className="text-2xl font-bold mt-2 text-blue-700 dark:text-blue-300">2.4 L</p>
          <p className="text-sm text-blue-600 dark:text-blue-400">80% of daily goal</p>
        </div>
      </div>

      {/* Charts Section */}
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
                <Bar dataKey="calories" fill="#ec4899" name="Calories" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dosha Balance */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Dosha Balance</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={doshaBalance}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {doshaBalance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={DOSHA_COLORS[index % DOSHA_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
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
                  dataKey="quality"
                  stroke="#8b5cf6"
                  name="Sleep Quality"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mt-6">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Personalized Insights</h3>
        <div className="space-y-4">
          <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <h4 className="font-semibold text-purple-700 dark:text-purple-300">Activity Balance</h4>
            <p className="text-sm text-purple-600 dark:text-purple-400">
              Your activity levels show a good balance. Consider adding 10 minutes of pranayama in the morning to enhance energy levels.
            </p>
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
            <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">Sleep Optimization</h4>
            <p className="text-sm text-emerald-600 dark:text-emerald-400">
              Your sleep pattern indicates slight irregularity. Try having warm milk with nutmeg before bedtime to improve sleep quality.
            </p>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300">Dosha Insight</h4>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              Your Pitta dosha is slightly elevated. Include cooling foods like cucumber and mint in your diet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 