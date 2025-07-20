import React from "react";
import Navigation from "../components/home/Navigation";
import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";

const HomePage: React.FC = () => {
  return (
    <div 
      className="h-screen overflow-hidden flex flex-col"
      style={{
        backgroundImage: 'url(/biteSpeed-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <Navigation />
      <div className="flex-1 overflow-y-auto">
        <HeroSection />
        <FeaturesSection />
      </div>
    </div>
  );
};

export default HomePage;
