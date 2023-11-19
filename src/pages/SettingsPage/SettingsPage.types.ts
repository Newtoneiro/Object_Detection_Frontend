/**
 * @file SettingsPage.types.ts
 * @description Type definitions for the SettingsPage component.
 */
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../components/Navigator/Navigator.types";

/**
 * Type definition for the SettingsPage props.
 * @export SettingsPageProps
 * @type {NativeStackScreenProps<RootStackParamList, "SettingsPage">}
 */
export type SettingsPageProps = NativeStackScreenProps<
  RootStackParamList,
  "SettingsPage"
>;
