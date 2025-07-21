import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import type { NavigationProps } from "../../types";

/**
 * Navigation component that provides the main navigation bar for the application.
 * Displays different content based on whether the user is on the builder route or home page.
 * 
 * @param {NavigationProps} props - Component props
 * @param {() => void} props.onSave - Optional callback function to save the current flow
 * @param {() => void} props.onToggleFlowsList - Optional callback to toggle the flows list visibility
 * @param {boolean} props.showFlowsList - Flag indicating whether the flows list is currently visible
 */
const Navigation: React.FC<NavigationProps> = ({
  onSave,
  onToggleFlowsList,
  showFlowsList,
}) => {
  // Get current location to determine which navigation elements to display
  const location = useLocation();
  // Check if we're on the builder route to show builder-specific controls
  const isBuilderRoute = location.pathname === "/builder";

  return (
    <nav className="bg-transparent backdrop-blur-sm shadow-sm sticky top-0 z-10 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side navigation - shows back button on builder route, logo on home */}
          <div className="flex items-center">
            {isBuilderRoute ? (
              // Back to home link when in builder
              <Link
                to="/"
                className="px-4 py-2 rounded transition-colors flex items-center gap-2"
              >
                <IoArrowBack />
                Home
              </Link>
            ) : (
              // Application logo/title when on home page
              <h1 className="text-xl ">
                chat<b>Flow</b>
              </h1>
            )}
          </div>
          {/* Right side navigation - builder-specific controls (hidden on mobile) */}
          {isBuilderRoute && (
            <div className="hidden md:flex gap-2">
              {/* Save Flow button - only renders if onSave callback is provided */}
              {onSave && (
                <button
                  onClick={onSave}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-2.5 rounded transition-colors"
                >
                  Save Flow
                </button>
              )}
              {/* Toggle Flows List button - only renders if onToggleFlowsList callback is provided */}
              {onToggleFlowsList && (
                <button
                  onClick={onToggleFlowsList}
                  className="text-white py-1 px-2.5 rounded border border-gray-600 hover:bg-gray-700 transition-colors"
                >
                  {showFlowsList ? "Hide Flows" : "Show Flows"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
