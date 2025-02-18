import type React from 'react';
import { Toaster } from 'react-hot-toast';

/**
 * Layout component that wraps the children elements.
 *
 * This component is responsible for rendering a layout structure, including
 * a Toast notification system at the top-right of the screen and a container
 * for the main content.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components or elements to render inside the layout.
 * @returns {JSX.Element} The Layout component JSX.
 */
interface LayoutProps {
  children: React.ReactNode;
}

/**
 * The main layout component that renders the content inside a styled container.
 * It also includes the Toaster for displaying notifications.
 *
 * @param {LayoutProps} props - The props for the layout.
 * @returns {JSX.Element} The JSX representation of the layout.
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};

export default Layout;
