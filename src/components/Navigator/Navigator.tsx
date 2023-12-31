/**
 * @file Navigator.tsx
 * @description Authenticated Navigator component.
 */

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CameraPage } from "../../pages/CameraPage";
import { DashboardPage } from "../../pages/DashboardPage";
import { LiveCameraPage } from "../../pages/LiveCameraPage";
import { SettingsPage } from "../../pages/SettingsPage";
import { RootStackParamList } from "./Navigator.types";

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * @component
 *
 * Authenticated Navigator component.
 *
 * @description
 *
 * This component renders the authenticated navigator.
 *
 * @returns {JSX.Element} Rendered component based on authentication status.
 *
 * @example
 * // Usage within another component or file:
 * import React from 'react';
 * import Navigator from './Navigator';
 *
 * const SomeComponent = () => {
 *  return (
 *    <>
 *      <Navigator />
 *    </>
 *  );
 * };
 *
 * @see {@link RootStackParamList} for the Stack Navigator types.
 */
export function Navigator() {
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
        <Stack.Screen name="DashboardPage" component={DashboardPage} />
        <Stack.Screen name="CameraPage" component={CameraPage} />
        <Stack.Screen name="LiveCameraPage" component={LiveCameraPage} />
        <Stack.Screen name="SettingsPage" component={SettingsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
