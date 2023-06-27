import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  LandingPage: undefined;
  CameraPage: undefined;
};

export type Props = NativeStackScreenProps<
  RootStackParamList,
  "LandingPage",
  "CameraPage"
>;
