import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';

export default function Page() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {/* Render any unused components here if needed */}
      </Suspense>
      <Toaster position="top-right" />
    </>
  );
}
