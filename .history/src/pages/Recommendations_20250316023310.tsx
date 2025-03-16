import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Calendar, 
  Users, 
  Video, 
  Leaf, 
  Moon, 
  Sun, 
  Coffee,
  Apple,
  Wind,
  Fire,
  Droplets,
  Heart
} from 'lucide-react';

interface Program {
  id: string;
  title: string;
  description: string;
  duration: string;
  intensity: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  image: string;
}

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
}

export const Recommendations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'vata' | 'pitta' | 'kapha'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const articles: Article[] = [
    {
      slug: 'morning-routine',
      title: 'Ayurvedic Morning Routine for Vitality',
      excerpt: 'Start your day with these energizing Ayurvedic practices for optimal health.',
      category: 'Wellness',
      readTime: '5 min',
      image: '/images/morning-routine.jpg'
    },
    {
      slug: 'seasonal-diet',
      title: 'Seasonal Diet Guidelines',
      excerpt: 'Align your diet with nature\'s rhythm for better health and digestion.',
      category: 'Nutrition',
      readTime: '7 min',
      image: '/images/seasonal-diet.jpg'
    },
    // Add more articles...
  ];

  const programs: Program[] = [
    {
      id: 'yoga-basics',
      title: '21-Day Yoga Foundations',
      description: 'Build a strong foundation in yoga with daily guided practices.',
      duration: '21 days',
      intensity: 'Beginner',
      category: 'Yoga',
      image: '/images/yoga-basics.jpg'
    },
    {
      id: 'meditation-journey',
      title: 'Meditation Journey',
      description: 'Progressive meditation program for mental clarity and peace.',
      duration: '30 days',
      intensity: 'Beginner',
      category: 'Meditation',
      image: '/images/meditation.jpg'
    },
    // Add more programs...
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Ayurvedic Cooking Workshop',
      date: 'March 15, 2024',
      time: '10:00 AM - 12:00 PM',
      instructor: 'Dr. Maya Patel',
      category: 'Workshop'
    },
    {
      id: 2,
      title: 'Group Meditation Session',
      date: 'March 17, 2024',
      time: '7:00 AM - 8:00 AM',
      instructor: 'Sarah Johnson',
      category: 'Meditation'
    },
    // Add more events...
  ];

  const doshaRecommendations = {
    vata: {
      diet: ['Warm, cooked foods', 'Healthy oils and fats', 'Sweet, sour, and salty tastes'],
      lifestyle: ['Regular routine', 'Gentle exercise', 'Early bedtime'],
      herbs: ['Ashwagandha', 'Brahmi', 'Calamus']
    },
    pitta: {
      diet: ['Cool or warm foods', 'Sweet, bitter, and astringent tastes', 'Avoiding spicy foods'],
      lifestyle: ['Moderate exercise', 'Cooling activities', 'Nature walks'],
      herbs: ['Amalaki', 'Brahmi', 'Neem']
    },
    kapha: {
      diet: ['Warm, light foods', 'Pungent, bitter, and astringent tastes', 'Minimal oils'],
      lifestyle: ['Vigorous exercise', 'Early rising', 'New activities'],
      herbs: ['Trikatu', 'Guggulu', 'Ginger']
    }
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold dark:text-white">Personalized Recommendations</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('all')}
            className={\`px-4 py-2 rounded-lg \${
              activeTab === 'all'
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }\`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('vata')}
            className={\`px-4 py-2 rounded-lg \${
              activeTab === 'vata'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }\`}
          >
            Vata
          </button>
          <button
            onClick={() => setActiveTab('pitta')}
            className={\`px-4 py-2 rounded-lg \${
              activeTab === 'pitta'
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }\`}
          >
            Pitta
          </button>
          <button
            onClick={() => setActiveTab('kapha')}
            className={\`px-4 py-2 rounded-lg \${
              activeTab === 'kapha'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }\`}
          >
            Kapha
          </button>
        </div>
      </div>

      {/* Daily Wellness Tips */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-white flex items-center">
          <Sun className="h-6 w-6 mr-2 text-emerald-500" />
          Today's Wellness Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Coffee className="h-5 w-5 text-emerald-600 mr-2" />
              <h3 className="font-medium text-emerald-700 dark:text-emerald-300">Morning Routine</h3>
            </div>
            <p className="text-sm text-emerald-600 dark:text-emerald-400">
              Start your day with warm lemon water and 10 minutes of sun salutations.
            </p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Apple className="h-5 w-5 text-purple-600 mr-2" />
              <h3 className="font-medium text-purple-700 dark:text-purple-300">Nutrition</h3>
            </div>
            <p className="text-sm text-purple-600 dark:text-purple-400">
              Include cooling foods like cucumber and mint in your meals today.
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Moon className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="font-medium text-blue-700 dark:text-blue-300">Evening Practice</h3>
            </div>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              Practice 10 minutes of meditation before bed for better sleep.
            </p>
          </div>
        </div>
      </div>

      {/* Dosha-Specific Recommendations */}
      {activeTab !== 'all' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 dark:text-white flex items-center">
            <Leaf className="h-6 w-6 mr-2 text-emerald-500" />
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Balancing Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="font-medium dark:text-white flex items-center">
                <Apple className="h-5 w-5 mr-2 text-emerald-500" />
                Dietary Recommendations
              </h3>
              <ul className="space-y-2">
                {doshaRecommendations[activeTab].diet.map((item, index) => (
                  <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium dark:text-white flex items-center">
                <Heart className="h-5 w-5 mr-2 text-emerald-500" />
                Lifestyle Practices
              </h3>
              <ul className="space-y-2">
                {doshaRecommendations[activeTab].lifestyle.map((item, index) => (
                  <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium dark:text-white flex items-center">
                <Leaf className="h-5 w-5 mr-2 text-emerald-500" />
                Recommended Herbs
              </h3>
              <ul className="space-y-2">
                {doshaRecommendations[activeTab].herbs.map((item, index) => (
                  <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Wellness Programs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-white flex items-center">
          <Calendar className="h-6 w-6 mr-2 text-emerald-500" />
          Wellness Programs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <div key={program.id} className="border dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 dark:text-white">{program.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{program.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-emerald-600 dark:text-emerald-400">{program.duration}</span>
                  <span className="text-sm bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded">
                    {program.intensity}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Articles Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-white flex items-center">
          <BookOpen className="h-6 w-6 mr-2 text-emerald-500" />
          Recommended Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              to={`/article/${article.slug}`}
              className="block group"
            >
              <div className="border dark:border-gray-700 rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105">
                <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 dark:text-white group-hover:text-emerald-500">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-emerald-600 dark:text-emerald-400">{article.category}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{article.readTime} read</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-white flex items-center">
          <Users className="h-6 w-6 mr-2 text-emerald-500" />
          Upcoming Events
        </h2>
        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="border dark:border-gray-700 rounded-lg p-4 hover:border-emerald-500 transition-colors duration-200"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold dark:text-white">{event.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {event.date} • {event.time}
                  </p>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
                    Instructor: {event.instructor}
                  </p>
                </div>
                <span className="text-sm bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded">
                  {event.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Resources */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-white flex items-center">
          <Video className="h-6 w-6 mr-2 text-emerald-500" />
          Video Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="aspect-video bg-gray-200 dark:bg-gray-700"></div>
            <div className="p-4">
              <h3 className="font-semibold dark:text-white">Morning Yoga Flow</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">20 min gentle practice</p>
            </div>
          </div>
          <div className="border dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="aspect-video bg-gray-200 dark:bg-gray-700"></div>
            <div className="p-4">
              <h3 className="font-semibold dark:text-white">Guided Meditation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">15 min mindfulness</p>
            </div>
          </div>
          <div className="border dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="aspect-video bg-gray-200 dark:bg-gray-700"></div>
            <div className="p-4">
              <h3 className="font-semibold dark:text-white">Ayurvedic Cooking</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">30 min tutorial</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};