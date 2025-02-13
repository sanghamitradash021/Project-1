import type React from 'react';
import { Toaster } from 'react-hot-toast';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};

export default Layout;
