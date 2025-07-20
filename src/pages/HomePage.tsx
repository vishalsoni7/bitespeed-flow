import React from "react";
import Navigation from "../components/home/Navigation";
import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-full bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
    </div>
  );
};

export default HomePage;
