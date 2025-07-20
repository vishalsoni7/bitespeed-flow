import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

interface NavigationProps {
  onSave?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onSave }) => {
  const location = useLocation();
  const isBuilderRoute = location.pathname === "/builder";

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {isBuilderRoute ? (
              <Link
                to="/"
                className="bg-white text-gray-700 px-4 py-2 rounded hover:bg-gray-100 transition-colors shadow flex items-center gap-2"
              >
                <IoArrowBack />
                Back to Home
              </Link>
            ) : (
              <h1 className="text-xl font-bold text-gray-900">
                ChatFlow Builder
              </h1>
            )}
          </div>
          {isBuilderRoute && onSave && (
            <button
              onClick={onSave}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
