import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hello, I'm Anna.AI. How can I assist you with food waste management today?" }
  ]);
  const [inputText, setInputText] = useState('');

  const quickActions = ['Leftover Recipes', 'Storage Tips', 'Sustainability Facts'];

  useEffect(() => {
    const openChat = () => setIsOpen(true);
    window.addEventListener('openChatbot', openChat);
    return () => window.removeEventListener('openChatbot', openChat);
  }, []);

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages([...messages, { role: 'user', text: inputText }]);
      setInputText('');
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'bot', text: 'Thank you for your query — this is a demo response.' }]);
      }, 800);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-600 hover:bg-green-700 
                     text-white rounded-full shadow-lg flex items-center justify-center 
                     transition-all duration-300 hover:scale-105"
          aria-label="Open chatbot"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[560px] bg-white dark:bg-gray-900 
                        rounded-2xl shadow-2xl flex flex-col overflow-hidden border 
                        border-gray-200 dark:border-gray-700 transition-all animate-slide-up">
          {/* Header */}
          <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">Anna.AI Assistant</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Helping reduce food waste</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition"
              aria-label="Close chatbot"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-950">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'bot' ? 'justify-start' : 'justify-end'}`}>
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-xl text-sm ${
                    msg.role === 'bot'
                      ? 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
                      : 'bg-green-600 text-white'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputText(action)}
                  className="px-3 py-1 text-xs rounded-full border border-green-600 
                             text-green-700 dark:text-green-400 dark:border-green-500 
                             hover:bg-green-50 dark:hover:bg-gray-700 transition-all"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 
                           rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white 
                           focus:border-green-600 dark:focus:border-green-400 outline-none 
                           transition-all"
              />
              <button
                onClick={handleSend}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 
                           dark:bg-green-500 dark:hover:bg-green-600 transition-all"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
