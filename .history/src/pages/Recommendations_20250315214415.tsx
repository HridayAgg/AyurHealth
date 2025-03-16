import React from 'react';
import { Sparkles, Book, Leaf } from 'lucide-react';

const articles = [
  {
    title: "Understanding Your Dosha: A Guide to Vata, Pitta, and Kapha",
    excerpt: "Learn about the three fundamental energies that govern our physical and mental processes...",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1600",
    readTime: "5 min"
  },
  {
    title: "Ayurvedic Morning Routine for Balance",
    excerpt: "Start your day with these traditional practices to promote wellness and vitality...",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1600",
    readTime: "4 min"
  },
  {
    title: "Healing Herbs in Ayurveda",
    excerpt: "Discover the powerful healing properties of common Ayurvedic herbs...",
    image: "https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&q=80&w=1600",
    readTime: "6 min"
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
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
      <p className="text-gray-600 mb-4">{article.excerpt}</p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <Book className="h-4 w-4" />
          {article.readTime} read
        </span>
        <button className="text-emerald-600 hover:text-emerald-700 font-medium">
          Read More →
        </button>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
};