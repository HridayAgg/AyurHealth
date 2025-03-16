import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, AlertCircle } from 'lucide-react';
import OpenAIService from '../services/openai';
import GoogleFitService from '../services/googleFit';

interface Message {
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export const AyurvedaChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([{
    role: 'bot',
    content: `Namaste! I am your Ayurvedic health assistant, combining ancient wisdom with modern health data. I can help you with:

• Personalized health recommendations based on Ayurvedic principles
• Dietary and lifestyle advice aligned with your dosha
• Natural remedies and wellness practices
• Interpretation of your health metrics through an Ayurvedic lens

How may I assist you today?`,
    timestamp: new Date()
  }]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const openAIService = useRef(OpenAIService.getInstance());

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
    console.log('Chat component mounted');
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    console.log('Sending message:', userMessage);
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      // Get health data if connected to Google Fit
      let healthData = undefined;
      const googleFitService = GoogleFitService.getInstance();
      
      if (googleFitService.isSignedIn()) {
        console.log('Fetching Google Fit data...');
        const now = Date.now();
        const dayAgo = now - 24 * 60 * 60 * 1000;
        
        try {
          const [activityData, heartRateData] = await Promise.all([
            googleFitService.fetchActivityData(dayAgo, now),
            googleFitService.fetchHeartRateData(dayAgo, now)
          ]);

          healthData = {
            steps: activityData?.bucket?.[0]?.dataset?.[0]?.point?.[0]?.value?.[0]?.intVal || 0,
            heartRate: heartRateData?.bucket?.[0]?.dataset?.[0]?.point?.[0]?.value?.[0]?.fpVal || 0,
          };
          console.log('Health data fetched:', healthData);
        } catch (error) {
          console.error('Error fetching health data:', error);
        }
      }

      console.log('Requesting Ayurveda advice...');
      const response = await openAIService.current.getAyurvedaAdvice(
        userMessage.content,
        healthData
      );

      console.log('Received response:', response);
      const botMessage: Message = {
        role: 'bot',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error in chat handler:', error);
      setError(error instanceof Error ? error.message : 'Failed to get response. Please try again.');
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 dark:text-white'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <p className="text-xs mt-1 opacity-70">
                {formatDate(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <p className="text-sm dark:text-white">Thinking...</p>
            </div>
          </div>
        )}
        {error && (
          <div className="flex justify-center">
            <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-200 p-3 rounded-lg flex items-center space-x-2">
              <AlertCircle className="h-4 w-4" />
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          ref={inputRef}
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask your Ayurveda health question..."
          className="flex-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !inputMessage.trim()}
          className="bg-emerald-500 text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-600 transition-colors"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}; 