import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Loader2, AlertCircle, Trash2, Info, Moon, Sun, Wind, Droplets, Flame, Flower, Leaf, BookOpen, PanelLeftClose, PanelLeftOpen, ShoppingBag, Star, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Button } from '../components/Button';
import OpenAIService from '../services/openai';
import MemoryService from '../services/memoryService';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface QuickPrompt {
  icon: React.ReactNode;
  text: string;
  prompt: string;
}

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

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "🙏 Namaste! I am your Ayurvedic wellness guide, here to help you achieve balance and well-being through traditional Ayurvedic wisdom. How may I assist you today?",
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [activeDoshaInfo, setActiveDoshaInfo] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const openAIService = OpenAIService.getInstance();
  const memoryService = MemoryService.getInstance();
  const [activeTab, setActiveTab] = useState<'chat' | 'marketplace'>('chat');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const quickPrompts: QuickPrompt[] = [
    {
      icon: <Flower className="h-4 w-4" />,
      text: "What's my dosha?",
      prompt: "Can you help me determine my dosha type? Please ask me relevant questions to identify my constitution."
    },
    {
      icon: <Leaf className="h-4 w-4" />,
      text: "Daily routine",
      prompt: "What should be an ideal Ayurvedic daily routine (dinacharya) for optimal health?"
    },
    {
      icon: <BookOpen className="h-4 w-4" />,
      text: "Ayurvedic basics",
      prompt: "Can you explain the basic principles of Ayurveda in simple terms?"
    }
  ];

  const doshaInfo = {
    vata: {
      icon: <Wind className="h-6 w-6" />,
      title: "Vata Dosha",
      description: "Air & Space element. Creative, quick, and adaptable.",
      traits: ["Light", "Cold", "Dry", "Irregular", "Rough", "Moving", "Quick", "Changeable"]
    },
    pitta: {
      icon: <Flame className="h-6 w-6" />,
      title: "Pitta Dosha",
      description: "Fire & Water element. Intelligent, focused, and ambitious.",
      traits: ["Hot", "Sharp", "Light", "Liquid", "Spreading", "Oily", "Intense", "Acidic"]
    },
    kapha: {
      icon: <Droplets className="h-6 w-6" />,
      title: "Kapha Dosha",
      description: "Earth & Water element. Stable, calm, and nurturing.",
      traits: ["Heavy", "Slow", "Cool", "Oily", "Smooth", "Dense", "Soft", "Static"]
    }
  };

  const productCategories = [
    { id: 'herbs', name: 'Herbs & Supplements', icon: <Leaf className="h-4 w-4" /> },
    { id: 'oils', name: 'Essential Oils', icon: <Droplets className="h-4 w-4" /> },
    { id: 'teas', name: 'Herbal Teas', icon: <Flame className="h-4 w-4" /> },
    { id: 'beauty', name: 'Natural Beauty', icon: <Flower className="h-4 w-4" /> },
  ];

  const products: Product[] = [
    {
      id: '1',
      name: 'Ashwagandha Root Powder',
      description: 'Organic stress-relief and energy supplement',
      price: 24.99,
      rating: 4.8,
      category: 'herbs',
      benefits: ['Reduces stress', 'Boosts immunity', 'Improves sleep'],
      image: 'ashwagandha.jpg'
    },
    {
      id: '2',
      name: 'Triphala Blend',
      description: 'Traditional digestive support formula',
      price: 19.99,
      rating: 4.7,
      category: 'herbs',
      benefits: ['Digestive health', 'Detoxification', 'Antioxidant support'],
      image: 'triphala.jpg'
    },
    {
      id: '3',
      name: 'Brahmi Oil',
      description: 'Natural hair and scalp treatment',
      price: 29.99,
      rating: 4.9,
      category: 'oils',
      benefits: ['Hair growth', 'Scalp health', 'Mental clarity'],
      image: 'brahmi-oil.jpg'
    },
    {
      id: '4',
      name: 'Calming Vata Tea',
      description: 'Organic herbal blend for balance',
      price: 15.99,
      rating: 4.6,
      category: 'teas',
      benefits: ['Stress relief', 'Better sleep', 'Digestive comfort'],
      image: 'vata-tea.jpg'
    },
    {
      id: '5',
      name: 'Kumkumadi Face Oil',
      description: 'Authentic Ayurvedic beauty elixir',
      price: 39.99,
      rating: 4.9,
      category: 'beauty',
      benefits: ['Skin brightening', 'Anti-aging', 'Even tone'],
      image: 'kumkumadi.jpg'
    }
  ];

  useEffect(() => {
    // Load previous messages from memory on component mount
    const previousMessages = memoryService.getRecentMessages();
    if (previousMessages.length > 0) {
      setMessages(previousMessages.map((msg, index) => ({
        id: index.toString(),
        content: msg.content,
        role: msg.role as 'user' | 'assistant',
        timestamp: new Date(),
      })));
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      memoryService.addMessage('user', input);
      const messageHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      messageHistory.push({ role: 'user', content: input });

      const response = await openAIService.getAyurvedicResponse(messageHistory);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response || 'I apologize, but I was unable to generate a response. Please try again.',
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Chat error:', error);
      setError(error.message || 'Failed to get response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearMemory = () => {
    memoryService.clearMemory();
    setMessages([{
      id: '1',
      content: "🙏 Namaste! I am your Ayurvedic wellness guide, here to help you achieve balance and well-being through traditional Ayurvedic wisdom. How may I assist you today?",
      role: 'assistant',
      timestamp: new Date(),
    }]);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="h-screen flex bg-gradient-to-b from-emerald-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Sidebar */}
      <div 
        className={`${
          isSidebarOpen ? 'w-80' : 'w-0'
        } transition-all duration-300 ease-in-out border-r border-emerald-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm overflow-hidden`}
      >
        <div className="w-80 p-6">
          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'chat'
                  ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-emerald-50 dark:hover:bg-gray-800'
              }`}
            >
              Chat
            </button>
            <button
              onClick={() => setActiveTab('marketplace')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                activeTab === 'marketplace'
                  ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-emerald-50 dark:hover:bg-gray-800'
              }`}
            >
              Marketplace
            </button>
          </div>

          {activeTab === 'chat' ? (
            <>
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-emerald-800 dark:text-emerald-200 mb-4">Quick Actions</h2>
                <div className="space-y-2">
                  {quickPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickPrompt(prompt.prompt)}
                      className="w-full flex items-center gap-3 px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      {prompt.icon}
                      <span>{prompt.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-semibold text-emerald-800 dark:text-emerald-200 mb-4">Doshas</h2>
                <div className="space-y-3">
                  {Object.entries(doshaInfo).map(([dosha, info]) => (
                    <div
                      key={dosha}
                      className="relative"
                    >
                      <button
                        onClick={() => setActiveDoshaInfo(activeDoshaInfo === dosha ? null : dosha)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        {info.icon}
                        <span className="font-medium">{info.title}</span>
                      </button>
                      {activeDoshaInfo === dosha && (
                        <div className="mt-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{info.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {info.traits.map((trait, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 text-xs bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full"
                              >
                                {trait}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-emerald-800 dark:text-emerald-200 mb-4">
                  Ayurvedic Products
                </h2>
                <div className="space-y-2">
                  {productCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {category.icon}
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <ChevronRight className={`h-4 w-4 transition-transform ${
                        selectedCategory === category.id ? 'rotate-90' : ''
                      }`} />
                    </button>
                  ))}
                </div>
              </div>

              {selectedCategory && (
                <div className="space-y-4">
                  {products
                    .filter(product => product.category === selectedCategory)
                    .map(product => (
                      <div
                        key={product.id}
                        className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-emerald-100 dark:border-gray-700"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                            <ShoppingBag className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 dark:text-gray-100">{product.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{product.description}</p>
                            <div className="mt-2 flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">{product.rating}</span>
                              </div>
                              <span className="font-medium text-emerald-600 dark:text-emerald-400">
                                ${product.price}
                              </span>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {product.benefits.map((benefit, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 text-xs bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full"
                                >
                                  {benefit}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              <div className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                <p className="mb-2">All products are certified organic and follow traditional Ayurvedic formulations.</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-700 dark:to-emerald-800 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                variant="secondary"
                className="!bg-white/10 !text-white hover:!bg-white/20"
              >
                {isSidebarOpen ? (
                  <PanelLeftClose className="h-5 w-5" />
                ) : (
                  <PanelLeftOpen className="h-5 w-5" />
                )}
              </Button>
              <div className="bg-white/10 rounded-lg p-2">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">AyurBot</h1>
                <p className="text-sm text-emerald-100">Your Ayurvedic Wellness Guide</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setShowInfo(!showInfo)}
                variant="secondary"
                className="!bg-white/10 !text-white hover:!bg-white/20"
              >
                <Info className="h-5 w-5" />
              </Button>
              <Button
                onClick={handleClearMemory}
                variant="secondary"
                className="!bg-white/10 !text-white hover:!bg-white/20"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        {showInfo && (
          <div className="bg-emerald-50 dark:bg-gray-800/50 p-4 border-b border-emerald-100 dark:border-gray-800">
            <h3 className="font-medium text-emerald-800 dark:text-emerald-300 mb-2">How to interact with AyurBot:</h3>
            <ul className="text-sm text-emerald-700 dark:text-emerald-200 space-y-1">
              <li>• Share your dosha type: "My dosha is Vata"</li>
              <li>• Mention your prakruti: "My constitution is Vata-Pitta"</li>
              <li>• Describe your agni: "My digestive fire is weak"</li>
              <li>• Tell about your diet: "I follow a sattvic diet"</li>
              <li>• Share your routine: "I wake up at 6 AM"</li>
            </ul>
          </div>
        )}

        {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mr-2">
                  <Bot className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
                </div>
              )}
                <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                    message.role === 'user'
                    ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white ml-12'
                    : 'bg-emerald-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                  }`}
                >
                {message.role === 'assistant' ? (
                  <div className="markdown-content prose dark:prose-invert prose-sm max-w-none prose-headings:text-emerald-700 dark:prose-headings:text-emerald-300 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-strong:text-emerald-600 dark:prose-strong:text-emerald-400">
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap">{message.content}</p>
                )}
                  <span className="text-xs opacity-70 block mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
              </div>
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center ml-2">
                  <span className="text-sm text-white font-medium">You</span>
                </div>
              )}
              </div>
            ))}
            {isLoading && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                <Bot className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
              </div>
              <div className="bg-emerald-50 dark:bg-gray-800 rounded-2xl p-4">
                <Loader2 className="h-5 w-5 animate-spin text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          )}
          {error && (
            <div className="flex justify-center">
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg p-4 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span>{error}</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

        {/* Input Area */}
        <div className="border-t border-emerald-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about Ayurvedic remedies, practices, or lifestyle..."
                className="w-full resize-none rounded-xl border-2 border-emerald-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 pr-12 focus:outline-none focus:border-emerald-300 dark:focus:border-emerald-600 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                rows={2}
              />
              <Button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 bottom-2 !rounded-lg"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            Press Enter to send • Shift + Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
};

// Temporary function to simulate responses
function getAyurvedicResponse(input: string): string {
  const responses = [
    "In Ayurvedic tradition, this condition is often associated with a Vata imbalance. I'd recommend warm oil massage (abhyanga) and maintaining a regular daily routine (dinacharya).",
    "According to Ayurvedic principles, the herbs Ashwagandha and Brahmi could be beneficial for your concern. They're known as adaptogenic herbs that help balance the body's systems.",
    "Ayurveda suggests starting your day with a glass of warm water with lemon to stimulate agni (digestive fire) and support natural detoxification processes.",
    "Based on Ayurvedic wisdom, this might indicate a Pitta imbalance. Consider incorporating cooling foods and herbs like cilantro, cucumber, and mint into your diet.",
    "The ancient texts of Ayurveda recommend meditation and pranayama (breathing exercises) for this situation, as they help balance both mind and body.",
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}