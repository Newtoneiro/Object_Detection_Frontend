/**
 * @module GradientButton.tsx
 * @description GradientButton module.
 */
import { Pressable, View } from "react-native";

import { IGradientButtonProps } from "./GradientButton.types";
import { LinearGradient } from "expo-linear-gradient";
import { gradientButtonStyles } from "./GradientButton.styles";
import { stylesConfig } from "../../../config";

/**
 * @component
 *
 * GradientButton component.
 *
 * @description
 *
 * This component is used to display a button with a gradient background.
 * The button is clickable and calls a function when pressed.
 *
 * @param {IGradientButtonProps} props - The props object.
 * @param {JSX.Element} [props.children] - The children to be displayed.
 * @param {Function} [props.handlePressFunction] - The function to be called when
 * the button is pressed.
 *
 * @returns {JSX.Element} Rendered component.
 *
 * @example
 * // Usage within another component or file:
 * import React from 'react';
 * import { GradientButton } from './GradientButton';
 *
 * const SomeComponent = () => {
 *    return (
 *       <>
 *        <GradientButton
 *          handlePressFunction={() => console.log("Button pressed.")}
 *        >
 *        <Text>This is a gradient button.</Text>
 *      </GradientButton>
 *    </>
 *  );
 * };
 *
 * @see {@link IGradientButtonProps} for the props object.
 * @see {@link gradientButtonStyles} for the style object.
 */
export const GradientButton = ({
  children,
  handlePressFunction,
}: IGradientButtonProps) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[
        stylesConfig.colors.default_color_1,
        stylesConfig.colors.default_color_2,
      ]}
      style={gradientButtonStyles.container}
    >
      <Pressable
        onPress={() => handlePressFunction()}
        style={gradientButtonStyles.pressable}
      >
        <View style={gradientButtonStyles.container}>{children}</View>
      </Pressable>
    </LinearGradient>
  );
};
