// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { AuthProvider } from './context/AuthContext.tsx';

/**
 * The entry point of the application. This script initializes the React application
 * by rendering the `App` component inside the DOM element with the id 'root'.
 * It wraps the `App` component in `StrictMode` to enable additional checks and warnings
 * for potential issues in the application.
 *
 * @returns {void}
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
