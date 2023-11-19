/**
 * @file LiveCameraPage.types.ts
 * @description Type definitions for the LiveCameraPage component.
 */
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../components/Navigator/Navigator.types";

/**
 * Type definition for the LiveCameraPage props.
 * @export LiveCameraPageProps
 * @type {NativeStackScreenProps<RootStackParamList, "LiveCameraPage">}
 */
export type LiveCameraPageProps = NativeStackScreenProps<
  RootStackParamList,
  "LiveCameraPage"
>;
