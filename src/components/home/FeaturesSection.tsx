import React from "react";
import { FaNodeJs, FaConnectdevelop } from "react-icons/fa";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  colorClass: string;
}

const features: Feature[] = [
  {
    icon: <FaNodeJs className="text-blue-600 text-2xl" />,
    title: "Drag & Drop Nodes",
    description:
      "Simply drag message nodes from the panel and drop them onto the canvas to start building your flow.",
    colorClass: "bg-blue-100",
  },
  {
    icon: <FaConnectdevelop className="text-green-600 text-2xl" />,
    title: "Connect Nodes",
    description:
      "Create conversation flows by connecting nodes together. Each source can have one outgoing connection.",
    colorClass: "bg-green-100",
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center">
      <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
        What You Can Do
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div
              className={`${feature.colorClass} w-16 h-16 rounded-lg flex items-center justify-center mb-4`}
            >
              {feature.icon}
            </div>
            <h4 className="text-xl font-semibold mb-3">・{feature.title}</h4>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
