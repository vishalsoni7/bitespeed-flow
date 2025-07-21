import React from "react";
import Navigation from "../components/home/Navigation";
import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";

/**
 * HomePage Component - Landing page for the Bitespeed Flow application
 * 
 * This is the main landing page that serves as the entry point for users.
 * It provides an overview of the application's capabilities and guides users
 * to the flow builder interface.
 * 
 * Key features:
 * - Full-screen layout with custom background image
 * - Fixed navigation header for consistent branding
 * - Hero section with main call-to-action
 * - Features showcase highlighting key application capabilities
 * - Responsive design with proper overflow handling
 * 
 * Layout structure:
 * - Fixed-height container (100vh) with flex column layout
 * - Navigation component at the top
 * - Scrollable content area containing hero and features sections
 * - Background image with full coverage and fixed attachment
 * 
 * @returns {JSX.Element} The complete homepage layout with navigation, hero, and features
 */
const HomePage: React.FC = () => {
  return (
    <div 
      className="h-screen overflow-hidden flex flex-col"
      style={{
        // Background image configuration for visual appeal
        backgroundImage: 'url(/biteSpeed-bg.png)', // Custom branded background
        backgroundSize: 'cover',      // Ensure image covers entire container
        backgroundPosition: 'center', // Center the background image
        backgroundRepeat: 'no-repeat', // Prevent image repetition
        backgroundAttachment: 'fixed'  // Keep background fixed during scroll
      }}
    >
      {/* Fixed navigation header with branding and CTA button */}
      <Navigation />
      
      {/* Scrollable content container for main page sections */}
      <div className="flex-1 overflow-y-auto">
        {/* Hero section with main headline and primary call-to-action */}
        <HeroSection />
        
        {/* Features showcase highlighting key application capabilities */}
        <FeaturesSection />
      </div>
    </div>
  );
};

export default HomePage;
