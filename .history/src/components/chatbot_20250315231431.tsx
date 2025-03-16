import React, { useState } from 'react';

export const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { user: input, bot: 'Typing...' }];
    setMessages(newMessages);

    try {
      // Simulating a bot response (replace this with actual API logic)
      const response = `Based on Ayurveda principles, consider adding more turmeric to your diet for better digestion.`;
      
      setMessages([...messages, { user: input, bot: response }]);
    } catch (error) {
      setMessages([...messages, { user: input, bot: 'Oops! Something went wrong.' }]);
    }

    setInput('');
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="border p-4 rounded-md space-y-2">
        {messages.map((msg, idx) => (
          <div key={idx} className="space-y-1">
            <p className="text-blue-600">You: {msg.user}</p>
            <p className="text-green-600">AyurBot: {msg.bot}</p>
          </div>
        ))}
      </div>

      <div className="flex mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AyurBot anything..."
          className="flex-1 border p-2 rounded-l-md"
        />
        <button
          onClick={sendMessage}
          className="bg-emerald-600 text-white px-4 py-2 rounded-r-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};
