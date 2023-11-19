/**
 * @file LoginPage.types.ts
 * @description Type definitions for the LoginPage component.
 */
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UnAuthRootStackParamList } from "../../components/UnAuthNavigator";

/**
 * Type definition for the LoginPage props.
 * @export LoginPageProps
 * @type {NativeStackScreenProps<UnAuthRootStackParamList, "LoginPage">}
 */
export type LoginPageProps = NativeStackScreenProps<
  UnAuthRootStackParamList,
  "LoginPage"
>;
