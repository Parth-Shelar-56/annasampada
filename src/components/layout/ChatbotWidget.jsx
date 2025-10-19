import React, { useState } from 'react';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! I\'m Anna.AI. How can I help you reduce food waste today?' }
  ]);
  const [inputText, setInputText] = useState('');

  const quickActions = [
    '🥗 Leftover Recipes',
    '📦 Storage Tips',
    '🌍 Food Facts'
  ];

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages([...messages, { role: 'user', text: inputText }]);
      setInputText('');
      
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'bot', 
          text: 'Thanks for your message! This is a demo response.' 
        }]);
      }, 1000);
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-green-500 
                     to-teal-600 rounded-full shadow-2xl hover:shadow-3xl flex items-center 
                     justify-center text-white transform hover:scale-110 transition-all 
                     duration-300 animate-bounce"
          aria-label="Open chatbot"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white dark:bg-gray-800 
                        rounded-3xl shadow-2xl flex flex-col animate-slide-up overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-teal-600 p-4 flex items-center 
                          justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center 
                              text-2xl">
                🤖
              </div>
              <div>
                <h3 className="text-white font-bold">Anna.AI</h3>
                <p className="text-green-100 text-xs">Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-900">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'bot' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-2xl ${
                    msg.role === 'bot'
                      ? 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-sm'
                      : 'bg-green-600 dark:bg-green-500 text-white'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-2 bg-white dark:bg-gray-800 border-t border-gray-200 
                          dark:border-gray-700">
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputText(action)}
                  className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 
                             dark:text-green-300 rounded-full text-xs hover:bg-green-200 
                             dark:hover:bg-green-800 transition-all duration-300"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 
                          dark:border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-xl border-2 border-gray-200 
                           dark:border-gray-600 dark:bg-gray-700 dark:text-white
                           focus:border-green-500 dark:focus:border-green-400 
                           focus:outline-none transition-all duration-300 text-sm"
              />
              <button
                onClick={handleSend}
                className="px-4 py-2 bg-green-600 dark:bg-green-500 text-white rounded-xl 
                           hover:bg-green-700 dark:hover:bg-green-600 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </>
  );
};

export default ChatbotWidget;