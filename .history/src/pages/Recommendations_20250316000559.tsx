import React from 'react';
import { Sparkles, Book, Leaf, Clock, Tag, ExternalLink } from 'lucide-react';

const articles = [
  {
    title: "Understanding Your Dosha: A Guide to Vata, Pitta, and Kapha",
    excerpt: "Learn about the three fundamental energies that govern our physical and mental processes according to Ayurvedic medicine. Discover your dominant dosha and how it influences your health.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1600",
    readTime: "5 min",
    author: "Dr. Anjali Sharma",
    category: "Ayurvedic Basics",
    url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3215408/",
    publishDate: "2024-03-15"
  },
  {
    title: "Ayurvedic Morning Routine for Balance",
    excerpt: "Start your day with these traditional practices to promote wellness and vitality. Learn about oil pulling, tongue scraping, and other essential morning rituals that can transform your health.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1600",
    readTime: "4 min",
    author: "Maya Patel",
    category: "Daily Practices",
    url: "https://www.healthline.com/health/ayurvedic-morning-routine",
    publishDate: "2024-03-10"
  },
  {
    title: "Healing Herbs in Ayurveda",
    excerpt: "Discover the powerful healing properties of common Ayurvedic herbs like Ashwagandha, Turmeric, Holy Basil, and more. Learn how to incorporate these herbs into your daily wellness routine.",
    image: "https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&q=80&w=1600",
    readTime: "6 min",
    author: "Dr. Rajesh Kumar",
    category: "Herbal Medicine",
    url: "https://www.hopkinsmedicine.org/health/wellness-and-prevention/ayurveda",
    publishDate: "2024-03-08"
  },
  {
    title: "Seasonal Eating in Ayurveda: A Guide to Ritucharya",
    excerpt: "Understand how to align your diet with nature's rhythms through the practice of Ritucharya. Learn which foods are best for each season to maintain optimal health.",
    image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&q=80&w=1600",
    readTime: "7 min",
    author: "Sarah Johnson",
    category: "Nutrition",
    url: "https://www.ayurveda.com/resources/seasonal-eating",
    publishDate: "2024-03-05"
  }
];

const TipOfTheDay = () => (
  <div className="bg-emerald-50 rounded-lg p-6 mb-8">
    <div className="flex items-center gap-2 mb-4">
      <Sparkles className="h-6 w-6 text-emerald-600" />
      <h2 className="text-xl font-semibold">Tip of the Day</h2>
    </div>
    <p className="text-gray-700">
      Start your day with a warm glass of water with lemon to stimulate digestion and cleanse your system. 
      This simple Ayurvedic practice helps balance your doshas and promote overall wellness.
    </p>
  </div>
);

const ArticleCard = ({ article }: { article: typeof articles[0] }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
    <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <div className="flex items-center gap-2 mb-3">
        <Tag className="h-4 w-4 text-emerald-600" />
        <span className="text-sm text-emerald-600 font-medium">{article.category}</span>
      </div>
      <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
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
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
          >
            Read More
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  </div>
);

export const Recommendations: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-8">
        <Leaf className="h-8 w-8 text-emerald-600" />
        <h1 className="text-3xl font-bold">Ayurvedic Wisdom</h1>
      </div>

      <TipOfTheDay />

      <h2 className="text-2xl font-semibold mb-6">Recommended Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
};