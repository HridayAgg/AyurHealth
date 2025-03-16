import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, Book, Leaf, Clock, Tag, ExternalLink,
  Calendar, PlayCircle, Star, Users, ArrowRight,
  BookOpen, Activity, Moon, Sun, Flame, Wind, 
  Droplets, Heart, Flower2, Lotus, Brain, Apple,
  Utensils, Sunrise, Sunset
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

const additionalPrograms = [
  {
    title: "Vata Balancing Journey",
    description: "Stabilize and ground Vata dosha with warming, nourishing practices and routines.",
    duration: "28 days",
    intensity: "Gentle",
    category: "Dosha Balance",
    primaryDosha: "Vata",
    image: "https://images.unsplash.com/photo-1602192509154-0b900ee1f851?auto=format&fit=crop&q=80&w=1600",
  },
  {
    title: "Pitta Harmony Program",
    description: "Cool and balance Pitta dosha with refreshing practices and mindful routines.",
    duration: "28 days",
    intensity: "Moderate",
    category: "Dosha Balance",
    primaryDosha: "Pitta",
    image: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&q=80&w=1600",
  },
  {
    title: "Kapha Vitality Series",
    description: "Energize and invigorate Kapha dosha with dynamic practices and routines.",
    duration: "28 days",
    intensity: "Energetic",
    category: "Dosha Balance",
    primaryDosha: "Kapha",
    image: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&q=80&w=1600",
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
  },
  ...additionalPrograms
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

const seasonalWisdom = {
  spring: {
    dosha: "Kapha",
    qualities: ["Light", "Warm", "Dry"],
    foods: ["Bitter greens", "Sprouted grains", "Honey"],
    practices: ["Morning exercise", "Dry brushing", "Steam therapy"],
    herbs: ["Ginger", "Tulsi", "Turmeric"]
  },
  summer: {
    dosha: "Pitta",
    qualities: ["Cool", "Sweet", "Liquid"],
    foods: ["Coconut water", "Sweet fruits", "Mint"],
    practices: ["Moonlight walks", "Cool showers", "Meditation"],
    herbs: ["Brahmi", "Amalaki", "Shatavari"]
  },
  autumn: {
    dosha: "Vata",
    qualities: ["Warm", "Moist", "Grounding"],
    foods: ["Root vegetables", "Warm soups", "Ghee"],
    practices: ["Oil massage", "Gentle yoga", "Early sleep"],
    herbs: ["Ashwagandha", "Licorice", "Cardamom"]
  }
};

const expandedDailyRoutines = [
  ...dailyRoutines,
  {
    time: "7:30 AM",
    practice: "Abhyanga (Self-massage)",
    description: "Warm oil massage to nourish tissues and calm the nervous system",
    dosha: "Especially for Vata",
    icon: Droplets,
  },
  {
    time: "8:00 AM",
    practice: "Nasya (Nasal Care)",
    description: "Nasal oil application for clarity and prana flow",
    dosha: "All doshas",
    icon: Wind,
  },
  {
    time: "12:00 PM",
    practice: "Mindful Lunch",
    description: "Main meal of the day when digestion is strongest",
    dosha: "All doshas",
    icon: Flame,
  }
];

const herbWisdom = [
  {
    name: "Ashwagandha",
    benefits: ["Stress relief", "Energy", "Sleep"],
    doshas: ["Vata", "Kapha"],
    icon: Flower2,
  },
  {
    name: "Brahmi",
    benefits: ["Mental clarity", "Memory", "Calm"],
    doshas: ["Pitta", "Vata"],
    icon: Leaf,
  },
  {
    name: "Triphala",
    benefits: ["Digestion", "Detox", "Balance"],
    doshas: ["All doshas"],
    icon: Heart,
  }
];

const panchakarmaTherapies = [
  {
    name: "Vamana",
    description: "Therapeutic emesis for Kapha conditions",
    benefits: ["Respiratory health", "Digestive clarity", "Mental freshness"],
    suitableFor: ["Kapha imbalances", "Respiratory conditions", "Digestive issues"],
    duration: "3-7 days",
    season: "Spring",
    icon: Sunrise
  },
  {
    name: "Virechana",
    description: "Therapeutic purgation for Pitta balance",
    benefits: ["Liver health", "Skin clarity", "Emotional balance"],
    suitableFor: ["Pitta imbalances", "Skin conditions", "Liver issues"],
    duration: "3-5 days",
    season: "Summer",
    icon: Sun
  },
  {
    name: "Basti",
    description: "Therapeutic enema for Vata harmony",
    benefits: ["Joint health", "Nervous system balance", "Digestive strength"],
    suitableFor: ["Vata imbalances", "Joint issues", "Nervous system disorders"],
    duration: "5-7 days",
    season: "Fall/Winter",
    icon: Wind
  }
];

const nutritionGuidelines = {
  vata: {
    tastes: ["Sweet", "Sour", "Salty"],
    avoid: ["Bitter", "Astringent", "Pungent"],
    foods: ["Warm soups", "Cooked grains", "Healthy oils"],
    spices: ["Ginger", "Cinnamon", "Cardamom"],
    eating_habits: ["Eat warm foods", "Regular timing", "Peaceful environment"]
  },
  pitta: {
    tastes: ["Sweet", "Bitter", "Astringent"],
    avoid: ["Sour", "Salty", "Pungent"],
    foods: ["Cool fruits", "Fresh vegetables", "Whole grains"],
    spices: ["Coriander", "Fennel", "Mint"],
    eating_habits: ["Cool or warm foods", "Moderate portions", "Relaxed pace"]
  },
  kapha: {
    tastes: ["Pungent", "Bitter", "Astringent"],
    avoid: ["Sweet", "Sour", "Salty"],
    foods: ["Light grains", "Steamed vegetables", "Legumes"],
    spices: ["Black pepper", "Turmeric", "Cumin"],
    eating_habits: ["Light meals", "Energetic environment", "No snacking"]
  }
};

const breathingPractices = [
  {
    name: "Nadi Shodhana",
    description: "Alternate nostril breathing for balance",
    benefits: ["Mental clarity", "Stress relief", "Dosha balance"],
    duration: "5-10 minutes",
    timeOfDay: "Morning/Evening",
    icon: Wind
  },
  {
    name: "Bhramari",
    description: "Humming bee breath for calm",
    benefits: ["Anxiety relief", "Better sleep", "Mental peace"],
    duration: "3-5 minutes",
    timeOfDay: "Evening",
    icon: Moon
  },
  {
    name: "Kapalbhati",
    description: "Skull shining breath for energy",
    benefits: ["Mental alertness", "Digestive strength", "Detoxification"],
    duration: "5-7 minutes",
    timeOfDay: "Morning",
    icon: Sun
  }
];

const TipOfTheDay = () => {
  const [tipIndex] = useState(0);
  const tips = [
    {
      title: "Morning Ritual",
      content: "Start your day with a warm glass of water with lemon to stimulate digestion and cleanse your system.",
      benefit: "Helps balance doshas and promote overall wellness",
      doshaAffinity: "Good for all doshas, especially Kapha"
    },
    {
      title: "Mindful Eating",
      content: "Take time to sit and eat mindfully, avoiding distractions like phones or TV.",
      benefit: "Improves digestion and nutrient absorption",
      doshaAffinity: "Essential for Vata balance"
    },
    {
      title: "Evening Practice",
      content: "Apply warm oil to your feet before bed for better sleep quality.",
      benefit: "Promotes relaxation and grounds Vata energy",
      doshaAffinity: "Especially beneficial for Vata and Pitta"
    },
    {
      title: "Seasonal Wisdom",
      content: "Adjust your diet and lifestyle according to the current season to maintain balance.",
      benefit: "Prevents dosha imbalances and supports natural rhythms",
      doshaAffinity: "Important for all doshas"
    }
  ];

  return (
    <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
        <h2 className="text-xl font-semibold dark:text-white">Ayurvedic Wisdom of the Day</h2>
      </div>
      <h3 className="font-medium text-lg mb-2 text-emerald-700 dark:text-emerald-300">{tips[tipIndex].title}</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-2">{tips[tipIndex].content}</p>
      <p className="text-sm text-emerald-600 dark:text-emerald-400 mb-1">Benefit: {tips[tipIndex].benefit}</p>
      <p className="text-sm text-purple-600 dark:text-purple-400">Dosha Affinity: {tips[tipIndex].doshaAffinity}</p>
    </div>
  );
};

const SeasonalWisdomCard = () => {
  const currentSeason = 'spring'; // This could be dynamic based on current date
  const wisdom = seasonalWisdom[currentSeason];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
        <h3 className="text-xl font-semibold dark:text-white">Seasonal Wisdom ({currentSeason})</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-medium text-emerald-600 dark:text-emerald-400 mb-2">Dominant Dosha</h4>
          <p className="text-gray-700 dark:text-gray-300">{wisdom.dosha}</p>
          <div className="mt-2">
            <h5 className="font-medium text-emerald-600 dark:text-emerald-400 mb-1">Qualities:</h5>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              {wisdom.qualities.map((quality, index) => (
                <li key={index}>{quality}</li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h4 className="font-medium text-emerald-600 dark:text-emerald-400 mb-2">Recommended Foods</h4>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            {wisdom.foods.map((food, index) => (
              <li key={index}>{food}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-emerald-600 dark:text-emerald-400 mb-2">Beneficial Practices</h4>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            {wisdom.practices.map((practice, index) => (
              <li key={index}>{practice}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const HerbWisdomCard = ({ herb }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
          <herb.icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        </div>
      </div>
      <div>
        <h4 className="font-medium mb-1 dark:text-white">{herb.name}</h4>
        <div className="text-sm text-gray-600 dark:text-gray-300">
          <p className="mb-1">Benefits: {herb.benefits.join(", ")}</p>
          <p className="text-emerald-600 dark:text-emerald-400">Suitable for: {herb.doshas.join(", ")}</p>
        </div>
      </div>
    </div>
  </div>
);

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

const DailyRoutineCard = ({ routine }: { routine: typeof expandedDailyRoutines[0] }) => {
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

const PanchakarmaCard = ({ therapy }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
        <therapy.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
      </div>
      <div>
        <h3 className="text-lg font-semibold dark:text-white">{therapy.name}</h3>
        <p className="text-sm text-emerald-600 dark:text-emerald-400">{therapy.duration} • {therapy.season}</p>
      </div>
    </div>
    <p className="text-gray-600 dark:text-gray-300 mb-4">{therapy.description}</p>
    <div className="space-y-3">
      <div>
        <h4 className="font-medium text-emerald-600 dark:text-emerald-400 mb-1">Benefits:</h4>
        <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
          {therapy.benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-medium text-emerald-600 dark:text-emerald-400 mb-1">Suitable for:</h4>
        <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
          {therapy.suitableFor.map((condition, index) => (
            <li key={index}>{condition}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const BreathingPracticeCard = ({ practice }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
          <practice.icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        </div>
      </div>
      <div>
        <h4 className="font-medium mb-1 dark:text-white">{practice.name}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{practice.description}</p>
        <div className="text-sm">
          <p className="text-emerald-600 dark:text-emerald-400 mb-1">Benefits: {practice.benefits.join(", ")}</p>
          <p className="text-gray-500 dark:text-gray-400">
            {practice.duration} • Best practiced: {practice.timeOfDay}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const NutritionGuidelinesCard = ({ doshaType, guidelines }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold mb-4 dark:text-white capitalize">{doshaType} Nutrition</h3>
    <div className="space-y-4">
      <div>
        <h4 className="font-medium text-emerald-600 dark:text-emerald-400 mb-2">Favorable Tastes:</h4>
        <div className="flex flex-wrap gap-2">
          {guidelines.tastes.map((taste, index) => (
            <span key={index} className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-sm">
              {taste}
            </span>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-medium text-emerald-600 dark:text-emerald-400 mb-2">Recommended Foods:</h4>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
          {guidelines.foods.map((food, index) => (
            <li key={index}>{food}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-medium text-emerald-600 dark:text-emerald-400 mb-2">Eating Habits:</h4>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
          {guidelines.eating_habits.map((habit, index) => (
            <li key={index}>{habit}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export const Recommendations: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-8">
        <Leaf className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
        <h1 className="text-3xl font-bold dark:text-white">Ayurvedic Wisdom</h1>
      </div>

      <TipOfTheDay />
      <SeasonalWisdomCard />

      {/* Daily Routine Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold dark:text-white">Daily Routine (Dinacharya)</h2>
          <button className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1">
            View all <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {expandedDailyRoutines.map((routine, index) => (
            <DailyRoutineCard key={index} routine={routine} />
          ))}
        </div>
      </section>

      {/* Panchakarma Therapies Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold dark:text-white">Panchakarma Therapies</h2>
          <button className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1">
            Learn more <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {panchakarmaTherapies.map((therapy, index) => (
            <PanchakarmaCard key={index} therapy={therapy} />
          ))}
        </div>
      </section>

      {/* Breathing Practices Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold dark:text-white">Pranayama Practices</h2>
          <button className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1">
            View all <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {breathingPractices.map((practice, index) => (
            <BreathingPracticeCard key={index} practice={practice} />
          ))}
        </div>
      </section>

      {/* Nutrition Guidelines Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold dark:text-white">Dosha-Specific Nutrition</h2>
          <button className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1">
            View details <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(nutritionGuidelines).map(([dosha, guidelines], index) => (
            <NutritionGuidelinesCard key={index} doshaType={dosha} guidelines={guidelines} />
          ))}
        </div>
      </section>

      {/* Herbal Wisdom Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold dark:text-white">Herbal Wisdom</h2>
          <button className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1">
            View all <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {herbWisdom.map((herb, index) => (
            <HerbWisdomCard key={index} herb={herb} />
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