import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import type { NavigationProps } from "../../types";

const Navigation: React.FC<NavigationProps> = ({
  onSave,
  onToggleFlowsList,
  showFlowsList,
}) => {
  const location = useLocation();
  const isBuilderRoute = location.pathname === "/builder";

  return (
    <nav className="bg-transparent backdrop-blur-sm shadow-sm sticky top-0 z-10 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {isBuilderRoute ? (
              <Link
                to="/"
                className="px-4 py-2 rounded transition-colors flex items-center gap-2"
              >
                <IoArrowBack />
                Home
              </Link>
            ) : (
              <h1 className="text-xl ">
                bite<b>Speed</b> ChatFlow
              </h1>
            )}
          </div>
          {isBuilderRoute && (
            <div className="flex gap-2">
              {onSave && (
                <button
                  onClick={onSave}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-2.5 rounded transition-colors"
                >
                  Save Flow
                </button>
              )}
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
