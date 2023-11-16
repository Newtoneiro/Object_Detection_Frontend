/**
 * @file UnAuthNavigator.tsx
 * @description Unauthenticated Navigator component.
 */

import ForgotPasswordPage from "../../pages/ForgotPasswordPage/ForgotPasswordPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import { NavigationContainer } from "@react-navigation/native";
import { UnAuthRootStackParamList } from "./UnAuthNavigator.types";
import WelcomePage from "../../pages/WelcomePage/WelcomePage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator<UnAuthRootStackParamList>();

/**
 * @component
 *
 * Unauthenticated Navigator component.
 *
 * @description
 *
 * This component renders the unauthenticated navigator.
 *
 * @returns {JSX.Element} Rendered component based on authentication status.
 *
 * @example
 * // Usage within another component or file:
 * import React from 'react';
 * import UnAuthNavigator from './UnAuthNavigator';
 *
 * const SomeComponent = () => {
 *  return (
 *    <>
 *      <UnAuthNavigator />
 *    </>
 *   );
 * };
 *
 * @see {@link UnAuthRootStackParamList} for the Stack Navigator types.
 */
export function UnAuthNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          presentation: "modal",
          animationTypeForReplace: "push",
          animation: "slide_from_bottom",
        }}
      >
        <Stack.Screen name="WelcomePage" component={WelcomePage} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen
          name="ForgotPasswordPage"
          component={ForgotPasswordPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
