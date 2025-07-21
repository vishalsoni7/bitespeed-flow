import React from "react";
import { features } from "../../constants";

/**
 * FeaturesSection Component
 * 
 * Displays a grid of feature cards showcasing the application's capabilities.
 * Each feature card includes an icon, title, and description with a custom background image.
 * 
 * @returns {JSX.Element} A responsive grid of feature cards
 */
const FeaturesSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center">
      {/* Section Title */}
      <h3
        className="text-3xl font-bold text-center mb-8"
        style={{ fontFamily: '"Lora", Georgia, sans-serif' }}
      >
        What You Can Do
      </h3>
      
      {/* Features Grid - Responsive columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="relative  p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
            style={{
              backgroundImage: "url(/feature-card-bg.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Background overlay for visual effect */}
            <div className="absolute inset-0 opacity-5" />
            
            {/* Card Content - Positioned above overlay */}
            <div className="relative z-10">
              {/* Feature Icon Container */}
              <div
                className={`${feature.colorClass} w-16 h-16 rounded-lg flex items-center justify-center mb-4`}
              >
                {feature.icon}
              </div>
              
              {/* Feature Title */}
              <h4 className="text-xl font-semibold mb-3 ">{feature.title}</h4>
              
              {/* Feature Description */}
              <p className="text-gray-400">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
