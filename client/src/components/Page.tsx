import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';

/**
 * Page component that includes a Suspense wrapper for lazy loading components and a Toaster for notifications.
 *
 * @returns {JSX.Element} A React component with Suspense and Toaster.
 */
export default function Page() {
  return (
    <>
      {/* Suspense component is used to handle loading states of lazy-loaded components */}
      <Suspense fallback={<div>Loading...</div>}>
        {/* Render any unused components here if needed */}
      </Suspense>

      {/* Toaster component displays toast notifications at the top-right position */}
      <Toaster position="top-right" />
    </>
  );
}
