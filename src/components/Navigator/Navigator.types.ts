import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  DashboardPage: undefined;
  CameraPage: undefined;
  SettingsPage: undefined;
};

export type Props = NativeStackScreenProps<RootStackParamList, "DashboardPage">;
