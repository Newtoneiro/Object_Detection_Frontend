/**
 * @file This file exports the WelcomePage component.
 * @description This component is the first page the user sees when opening the app.
 */
import { Text, View } from "react-native";

import { Background } from "../../components/Utils/Background";
import { GradientButton } from "../../components/Utils/GradientButton";
import { welcomePageStyles } from "./WelcomePage.styles";
import { WelcomePageProps } from "./WelcomePage.types";

/**
 * @component
 *
 * Welcome page component.
 *
 * @description
 *
 * This component displays the welcome page. It is used to greet the user.
 *
 * @param {WelcomePageProps} props - The props object.
 * @param {import("react-navigation").NavigationProp<import("react-navigation").NavigationState>} props.navigation - The navigation prop.
 *
 * @returns {JSX.Element} Rendered component.
 *
 * @example
 * // Usage within another component or file:
 * import React from 'react';
 * import { WelcomePage } from './WelcomePage';
 *
 * const SomeComponent = () => {
 *  return (
 *    <WelcomePage />
 *  );
 * };
 *
 * @see {@link WelcomePageProps} for the props object type.
 * @see {@link welcomePageStyles} for the styles.
 */
export function WelcomePage({ navigation }: WelcomePageProps) {
  return (
    <Background handlePressFunction={null}>
      <View style={welcomePageStyles.container}>
        <Text style={welcomePageStyles.title}>Welcome.</Text>
        <Text style={welcomePageStyles.text}>
          Cupidatat ea amet reprehenderit laboris. Duis pariatur commodo non
          velit qui fugiat mollit. Irure laboris proident aliquip ex laboris et
          non laborum tempor ex. Dolore proident est sunt in nisi nisi laborum
          in.
        </Text>
        <GradientButton
          handlePressFunction={() => navigation.navigate("LoginPage")}
        >
          <Text style={welcomePageStyles.buttonText}>Jump in!</Text>
        </GradientButton>
      </View>
    </Background>
  );
}
