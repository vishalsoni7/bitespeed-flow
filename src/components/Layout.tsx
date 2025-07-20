import React from 'react';
import type { LayoutProps } from '../types';

const Layout: React.FC<LayoutProps> = ({ children, fullWidth = false }) => {
  if (fullWidth) {
    return <>{children}</>;
  }

  return (
    <div className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
};

export default Layout;