import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UnAuthRootStackParamList } from "../../components/UnAuthNavigator";

export type WelcomePageProps = NativeStackScreenProps<
  UnAuthRootStackParamList,
  "WelcomePage"
>;
