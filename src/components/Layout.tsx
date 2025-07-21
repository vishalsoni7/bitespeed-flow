import React from 'react';
import type { LayoutProps } from '../types';

/**
 * Layout Component
 * 
 * A responsive wrapper component that provides consistent spacing and max-width constraints
 * for the application content. Supports both full-width and constrained layouts.
 * 
 * @param {LayoutProps} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @param {boolean} props.fullWidth - When true, renders children without any wrapper (default: false)
 * 
 * @returns {JSX.Element} The layout wrapper or children directly
 */
const Layout: React.FC<LayoutProps> = ({ children, fullWidth = false }) => {
  // For full-width layouts, render children without any wrapper
  if (fullWidth) {
    return <>{children}</>;
  }

  // Default layout: Constrained width with responsive padding
  return (
    <div className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
};

export default Layout;