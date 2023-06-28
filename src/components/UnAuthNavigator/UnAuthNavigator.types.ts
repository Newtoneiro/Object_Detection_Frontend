import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  WelcomePage: undefined;
  LoginPage: undefined;
};

export type UnAuthProps = NativeStackScreenProps<
  RootStackParamList,
  "WelcomePage",
  "LoginPage"
>;
