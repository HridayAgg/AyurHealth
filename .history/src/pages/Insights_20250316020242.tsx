import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Activity, Heart, Moon, Droplets, AlertCircle, CheckCircle2, Clock, Leaf } from 'lucide-react';

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
          Key Insights & Recommended Actions
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Priority Insights */}
          <div className="space-y-4">
            <div className="border-l-4 border-red-500 pl-4 py-2 bg-red-50 dark:bg-red-900/20 rounded-r-lg">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <h3 className="font-semibold text-red-700 dark:text-red-300">Immediate Attention Needed</h3>
              </div>
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                Your sleep pattern shows irregular cycles. This can aggravate Vata dosha and affect mental clarity.
              </p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4 py-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-r-lg">
              <div className="flex items-center">
                <Sun className="h-5 w-5 text-yellow-500 mr-2" />
                <h3 className="font-semibold text-yellow-700 dark:text-yellow-300">Monitor & Improve</h3>
              </div>
              <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
                Pitta levels are elevated. This may lead to increased body heat and digestive issues.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-r-lg">
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <h3 className="font-semibold text-green-700 dark:text-green-300">Positive Trends</h3>
              </div>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                Daily step count is consistently above target. Keep up the good work with regular movement.
              </p>
            </div>
          </div>

          {/* Action Steps */}
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3 dark:text-white flex items-center">
              <Leaf className="h-5 w-5 mr-2 text-emerald-600 dark:text-emerald-400" />
              Today's Action Steps
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">1</span>
                </div>
                <div>
                  <p className="text-sm font-medium dark:text-white">Morning Routine (6-8 AM)</p>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-4 mt-1">
                    <li>10 minutes pranayama breathing</li>
                    <li>Warm water with lemon and honey</li>
                    <li>Light yoga stretches</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">2</span>
                </div>
                <div>
                  <p className="text-sm font-medium dark:text-white">Dietary Adjustments</p>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-4 mt-1">
                    <li>Include cooling foods (cucumber, mint)</li>
                    <li>Avoid spicy and fried foods</li>
                    <li>Maintain meal timings</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">3</span>
                </div>
                <div>
                  <p className="text-sm font-medium dark:text-white">Evening Routine (8-10 PM)</p>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc ml-4 mt-1">
                    <li>Warm oil head massage</li>
                    <li>Golden milk with nutmeg</li>
                    <li>Digital device cutoff by 9 PM</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Progress */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-3 dark:text-white flex items-center">
            <Battery className="h-5 w-5 mr-2 text-emerald-600 dark:text-emerald-400" />
            Weekly Progress
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
              <h4 className="text-sm font-medium text-purple-700 dark:text-purple-300">Sleep Quality</h4>
              <div className="flex items-center mt-1">
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: '75%' }}></div>
                </div>
                <span className="ml-2 text-sm text-purple-600 dark:text-purple-400">75%</span>
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300">Dosha Balance</h4>
              <div className="flex items-center mt-1">
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '85%' }}></div>
                </div>
                <span className="ml-2 text-sm text-blue-600 dark:text-blue-400">85%</span>
              </div>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg">
              <h4 className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Activity Goals</h4>
              <div className="flex items-center mt-1">
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '90%' }}></div>
                </div>
                <span className="ml-2 text-sm text-emerald-600 dark:text-emerald-400">90%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

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