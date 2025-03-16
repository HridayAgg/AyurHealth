import React, { useState } from 'react';
import { Leaf, Droplets, Flame, Flower, Star, ShoppingBag, Search, ShoppingCart } from 'lucide-react';
import { Button } from '../components/Button';
import { useCart } from '../contexts/CartContext';
import { Cart } from '../components/Cart';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  benefits: string[];
  image: string;
}

const productCategories = [
  { id: 'herbs', name: 'Herbs & Supplements', icon: <Leaf className="h-5 w-5" /> },
  { id: 'oils', name: 'Essential Oils', icon: <Droplets className="h-5 w-5" /> },
  { id: 'teas', name: 'Herbal Teas', icon: <Flame className="h-5 w-5" /> },
  { id: 'beauty', name: 'Natural Beauty', icon: <Flower className="h-5 w-5" /> },
];

// Convert prices to rupees (approximate conversion rate: 1 USD = 75 INR)
const products: Product[] = [
  {
    id: '1',
    name: 'Ashwagandha Root Powder',
    description: 'Organic stress-relief and energy supplement',
    price: 1875, // 24.99 USD * 75
    rating: 4.8,
    category: 'herbs',
    benefits: ['Reduces stress', 'Boosts immunity', 'Improves sleep'],
    image: 'ashwagandha.jpg'
  },
  {
    id: '2',
    name: 'Triphala Blend',
    description: 'Traditional digestive support formula',
    price: 1499, // 19.99 USD * 75
    rating: 4.7,
    category: 'herbs',
    benefits: ['Digestive health', 'Detoxification', 'Antioxidant support'],
    image: 'triphala.jpg'
  },
  {
    id: '3',
    name: 'Brahmi Oil',
    description: 'Natural hair and scalp treatment',
    price: 2250, // 29.99 USD * 75
    rating: 4.9,
    category: 'oils',
    benefits: ['Hair growth', 'Scalp health', 'Mental clarity'],
    image: 'brahmi-oil.jpg'
  },
  {
    id: '4',
    name: 'Calming Vata Tea',
    description: 'Organic herbal blend for balance',
    price: 1199, // 15.99 USD * 75
    rating: 4.6,
    category: 'teas',
    benefits: ['Stress relief', 'Better sleep', 'Digestive comfort'],
    image: 'vata-tea.jpg'
  },
  {
    id: '5',
    name: 'Kumkumadi Face Oil',
    description: 'Authentic Ayurvedic beauty elixir',
    price: 2999, // 39.99 USD * 75
    rating: 4.9,
    category: 'beauty',
    benefits: ['Skin brightening', 'Anti-aging', 'Even tone'],
    image: 'kumkumadi.jpg'
  }
];

export const Marketplace: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addToCart, totalItems } = useCart();

  const filteredProducts = products.filter(product => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.benefits.some(benefit => benefit.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Ayurvedic Marketplace</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Discover authentic Ayurvedic products for your wellness journey
            </p>
          </div>
          <Button
            onClick={() => setIsCartOpen(true)}
            variant="secondary"
            className="flex items-center gap-2"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Cart ({totalItems})</span>
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border-2 border-emerald-100 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-emerald-300 dark:focus:border-emerald-600"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="flex gap-2">
              {productCategories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                  variant={selectedCategory === category.id ? 'default' : 'secondary'}
                  className="flex items-center gap-2"
                >
                  {category.icon}
                  <span className="hidden md:inline">{category.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-emerald-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-w-16 aspect-h-9 bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
                <ShoppingBag className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                  <div className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-full">
                    <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{product.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{product.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.benefits.map((benefit, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <Button
                    onClick={() => {
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price
                      });
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No products found matching your criteria.</p>
          </div>
        )}
      </div>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}; 