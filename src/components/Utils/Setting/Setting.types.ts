/**
 * @file Setting.types.ts
 * @description Setting Typescript Type Definitions.
 */
import { MaterialIcons } from "@expo/vector-icons";

/**
 * Represents the props for the Setting component.
 * @interface ISettingsProps
 * @exports ISettingsProps
 *
 * @property {T} value - The value of the setting.
 * @property {string} name - The name of the setting.
 * @property {T[]} possibleValues - The possible values of the setting.
 * @property {(_: T) => void} handleChangeValue - The function to call when the value of the setting changes.
 * @property {keyof typeof MaterialIcons.glyphMap} icon - The icon to display.
 */
export interface ISettingsProps<T> {
  value: T;
  name: string;
  possibleValues: T[];
  handleChangeValue: (_: T) => void;
  icon?: keyof typeof MaterialIcons.glyphMap;
}
