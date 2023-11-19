/**
 * @file CameraButton.tsx
 * @description CameraButton component.
 */

import { Pressable, View } from "react-native";
import { ICameraButtonProps } from "./CameraButton.types";
import { cameraButtonStyles } from "./CameraButton.styles";

/**
 * @component
 *
 * CameraButton component.
 *
 * @description
 *
 * This component is used to display a button allowing user to take a picture /
 * switch between live camera on and off - depending on the toggle prop.
 *
 * @param {ICameraButtonProps} props - The props object.
 * @param {Function} props.handlePress - The function to be called when the
 * button is pressed.
 * @param {boolean} [props.toggle=false] - The toggle state of the button.
 *
 * @returns {JSX.Element} Rendered component.
 *
 * @example
 * // Usage within another component or file:
 * import React from 'react';
 * import { CameraButton } from './CameraButton';
 *
 * const SomeComponent = () => {
 *  return (
 *    <>
 *      <CameraButton
 *        handlePress={() => console.log("Button pressed.")}
 *      />
 *    </>
 *  );
 * };
 *
 * @see {@link ICameraButtonProps} for the props object.
 * @see {@link cameraButtonStyles} for the style object.
 */
export const CameraButton = ({
  handlePress,
  toggle = false,
}: ICameraButtonProps) => {
  return (
    <Pressable
      onPress={() => handlePress()}
      style={
        toggle
          ? {
              ...cameraButtonStyles.captureButton,
              ...cameraButtonStyles.captureButtonToggle,
            }
          : cameraButtonStyles.captureButton
      }
    >
      <View style={cameraButtonStyles.captureButtonInside}></View>
    </Pressable>
  );
};
