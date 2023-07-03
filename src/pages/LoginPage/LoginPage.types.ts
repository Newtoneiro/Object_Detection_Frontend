import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UnAuthRootStackParamList } from "../../components/UnAuthNavigator/UnAuthNavigator.types";

export type LoginPageProps = NativeStackScreenProps<
  UnAuthRootStackParamList,
  "LoginPage"
>;
