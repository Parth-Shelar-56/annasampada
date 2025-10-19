import React from 'react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-green-800 dark:text-green-200 
                     text-center animate-slide-down">
        About AnnaSampada
      </h1>
      
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 animate-fade-in">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            AnnaSampada is dedicated to creating a sustainable food ecosystem by connecting 
            food donors with NGOs and composting services. We leverage AI technology to predict 
            food freshness and provide intelligent solutions for food waste management.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Our platform bridges the gap between surplus food and those in need, while promoting 
            environmental sustainability through efficient composting practices.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { number: '10K+', label: 'Meals Donated', icon: '🍽️' },
            { number: '500+', label: 'Active Users', icon: '👥' },
            { number: '5T+', label: 'Waste Composted', icon: '♻️' }
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 text-center 
                         animate-fade-in hover:shadow-2xl transform hover:-translate-y-2 
                         transition-all duration-300"
              style={{ animationDelay: `${idx * 0.2}s`, animationFillMode: 'both' }}
            >
              <div className="text-5xl mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-3xl shadow-xl 
                        p-8 text-white animate-fade-in animation-delay-600">
          <h2 className="text-2xl font-bold mb-4">Join Our Movement</h2>
          <p className="mb-6 opacity-90">
            Together, we can make a significant impact on food waste and hunger. Every 
            contribution counts, whether it's donating surplus food or composting organic waste.
          </p>
          <button className="px-6 py-3 bg-white text-green-600 rounded-xl hover:shadow-lg 
                             transform hover:scale-105 transition-all duration-300 font-semibold">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;