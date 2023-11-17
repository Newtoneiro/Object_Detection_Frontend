/**
 * @file PressableIcon.types.ts
 * @description PressableIcon Typescript Type Definitions.
 */
import { MaterialIcons } from "@expo/vector-icons";

/**
 * Represents the props for the PressableIcon component.
 * @interface IPressableIconsProps
 * @exports IPressableIconsProps
 *
 * @property {() => void} handlePress - The function to call when the icon is pressed.
 * @property {keyof typeof MaterialIcons.glyphMap} icon - The icon to display.
 * @property {number} size - The size of the icon.
 */
export interface IPressableIconsProps {
  handlePress: () => void;
  icon: keyof typeof MaterialIcons.glyphMap;
  size: number;
}
