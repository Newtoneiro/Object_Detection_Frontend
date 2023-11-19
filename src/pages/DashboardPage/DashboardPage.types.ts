/**
 * @file DashboardPage.types.ts
 * @description Type definitions for the DashboardPage component.
 */
import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ColorValue } from "react-native";
import { RootStackParamList } from "../../components/Navigator/Navigator.types";

/**
 * Type definition for the DashboardPage props.
 * @export DashboardPageProps
 * @type {NativeStackScreenProps<RootStackParamList, "DashboardPage">}
 */
export type DashboardPageProps = NativeStackScreenProps<
  RootStackParamList,
  "DashboardPage"
>;

/**
 * Type definition for the GridItem props.
 * @export GridItemProp
 * @type GridItemProp
 *
 * @property {keyof RootStackParamList} page The page to navigate to when the grid item is pressed.
 * @property {String} name The name of the grid item.
 * @property {keyof typeof MaterialIcons.glyphMap} icon The icon to display for the grid item.
 * @property {ColorValue} iconColor The color of the icon.
 * @property {boolean} [isProtected] Whether the grid item is protected or not (true == it can't be accessed by anonymous users).
 */
export type GridItemProp = {
  page: keyof RootStackParamList;
  name: String;
  icon: keyof typeof MaterialIcons.glyphMap;
  iconColor: ColorValue;
  isProtected?: boolean;
};
