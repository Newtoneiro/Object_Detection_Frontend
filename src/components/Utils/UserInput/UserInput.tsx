/**
 * @file UserInput.tsx
 * @description UserInput component.
 */
import { Pressable, TextInput, View } from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { IUserInputProps } from "./UserInput.types";
import { stylesConfig } from "../../../config";
import { useState } from "react";
import { userInputStyles } from "./UserInput.styles";

/**
 * @component
 *
 * UserInput component.
 *
 * @description
 *
 * This component is used to display a user input optionally decorated with icon.
 *
 * @param {IUserInputProps} props - The props object.
 * @param {string} props.value - The value of the input.
 * @param {Function} props.changeValue - The function to be called when the
 * input value changes.
 * @param {IUserInputOptions} props.options - The options of the input.
 *
 * @returns {JSX.Element} Rendered component.
 *
 * @example
 * // Usage within another component or file:
 * import React from 'react';
 * import { UserInput } from './UserInput';
 *
 * const SomeComponent = () => {
 *  return (
 *    <>
 *      <UserInput
 *        value="Some value"
 *        changeValue={(value) => console.log(value)}
 *        options={{
 *          isSecret: true,
 *          isAlert: true,
 *          icon: "user",
 *          placeholder: "Some placeholder",
 *        }}
 *      />
 *    </>
 *  );
 * };
 *
 * @see {@link IUserInputProps} for the props object.
 * @see {@link userInputStyles} for the style object.
 * @see {@link IUserInputOptions} for the options object.
 */
export const UserInput = ({ value, changeValue, options }: IUserInputProps) => {
  const [visible, setVisible] = useState<boolean>(!options.isSecret);

  return (
    <View
      style={
        options.isAlert
          ? {
              ...userInputStyles.container,
              ...userInputStyles.containerAlert,
            }
          : userInputStyles.container
      }
    >
      {options.icon && (
        <FontAwesome style={userInputStyles.icon} name={options.icon} />
      )}
      <TextInput
        secureTextEntry={!visible}
        style={userInputStyles.textInput}
        placeholder={options.placeholder}
        placeholderTextColor={stylesConfig.colors.default_font_subtitle}
        value={value}
        onChangeText={(text: string) => changeValue(text)}
      />
      {options.isSecret && (
        <Pressable onPress={() => setVisible((prev) => !prev)}>
          <FontAwesome
            style={userInputStyles.visibilityIcon}
            name={visible ? "eye-slash" : "eye"}
          />
        </Pressable>
      )}
    </View>
  );
};
