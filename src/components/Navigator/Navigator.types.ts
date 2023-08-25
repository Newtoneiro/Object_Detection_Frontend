import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  CameraPage: undefined;
  SettingsPage: undefined;
};

export type Props = NativeStackScreenProps<
  RootStackParamList,
  "CameraPage",
  "SettingsPage"
>;
