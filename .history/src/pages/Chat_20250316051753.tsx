import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Loader2, AlertCircle, Trash2, Info, Moon, Sun, Wind, Droplets, Flame, Flower, Leaf, BookOpen, ChevronUp, ChevronDown } from 'lucide-react';
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
    <div className="h-screen flex flex-col bg-gradient-to-b from-emerald-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-700 dark:to-emerald-800 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
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

      {/* Bottom Knowledge Panel */}
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t border-emerald-100 dark:border-gray-800 shadow-lg transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-y-0' : 'translate-y-[calc(100%-2.5rem)]'
        }`}
      >
        {/* Handle */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 rounded-full p-1 shadow-md hover:bg-emerald-200 dark:hover:bg-emerald-800 transition-colors"
        >
          {isSidebarOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronUp className="h-4 w-4" />
          )}
        </button>

        <div className="h-10 flex items-center px-4 cursor-pointer" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <div className="flex items-center gap-2 text-sm text-emerald-800 dark:text-emerald-200">
            <BookOpen className="h-4 w-4" />
            <span className="font-medium">Ayurvedic Knowledge</span>
          </div>
        </div>

        <div className="max-h-[70vh] overflow-y-auto">
          <div className="p-4 grid grid-cols-3 gap-4">
            {/* Quick Consultations */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <h3 className="text-sm font-medium text-emerald-800 dark:text-emerald-200 mb-3 flex items-center gap-2">
                <Flower className="h-4 w-4" />
                Quick Consultations
              </h3>
              <div className="space-y-2">
                {quickPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickPrompt(prompt.prompt)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors text-sm"
                  >
                    {prompt.icon}
                    <span>{prompt.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dosha Guide */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <h3 className="text-sm font-medium text-emerald-800 dark:text-emerald-200 mb-3 flex items-center gap-2">
                <Wind className="h-4 w-4" />
                Understanding Doshas
              </h3>
              <div className="space-y-2">
                {Object.entries(doshaInfo).map(([dosha, info]) => (
                  <div key={dosha} className="relative">
                    <button
                      onClick={() => setActiveDoshaInfo(activeDoshaInfo === dosha ? null : dosha)}
                      className="w-full flex items-center gap-2 px-3 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors text-sm"
                    >
                      {info.icon}
                      <span className="font-medium">{info.title}</span>
                    </button>
                    {activeDoshaInfo === dosha && (
                      <div className="mt-2 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">{info.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {info.traits.map((trait, index) => (
                            <span
                              key={index}
                              className="px-2 py-0.5 text-xs bg-emerald-100/70 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full"
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

            {/* Tips Section */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-900/30 dark:to-emerald-900/20 rounded-xl p-4 shadow-sm">
              <h3 className="text-sm font-medium text-emerald-800 dark:text-emerald-200 mb-2 flex items-center gap-2">
                <Info className="h-4 w-4" />
                Tips for Better Consultation
              </h3>
              <ul className="text-xs space-y-2 text-emerald-700 dark:text-emerald-300/90">
                <li className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>Share your dosha type and current imbalances</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>Describe your daily routine and diet</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>Mention any specific health concerns</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1">•</span>
                  <span>Be specific about symptoms and their timing</span>
                </li>
              </ul>
            </div>
          </div>
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