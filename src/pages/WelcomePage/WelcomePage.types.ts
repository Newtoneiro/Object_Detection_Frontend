/**
 * @file WelcomePage.types.ts
 * @description Type definitions for the WelcomePage component.
 */
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UnAuthRootStackParamList } from "../../components/UnAuthNavigator";

/**
 * Type definition for the WelcomePage props.
 * @export WelcomePageProps
 * @type {NativeStackScreenProps<UnAuthRootStackParamList, "WelcomePage">}
 */
export type WelcomePageProps = NativeStackScreenProps<
  UnAuthRootStackParamList,
  "WelcomePage"
>;
