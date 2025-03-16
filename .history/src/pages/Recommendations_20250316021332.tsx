import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Yoga, 
  Utensils, 
  Clock, 
  Calendar, 
  Heart, 
  Moon, 
  Leaf,
  Filter,
  ChevronRight,
  Sparkles,
  Tag,
  ExternalLink
} from 'lucide-react';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'diet', label: 'Diet & Nutrition' },
  { id: 'yoga', label: 'Yoga & Exercise' },
  { id: 'lifestyle', label: 'Lifestyle' },
  { id: 'wellness', label: 'Wellness Programs' },
  { id: 'articles', label: 'Articles' },
];

export const articles = [
  {
    title: "Understanding Your Dosha: A Guide to Vata, Pitta, and Kapha",
    excerpt: "Learn about the three fundamental energies that govern our physical and mental processes according to Ayurvedic medicine. Discover your dominant dosha and how it influences your health.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1600",
    readTime: "5 min",
    author: "Dr. Anjali Sharma",
    category: "Ayurvedic Basics",
    url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3215408/",
    publishDate: "2024-03-15",
    slug: "understanding-your-dosha-a-guide-to-vata-pitta-and-kapha"
  },
  {
    title: "Ayurvedic Morning Routine for Balance",
    excerpt: "Start your day with these traditional practices to promote wellness and vitality. Learn about oil pulling, tongue scraping, and other essential morning rituals that can transform your health.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1600",
    readTime: "4 min",
    author: "Maya Patel",
    category: "Daily Practices",
    url: "https://www.healthline.com/health/ayurvedic-morning-routine",
    publishDate: "2024-03-10",
    slug: "ayurvedic-morning-routine-for-balance"
  },
  {
    title: "Healing Herbs in Ayurveda",
    excerpt: "Discover the powerful healing properties of common Ayurvedic herbs like Ashwagandha, Turmeric, Holy Basil, and more. Learn how to incorporate these herbs into your daily wellness routine.",
    image: "https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&q=80&w=1600",
    readTime: "6 min",
    author: "Dr. Rajesh Kumar",
    category: "Herbal Medicine",
    url: "https://www.hopkinsmedicine.org/health/wellness-and-prevention/ayurveda",
    publishDate: "2024-03-08",
    slug: "healing-herbs-in-ayurveda"
  },
  {
    title: "Seasonal Eating in Ayurveda: A Guide to Ritucharya",
    excerpt: "Understand how to align your diet with nature's rhythms through the practice of Ritucharya. Learn which foods are best for each season to maintain optimal health.",
    image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&q=80&w=1600",
    readTime: "7 min",
    author: "Sarah Johnson",
    category: "Nutrition",
    url: "https://www.ayurveda.com/resources/seasonal-eating",
    publishDate: "2024-03-05",
    slug: "seasonal-eating-in-ayurveda-guide-to-ritucharya"
  }
];

const TipOfTheDay = () => (
  <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-6 mb-8">
    <div className="flex items-center gap-2 mb-4">
      <Sparkles className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
      <h2 className="text-xl font-semibold dark:text-white">Tip of the Day</h2>
    </div>
    <p className="text-gray-700 dark:text-gray-300">
      Start your day with a warm glass of water with lemon to stimulate digestion and cleanse your system. 
      This simple Ayurvedic practice helps balance your doshas and promote overall wellness.
    </p>
  </div>
);

