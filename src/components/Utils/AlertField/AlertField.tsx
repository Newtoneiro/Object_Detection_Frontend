/**
 * @file AlertField.tsx
 * @description AlertField component.
 */

import { Text } from "react-native";
import { alertFieldStyles } from "./AlertField.styles";
import { IAlertFieldProps } from "./AlertField.types";

/**
 * @component
 *
 * AlertField component.
 *
 * @description
 *
 * This component is used to display success and failure alert messages.
 *
 * @param {IAlertFieldProps} props - The props object.
 *
 * @returns {JSX.Element} Rendered component.
 *
 * @example
 * // Usage within another component or file:
 * import React from 'react';
 * import AlertField from './AlertField';
 *
 * const SomeComponent = () => {
 *  return (
 *    <>
 *      <AlertField text="This is a success message." success />
 *      <AlertField text="This is a failure message." />
 *     </>
 *  );
 * };
 *
 * @see {@link IAlertFieldProps} for the props object.
 * @see {@link alertFieldStyles} for the style object.
 */
export const AlertField = ({ text, success }: IAlertFieldProps) => {
  return (
    <Text
      style={
        success
          ? {
              ...alertFieldStyles.container,
              ...alertFieldStyles.alertPossitive,
            }
          : alertFieldStyles.container
      }
    >
      {text}
    </Text>
  );
};
