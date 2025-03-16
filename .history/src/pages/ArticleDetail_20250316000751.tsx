import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Leaf, Clock, Tag, ExternalLink, ArrowLeft } from 'lucide-react';
import { articles } from './Recommendations';

export const ArticleDetail: React.FC = () => {
  const { slug } = useParams();
  
  const article = articles.find(a => 
    a.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug
  );

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h1>
        <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
        <Link to="/recommendations" className="text-emerald-600 hover:text-emerald-700 font-medium">
          ← Back to Recommendations
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link 
        to="/recommendations"
        className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-8"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Recommendations
      </Link>

      <article>
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-[400px] object-cover rounded-xl mb-8"
        />

        <div className="flex items-center gap-2 mb-4">
          <Tag className="h-5 w-5 text-emerald-600" />
          <span className="text-sm text-emerald-600 font-medium">{article.category}</span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-8 pb-8 border-b">
          <span>By {article.author}</span>
          <span>{new Date(article.publishDate).toLocaleDateString()}</span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {article.readTime} read
          </span>
        </div>

        {/* Full article content */}
        <div className="prose prose-emerald max-w-none">
          <p className="text-lg text-gray-600 mb-6">{article.excerpt}</p>
          
          {article.slug === 'understanding-your-dosha-a-guide-to-vata-pitta-and-kapha' && (
            <>
              <h2 className="text-2xl font-semibold mt-8 mb-4">The Three Doshas</h2>
              <p className="mb-6">
                In Ayurvedic medicine, the three doshas—Vata, Pitta, and Kapha—are biological energies that govern physical and mental processes. Understanding your dominant dosha can help you maintain balance in your life through appropriate diet, exercise, and lifestyle choices.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Vata Dosha</h3>
              <p className="mb-4">
                Vata is composed of air and space elements. It governs movement in the body, including breathing, muscle movement, and nerve impulses. People with a dominant Vata dosha tend to be creative, energetic, and quick-thinking.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Pitta Dosha</h3>
              <p className="mb-4">
                Pitta represents fire and water elements. It governs digestion, metabolism, and energy production. Pitta-dominant individuals are often intelligent, focused, and natural leaders.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Kapha Dosha</h3>
              <p className="mb-4">
                Kapha combines earth and water elements. It provides structure and lubrication in the body. Those with a dominant Kapha dosha are typically calm, grounded, and nurturing.
              </p>
            </>
          )}

          {/* Add more content sections for other articles based on their slugs */}

          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Additional Resources</h3>
            <p className="text-gray-600 mb-4">
              For more detailed information on this topic, you can check out these trusted external sources:
            </p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-emerald-600 hover:text-emerald-700"
            >
              View Research Paper
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}; 