const ArticleCard = ({ article }: { article: typeof articles[0] }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
    <Link to={`/article/${article.slug}`}>
      <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
    </Link>
    <div className="p-6">
      <div className="flex items-center gap-2 mb-3">
        <Tag className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">{article.category}</span>
      </div>
      <Link to={`/article/${article.slug}`}>
        <h3 className="text-xl font-semibold mb-2 hover:text-emerald-600 transition-colors dark:text-white dark:hover:text-emerald-400">
          {article.title}
        </h3>
      </Link>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{article.excerpt}</p>
      <div className="border-t dark:border-gray-700 pt-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-500 dark:text-gray-400">By {article.author}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">{new Date(article.publishDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <Clock className="h-4 w-4" />
            {article.readTime} read
          </span>
          <div className="flex items-center gap-4">
            <Link
              to={`/article/${article.slug}`}
              className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium"
            >
              Read Article
            </Link>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              title="View external source"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const Recommendations: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold dark:text-white">Personalized Recommendations</h1>
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <select 
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1 text-sm"
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
        </div>
      </div>

      <TipOfTheDay />

      {/* Featured Program */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">21-Day Ayurvedic Wellness Challenge</h2>
            <p className="text-sm opacity-90 mb-4">Transform your lifestyle with guided daily practices aligned with your dosha.</p>
            <button className="bg-white text-emerald-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90">
              Join Program
            </button>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <Calendar className="h-8 w-8" />
          </div>
        </div>
      </div>

      {/* Daily Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
              <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold dark:text-white">Today's Schedule</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-16">6:00 AM</span>
              <div className="flex-1 text-sm">
                <p className="font-medium dark:text-white">Morning Meditation</p>
                <p className="text-gray-600 dark:text-gray-300">15-minute guided session</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-16">7:00 AM</span>
              <div className="flex-1 text-sm">
                <p className="font-medium dark:text-white">Yoga Practice</p>
                <p className="text-gray-600 dark:text-gray-300">Surya Namaskar sequence</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-16">8:00 AM</span>
              <div className="flex-1 text-sm">
                <p className="font-medium dark:text-white">Breakfast</p>
                <p className="text-gray-600 dark:text-gray-300">Dosha-specific meal plan</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-pink-100 dark:bg-pink-900/30 p-2 rounded-lg">
              <Yoga className="h-5 w-5 text-pink-600 dark:text-pink-400" />
            </div>
            <h3 className="font-semibold dark:text-white">Recommended Practices</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Heart className="h-4 w-4 text-pink-500" />
                <span className="text-sm font-medium dark:text-white">Pranayama</span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">10 mins</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Moon className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium dark:text-white">Evening Meditation</span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">15 mins</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Leaf className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium dark:text-white">Oil Massage</span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">20 mins</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg">
              <Utensils className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="font-semibold dark:text-white">Dietary Recommendations</h3>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
              <h4 className="text-sm font-medium text-emerald-700 dark:text-emerald-300 mb-2">Foods to Include</h4>
              <ul className="text-sm text-emerald-600 dark:text-emerald-400 list-disc ml-4">
                <li>Warm ginger tea</li>
                <li>Steamed vegetables</li>
                <li>Whole grains</li>
              </ul>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <h4 className="text-sm font-medium text-red-700 dark:text-red-300 mb-2">Foods to Avoid</h4>
              <ul className="text-sm text-red-600 dark:text-red-400 list-disc ml-4">
                <li>Cold beverages</li>
                <li>Processed foods</li>
                <li>Heavy dairy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Wellness Programs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Wellness Programs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                <Moon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">7 Days</span>
            </div>
            <h4 className="font-medium dark:text-white mb-2">Better Sleep Program</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Improve your sleep quality with Ayurvedic practices.</p>
            <button className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">Learn More →</button>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                <Heart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-xs font-medium text-purple-600 dark:text-purple-400">14 Days</span>
            </div>
            <h4 className="font-medium dark:text-white mb-2">Stress Management</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Natural techniques to reduce stress and anxiety.</p>
            <button className="text-sm text-purple-600 dark:text-purple-400 font-medium hover:underline">Learn More →</button>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg">
                <Leaf className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">21 Days</span>
            </div>
            <h4 className="font-medium dark:text-white mb-2">Digestive Health</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Balance your digestion with Ayurvedic principles.</p>
            <button className="text-sm text-emerald-600 dark:text-emerald-400 font-medium hover:underline">Learn More →</button>
          </div>
        </div>
      </div>

      {/* Articles Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold dark:text-white">Featured Articles</h3>
          <Link to="/articles" className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline flex items-center">
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {articles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};