/**
 * @file AuthGate.tsx
 * @description AuthGate component.
 */

import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { Navigator } from "../Navigator/";
import { UnAuthNavigator } from "../UnAuthNavigator/";
import { useContext } from "react";

/**
 * @component
 *
 * Authentication gate component.
 *
 * @description
 *
 * This component checks the authentication status using the `AuthContext` and
 * renders either the authenticated navigator (`Navigator`) or the
 * unauthenticated navigator (`UnAuthNavigator`).
 *
 * @returns {JSX.Element} Rendered component based on authentication status.
 *
 * @example
 * // Usage within another component or file:
 * import React from 'react';
 * import AuthGate from './AuthGate';
 *
 * const SomeComponent = () => {
 *   return (
 *     <>
 *       <AuthGate />
 *     </>
 *   );
 * };
 *
 */
export const AuthGate = () => {
  const AuthCon = useContext(AuthContext);

  return AuthCon.isAuthenticated ? <Navigator /> : <UnAuthNavigator />;
};
