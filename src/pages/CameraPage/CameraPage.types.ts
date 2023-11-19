/**
 * @file CameraPage.types.ts
 * @description Type definitions for the CameraPage component.
 */
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../components/Navigator/Navigator.types";

/**
 * Type definition for the CameraPage props.
 * @export CameraPageProps
 * @type {NativeStackScreenProps<RootStackParamList, "CameraPage">}
 */
export type CameraPageProps = NativeStackScreenProps<
  RootStackParamList,
  "CameraPage"
>;
