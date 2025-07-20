import React from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const HeroSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col items-center justify-center text-center">
      <h2 className="text-5xl font-bold mb-6">
        Build Interactive Chat Flows
        <span className="text-blue-600"> Visually </span>
      </h2>
      <p
        className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto"
        style={{ fontFamily: '"Lora", Georgia, sans-serif' }}
      >
        Create powerful WhatsApp chatbot flows with our intuitive drag-and-drop
        interface. Design, connect, and deploy conversational experiences
        without writing code.
      </p>
      <Link
        to="/builder"
        className="inline-flex items-center p-3 text-md font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
      >
        Get Started
        <BsArrowRight className="text-xl ml-2" />
      </Link>
    </div>
  );
};

export default HeroSection;
