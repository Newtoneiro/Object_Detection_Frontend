/**
 * @file ForgotPasswordPage.types.ts
 * @description Type definitions for the ForgotPasswordPage component.
 */
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UnAuthRootStackParamList } from "../../components/UnAuthNavigator/";

/**
 * Type definition for the ForgotPasswordPage props.
 * @export ForgotPasswordPageProps
 * @type {NativeStackScreenProps<UnAuthRootStackParamList, "ForgotPasswordPage">}
 */
export type ForgotPasswordPageProps = NativeStackScreenProps<
  UnAuthRootStackParamList,
  "ForgotPasswordPage"
>;
