import React from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../../components/layout/ThemeToggle';

const LandingPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 
                    dark:from-gray-900 dark:via-green-900 dark:to-teal-900 
                    transition-colors duration-500">
      <ThemeToggle />
      
      {/* HERO SECTION */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r 
                         from-green-600 via-teal-600 to-cyan-600 
                         dark:from-green-400 dark:via-teal-400 dark:to-cyan-400
                         bg-clip-text text-transparent
                         animate-slide-down">
            AnnaSampada
          </h1>
          
          <p className="text-2xl md:text-3xl text-green-800 dark:text-green-200 
                        mb-4 animate-slide-up animation-delay-200">
            Transforming Food Waste into Hope
          </p>
          
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 
                        max-w-2xl mx-auto mb-12 animate-slide-up animation-delay-400">
            Join our mission to reduce food waste, feed communities, and protect our planet. 
            Connect surplus food with those who need it most, while promoting sustainable composting.
          </p>
          
          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center 
                          animate-slide-up animation-delay-600">
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-green-600 dark:bg-green-500 text-white text-lg 
                         rounded-full shadow-lg hover:shadow-2xl hover:bg-green-700 
                         dark:hover:bg-green-600 transform hover:scale-105 
                         transition-all duration-300 w-full sm:w-auto"
            >
              Login
            </button>
            
            <button
              onClick={() => navigate('/signup')}
              className="px-8 py-4 bg-white dark:bg-gray-800 text-green-600 
                         dark:text-green-400 text-lg rounded-full shadow-lg 
                         hover:shadow-2xl border-2 border-green-600 dark:border-green-500
                         hover:bg-green-50 dark:hover:bg-gray-700 transform hover:scale-105 
                         transition-all duration-300 w-full sm:w-auto"
            >
              Sign Up
            </button>
          </div>
        </div>
        
        {/* FEATURES GRID */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 animate-fade-in animation-delay-800">
          {[
            { icon: '🍎', title: 'Predict Freshness', desc: 'AI-powered food quality assessment' },
            { icon: '🤝', title: 'Connect with NGOs', desc: 'Donate surplus food to those in need' },
            { icon: '♻️', title: 'Smart Composting', desc: 'Turn waste into nutrient-rich compost' }
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg 
                         hover:shadow-2xl transform hover:-translate-y-2 
                         transition-all duration-300"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;