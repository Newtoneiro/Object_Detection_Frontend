/**
 * @file App.tsx
 * @description The main application component.
 */

import "expo-dev-client";

import { AuthGate } from "./components/AuthGate";
import { AnimatedLoadingCard } from "./components/Utils/AnimatedLoadingCard";
import { ErrorPopup } from "./components/Utils/ErrorPopup";
import { LoadingOverlay } from "./components/Utils/LoadingOverlay";
import { AppContextProvider } from "./contexts";

/**
 * @component
 * The main application component.
 *
 * @description
 * This component serves as the entry point for the application and wraps it
 * with essential context providers and components.
 *
 * @returns {JSX.Element} Rendered component.
 *
 * @example
 * // Usage within another component or file:
 * import React from 'react';
 * import App from './App';
 *
 * const MainContainer = () => {
 *   return (
 *     <>
 *       <App />
 *     </>
 *   );
 * };
 *
 * @see {@link AppContextProvider} for the global context provider.
 */
export const App = () => {
  return (
    <AppContextProvider>
      <ErrorPopup />
      <LoadingOverlay />
      <AnimatedLoadingCard />
      <AuthGate />
    </AppContextProvider>
  );
};
