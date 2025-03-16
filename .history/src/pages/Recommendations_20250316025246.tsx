import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, Book, Leaf, Clock, Tag, ExternalLink,
  Calendar, PlayCircle, Star, Users, ArrowRight,
  BookOpen, Activity, Moon, Sun
} from 'lucide-react';

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

const wellnessPrograms = [
  {
    title: "21-Day Dosha Balance Program",
    description: "A structured program to help you balance your dominant dosha through diet, exercise, and lifestyle practices.",
    duration: "21 days",
    intensity: "Moderate",
    category: "Holistic Wellness",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1600",
  },
  {
    title: "Morning Ritual Mastery",
    description: "Learn and implement traditional Ayurvedic morning practices for optimal health and energy.",
    duration: "14 days",
    intensity: "Beginner",
    category: "Daily Practices",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1600",
  },
  {
    title: "Seasonal Detox Guide",
    description: "Gentle cleansing practices aligned with seasonal changes to maintain optimal health.",
    duration: "7 days",
    intensity: "Intermediate",
    category: "Detox",
    image: "https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&q=80&w=1600",
  }
];

const dailyRoutines = [
  {
    time: "6:00 AM",
    practice: "Wake up before sunrise",
    description: "Rise during Brahma Muhurta for optimal energy",
    dosha: "All doshas",
    icon: Sun,
  },
  {
    time: "6:15 AM",
    practice: "Oil pulling & tongue scraping",
    description: "Oral hygiene practices for detoxification",
    dosha: "All doshas",
    icon: Activity,
  },
  {
    time: "7:00 AM",
    practice: "Morning yoga & meditation",
    description: "Gentle movement and mindfulness practice",
    dosha: "All doshas",
    icon: Moon,
  },
];

const TipOfTheDay = () => {
  const [tipIndex] = useState(0);
  const tips = [
    {
      title: "Morning Ritual",
      content: "Start your day with a warm glass of water with lemon to stimulate digestion and cleanse your system.",
      benefit: "Helps balance doshas and promote overall wellness",
    },
    {
      title: "Mindful Eating",
      content: "Take time to sit and eat mindfully, avoiding distractions like phones or TV.",
      benefit: "Improves digestion and nutrient absorption",
    },
    {
      title: "Evening Practice",
      content: "Apply warm oil to your feet before bed for better sleep quality.",
      benefit: "Promotes relaxation and grounds Vata energy",
    },
  ];

  return (
    <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
        <h2 className="text-xl font-semibold dark:text-white">Tip of the Day</h2>
      </div>
      <h3 className="font-medium text-lg mb-2 text-emerald-700 dark:text-emerald-300">{tips[tipIndex].title}</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-2">{tips[tipIndex].content}</p>
      <p className="text-sm text-emerald-600 dark:text-emerald-400">Benefit: {tips[tipIndex].benefit}</p>
    </div>
  );
};

const ArticleCard = ({ article }: { article: typeof articles[0] }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
    <Link to={`/article/${article.slug}`}>
      <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
    </Link>
    <div className="p-6">
      <div className="flex items-center gap-2 mb-3">
        <Tag className="h-4 w-4 text-emerald-600" />
        <span className="text-sm text-emerald-600 font-medium">{article.category}</span>
      </div>
      <Link to={`/article/${article.slug}`}>
        <h3 className="text-xl font-semibold mb-2 hover:text-emerald-600 transition-colors">
          {article.title}
        </h3>
      </Link>
      <p className="text-gray-600 mb-4">{article.excerpt}</p>
      <div className="border-t pt-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-500">By {article.author}</span>
          <span className="text-sm text-gray-500">{new Date(article.publishDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            {article.readTime} read
          </span>
          <div className="flex items-center gap-4">
            <Link
              to={`/article/${article.slug}`}
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Read Article
            </Link>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600"
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

const ProgramCard = ({ program }: { program: typeof wellnessPrograms[0] }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
    <img src={program.image} alt={program.title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        <span className="text-sm text-emerald-600 dark:text-emerald-400">{program.duration}</span>
      </div>
      <h3 className="text-xl font-semibold mb-2 dark:text-white">{program.title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{program.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400">{program.category}</span>
        <span className="text-sm px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full">
          {program.intensity}
        </span>
      </div>
    </div>
  </div>
);

const DailyRoutineCard = ({ routine }: { routine: typeof dailyRoutines[0] }) => {
  const Icon = routine.icon;
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
            <Icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">{routine.time}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">• {routine.dosha}</span>
          </div>
          <h4 className="font-medium mb-1 dark:text-white">{routine.practice}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">{routine.description}</p>
        </div>
      </div>
    </div>
  );
};

export const Recommendations: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-8">
        <Leaf className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
        <h1 className="text-3xl font-bold dark:text-white">Ayurvedic Wisdom</h1>
      </div>

      <TipOfTheDay />

      {/* Daily Routine Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold dark:text-white">Daily Routine (Dinacharya)</h2>
          <button className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1">
            View all <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dailyRoutines.map((routine, index) => (
            <DailyRoutineCard key={index} routine={routine} />
          ))}
        </div>
      </section>

      {/* Wellness Programs Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold dark:text-white">Wellness Programs</h2>
          <button className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1">
            View all <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {wellnessPrograms.map((program, index) => (
            <ProgramCard key={index} program={program} />
          ))}
        </div>
      </section>

      {/* Articles Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold dark:text-white">Recommended Articles</h2>
          <button className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1">
            View all <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
};