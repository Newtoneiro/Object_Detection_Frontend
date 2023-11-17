/**
 * @file PressableIcon.tsx
 * @description PressableIcon component.
 */
import { IPressableIconsProps } from "./PressableIcon.types";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { pressableIconStyles } from "./PressableIcon.styles";

/**
 * @component
 *
 * PressableIcon component.
 *
 * @description
 *
 * This component is used to display an icon that can be pressed.
 *
 * @param {IPressableIconsProps} props - The props object.
 * @param {Function} props.handlePress - The function to be called when the
 * icon is pressed.
 * @param {string} props.icon - The name of the icon to be displayed.
 * @param {number} props.size - The size of the icon to be displayed.
 *
 * @returns {JSX.Element} Rendered component.
 *
 * @example
 * // Usage within another component or file:
 * import React from 'react';
 * import { PressableIcon } from './PressableIcon';
 *
 * const SomeComponent = () => {
 *  return (
 *    <>
 *      <PressableIcon
 *        handlePress={() => console.log("Icon pressed.")}
 *        icon="add"
 *        size={24}
 *      />
 *    </>
 *  );
 * };
 *
 * @see {@link IPressableIconsProps} for the props object.
 * @see {@link pressableIconStyles} for the style object.
 */
export const PressableIcon = ({
  handlePress,
  icon,
  size,
}: IPressableIconsProps) => {
  return (
    <TouchableOpacity onPress={() => handlePress()}>
      <MaterialIcons style={pressableIconStyles.icon} name={icon} size={size} />
    </TouchableOpacity>
  );
};
